import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let event;

  try {
    event = await req.json();
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  switch (event.type) {
    case 'user.created':
    case 'user.updated': {
      const user = event.data;

      const email = user.email_addresses?.[0]?.email_address || null;
      const firstName = user.first_name;
      const lastName = user.last_name;
      const imageUrl = user.image_url;
      const clerkId = user.id;

      await saveOrUpdateUser({
        clerkId,
        email,
        firstName,
        lastName,
        imageUrl,
      });

      return NextResponse.json({ message: 'User processed' }, { status: 200 });
    }

    default:
      return NextResponse.json({ message: 'Ignored event' }, { status: 200 });
  }
}

async function saveOrUpdateUser(user: {
  clerkId: string;
  email: string | null;
  firstName: string;
  lastName: string;
  imageUrl: string;
}) {
  console.log('Saving user to DB:', user);

  await prisma.user.upsert({
    where: {
      clerkId: user.clerkId,
    },
    update: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    },
    create: {
      clerkId: user.clerkId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    },
  });
}
