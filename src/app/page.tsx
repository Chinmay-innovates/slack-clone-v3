import Image from 'next/image';
import { redirect } from 'next/navigation';
import { SignOutButton } from '@clerk/nextjs';
import { ArrowRightIcon, UsersIcon } from 'lucide-react';

import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';

export default function Home() {
  const workspaces = [];
  const processedInvitations = [];

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Workspace cards would go here */}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No workspaces yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't joined any workspaces. Create one to get started!
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
