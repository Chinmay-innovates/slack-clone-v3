import Image from 'next/image';
import { redirect } from 'next/navigation';
import { SignOutButton } from '@clerk/nextjs';
import { ArrowRightIcon, UsersIcon } from 'lucide-react';

import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { WorkspaceList } from '@/components/workspace-list';

export default async function Home() {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const memberships = await prisma.membership.findMany({
    where: {
      userId: user!.id,
    },
    include: {
      workspace: {
        include: {
          _count: {
            select: { memberships: true },
          },
          memberships: {
            take: 5,
          },
          channels: {
            take: 1,
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  const workspaces = memberships.map((membership) => {
    const { workspace } = membership;
    return {
      id: workspace.id,
      name: workspace.name,
      image: workspace.image,
      memberCount: workspace._count.memberships,
      firstChannelId: workspace.channels[0].id,
    };
  });

  const invitations = await prisma.invitation.findMany({
    where: {
      email: userEmail,
      acceptedAt: null,
    },
    include: {
      workspace: {
        include: {
          _count: {
            select: { memberships: true },
          },
          memberships: {
            take: 5,
          },
        },
      },
    },
  });

  const processedInvitations = invitations.map((invitation) => {
    const { workspace } = invitation;
    return {
      id: workspace.id,
      name: workspace.name,
      image: workspace.image,
      memberCount: workspace._count.memberships,
      token: invitation.token,
    };
  });

  async function acceptInvitation(formData: FormData) {
    'use server';
    const token = String(formData.get('token'));
    const invitation = await prisma.invitation.findUnique({
      where: { token },
    });

    await prisma.membership.create({
      data: {
        userId: user!.id,
        email: userEmail!,
        workspace: {
          connect: { id: invitation!.workspaceId },
        },
        role: 'user',
      },
    });

    await prisma.invitation.update({
      where: { token },
      data: {
        acceptedAt: new Date(),
        acceptedById: user!.id,
      },
    });

    const workspace = await prisma.workspace.findUnique({
      where: { id: invitation!.workspaceId },
      select: {
        id: true,
        channels: {
          take: 1,
          select: {
            id: true,
          },
        },
      },
    });

    redirect(`/client/${workspace!.id}/${workspace!.channels[0].id}`);
  }

  async function launchChat(formData: FormData) {
    'use server';
    const workspaceId = formData.get('workspaceId');
    const channelId = formData.get('channelId');
    redirect(`/client/${workspaceId}/${channelId}`);
  }

  async function goToGetStartedPage() {
    'use server';
    redirect('/get-started');
  }

  return (
    <div className="font-lato min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <div className="border-b border-gray-200">
        <Navbar action={goToGetStartedPage} />
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h1 className="text-5xl font-bold text-gray-900">Welcome back</h1>
            <Image
              src="https://em-content.zobj.net/source/microsoft-teams/337/waving-hand_1f44b.png "
              width={52}
              height={56}
              alt="waving-hand"
              unoptimized
            />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Pick up where you left off, or start something new with your team
          </p>
        </div>

        {/* Workspaces Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Your workspaces</h2>

          {workspaces.length > 0 ? (
            <WorkspaceList
              title={`Workspaces for ${userEmail}`}
              workspaces={workspaces}
              action={launchChat}
              actionText="Launch Slack"
            />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No workspaces yet</h3>
              <p className="text-gray-600 mb-6">
                You haven&apose;t joined any workspaces. Create one to get started!
              </p>
            </div>
          )}
        </div>

        {/* Create Workspace Card */}
        <div className="rounded-[9px] mb-12 border-[#fff3] border-4">
          <div className="flex flex-col sm:grid items-center bg-[#fff] p-4 grid-rows-[1fr] grid-cols-[200px_1fr_auto] rounded-[5px]">
            <Image
              src="https://a.slack-edge.com/613463e/marketing/img/homepage/bold-existing-users/create-new-workspace-module/woman-with-laptop-color-background.png"
              width={200}
              height={121}
              className="rounded-[5px] m-[-1rem_-1rem_-47px]"
              alt="woman-with-laptop"
            />
            <p className="mt-[50px] text-center sm:text-start mb-3 sm:my-0 pr-4 tracking-[.02em] text-[17.8px] text-black">
              <strong>
                {workspaces.length > 0
                  ? 'Want to use Slack with a different team?'
                  : 'Want to get started with Slack?'}
              </strong>
            </p>
            <form action={goToGetStartedPage}>
              <Button type="submit" variant="secondary">
                Create a new workspace
              </Button>
            </form>
          </div>
        </div>

        {/* Invitations Section */}
        {processedInvitations.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Pending invitations</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <p className="text-blue-800">You have pending workspace invitations.</p>
            </div>
            <WorkspaceList
              title={`Invitations for ${userEmail}`}
              workspaces={processedInvitations}
              action={acceptInvitation}
              actionText="Accept invite"
              buttonVariant="secondary"
            />
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Not seeing your workspace?</h3>
            <p className="text-gray-600 mb-6">
              You might have signed up with a different email address, or your workspace might be
              using a different sign-in method.
            </p>
            <SignOutButton redirectUrl="/sign-in">
              <Button
                variant="secondary"
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl flex items-center justify-center mx-auto"
              >
                Try a different email
                <ArrowRightIcon className="size-4 ml-2" />
              </Button>
            </SignOutButton>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-amber-50 py-12 mt-16 ">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="/apple-touch-icon.png"
              width={26}
              height={26}
              alt="apple-touch-icon"
              className="size-[26px]"
            />
            <span className="font-semibold text-gray-900">Slack</span>
          </div>
          <p className="text-gray-600">Where work happens</p>
        </div>
      </footer>
    </div>
  );
}
