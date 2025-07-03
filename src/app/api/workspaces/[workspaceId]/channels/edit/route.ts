import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: {
      workspaceId: string;
    };
  },
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const workspaceId = params.workspaceId;

  if (!workspaceId) {
    return NextResponse.json({ error: 'Workspace ID is required' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { channelId, name, description } = body;

    // Validate inputs
    if (!channelId) {
      return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 });
    }

    if (
      (!name || typeof name !== 'string' || name.trim() === '') &&
      typeof description !== 'string'
    ) {
      return NextResponse.json({ error: 'No valid fields provided for update' }, { status: 400 });
    }

    // Check membership and role
    const membership = await prisma.membership.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
    });

    if (!membership || membership.role !== 'admin') {
      return NextResponse.json({ error: 'Access denied: Admins only' }, { status: 403 });
    }

    // Verify channel exists and belongs to this workspace
    const channel = await prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    if (!channel || channel.workspaceId !== workspaceId) {
      return NextResponse.json({ error: 'Channel not found in this workspace' }, { status: 404 });
    }

    // Check for name conflict
    if (name && name.trim() !== channel.name) {
      const existing = await prisma.channel.findFirst({
        where: {
          name: name.trim(),
          workspaceId,
        },
      });

      if (existing) {
        return NextResponse.json({ error: 'Channel name already exists' }, { status: 400 });
      }
    }

    // Update the channel
    const updatedChannel = await prisma.channel.update({
      where: { id: channelId },
      data: {
        ...(name && {
          name: name.trim(),
        }),
        ...(description !== undefined && {
          description: description.trim(),
        }),
      },
    });

    return NextResponse.json({
      message: 'Channel updated successfully',
      channel: updatedChannel,
    });
  } catch (error) {
    console.error('Error updating channel:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
