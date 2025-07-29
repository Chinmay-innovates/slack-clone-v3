export const runtime = 'nodejs';

import prisma from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: {
      workspaceId: string;
      channelId: string;
    };
  },
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { workspaceId, channelId } = params;

  if (!workspaceId || !channelId) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  try {
    const user = await currentUser();
    const currentUid = user!.id;

    const body = await request.json();
    const { name, description } = body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Channel name is required' }, { status: 400 });
    }

    const membership = await prisma.membership.findUnique({
      where: {
        userId_workspaceId: {
          userId: currentUid,
          workspaceId,
        },
      },
    });

    if (!membership || membership.role !== 'admin') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const existing = await prisma.channel.findFirst({
      where: {
        workspaceId,
        name,
        NOT: {
          id: channelId, // exclude current channel from name check
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Another channel with this name already exists' },
        { status: 400 },
      );
    }

    const updatedChannel = await prisma.channel.update({
      where: {
        id: channelId,
      },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(
      {
        message: 'Channel updated successfully',
        channel: updatedChannel,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('Error updating channel:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
