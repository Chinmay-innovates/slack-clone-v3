import { Workspace } from '@/generated/prisma';

import { ArrowRightIcon, UsersIcon, HashIcon } from 'lucide-react';
import Link from 'next/link';
type Props = {
  workspace: Workspace & {
    channels: { id: string; name: string }[];
    _count: { memberships: number; channels: number };
  };
  index: number;
};

export const WorkspaceCard = ({ index, workspace }: Props) => {
  const firstChannel = workspace.channels[0];
  const remainingChannels = workspace._count.channels - workspace.channels.length;

  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-2xl border border-white/50 hover:border-blue-200/50 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.8s ease-out forwards',
      }}
    >
      {/* Card Header with Gradient */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Enhanced Workspace Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <img
                src={
                  workspace.image ??
                  `https://a.slack-edge.com/80588/img/avatars-teams/ava_0014-88.png`
                }
                alt={workspace.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm animate-pulse" />
          </div>

          {/* Workspace Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-300 truncate pr-2">
                {workspace.name}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-slate-500 bg-slate-50 rounded-full px-3 py-1 flex-shrink-0">
                <UsersIcon className="size-3.5" />
                <span className="font-medium">{workspace._count.memberships}</span>
              </div>
            </div>

            {/* Enhanced Channel Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {workspace.channels.slice(0, 3).map((channel) => (
                <span
                  key={channel.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                >
                  <HashIcon className="size-3.5" />
                  {channel.name}
                </span>
              ))}
              {remainingChannels > 0 && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600">
                  +{remainingChannels} more
                </span>
              )}
            </div>

            {/* Enhanced Action Button */}
            <Link
              href={
                firstChannel
                  ? `/client/${workspace.id}/${firstChannel.id}`
                  : `/workspace/${workspace.id}`
              }
              className="group/btn inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <ArrowRightIcon className="size-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
              Join Workspace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
