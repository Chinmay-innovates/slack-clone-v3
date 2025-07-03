import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';
import prisma from '@/lib/prisma';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const SECRET = process.env.STREAM_API_SECRET!;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const client = new StreamClient(API_KEY, SECRET);

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  console.log('Received webhook with svix-id:', svix_id);
  console.log('Event payload:', JSON.stringify(payload, null, 2));

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  const eventType = evt.type;

  switch (eventType) {
    case 'user.created':
    case 'user.updated':
      const newUser = evt.data;
      // Prisma client
      await prisma.user.upsert({
        where: { clerkId: newUser.id },
        update: {
          email: newUser.email_addresses?.[0]?.email_address,
          imageUrl: newUser.image_url,
          firstName: newUser.first_name,
          lastName: newUser.last_name,
          username: newUser.username!,
        },
        create: {
          clerkId: newUser.id,
          email: newUser.email_addresses?.[0]?.email_address,
          imageUrl: newUser.image_url,
          firstName: newUser.first_name || 'anonymous',
          lastName: newUser.last_name || 'user',
          username: newUser.username!,
        },
      });

      // Stream client
      await client.upsertUsers([
        {
          id: newUser.id,
          role: 'user',
          name: `${newUser.first_name} ${newUser.last_name}`,
          custom: {
            username: newUser.username,
            email: newUser.email_addresses[0].email_address,
          },
          image: newUser.image_url,
        },
      ]);

      console.log('User ID:', newUser.id);

      break;
    default:
      break;
  }

  return new Response('Webhook processed', { status: 200 });
}
