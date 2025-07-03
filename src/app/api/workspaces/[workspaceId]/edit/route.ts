import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

type Params = {
  params: {
    workspaceId: string;
  };
};

export async function PATCH(request: Request, { params }: Params) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, image, invites } = body;
    const { workspaceId } = params;

    if (!workspaceId || (!name && !image && !Array.isArray(invites))) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
    });

    if (!workspace || workspace.ownerId !== userId) {
      return NextResponse.json({ error: 'Unauthorized or workspace not found' }, { status: 403 });
    }

    const updatedWorkspace = await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        ...(name && { name }),
        ...(image && { image }),
      },
    });

    if (Array.isArray(invites)) {
      await prisma.invitation.deleteMany({
        where: {
          workspaceId,
          acceptedAt: null,
        },
      });

      await Promise.all(
        invites.map((email: string) =>
          prisma.invitation.create({
            data: {
              email,
              token: crypto.randomUUID(),
              workspaceId,
              invitedById: userId,
            },
          }),
        ),
      );
    }

    return NextResponse.json({
      message: 'Workspace updated successfully',
      workspace: updatedWorkspace,
    });
  } catch (error) {
    console.error('Error updating workspace:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
