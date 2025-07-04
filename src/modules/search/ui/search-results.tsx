import Link from 'next/link';
import prisma from '@/lib/prisma';
import { PlusIcon, SearchIcon, TrendingUpIcon } from 'lucide-react';
import { WorkspaceCard } from '@/modules/workspace/ui/workspace-card';

type Props = {
  query: string;
};

function EmptyState({ query }: { query: string }) {
  return (
    <div className="text-center py-20">
      <div className="relative mb-8">
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl w-32 h-32 mx-auto flex items-center justify-center shadow-lg">
          <SearchIcon className="size-12 text-slate-400" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-900 mb-3">No workspaces found</h3>
      <p className="text-slate-900 max-w-md mx-auto mb-8 leading-relaxed">
        We couldn&apos;t find any workspaces matching &quot;{query}&quot;. Try different keywords or
        create your own workspace to get started.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/get-started"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <PlusIcon className="size-4 group-hover:rotate-90 transition-transform duration-300" />
          Create New Workspace
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-xl font-medium shadow-md hover:shadow-lg border border-slate-200 hover:border-slate-300 transition-all duration-300"
        >
          Browse All Workspaces
        </Link>
      </div>
    </div>
  );
}

export const SearchResults = async ({ query }: Props) => {
  const results = await prisma.workspace.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    include: {
      channels: {
        select: {
          id: true,
          name: true,
        },
        take: 5,
      },
      _count: {
        select: {
          memberships: true,
          channels: true,
        },
      },
    },
    take: 20,
  });

  if (results.length === 0) {
    return <EmptyState query={query} />;
  }

  return (
    <div className="space-y-6">
      {/* Results Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <TrendingUpIcon className="size-4" />
          <span>
            Found {results.length} workspace{results.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {results.map((workspace, index) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} index={index} />
        ))}
      </div>
    </div>
  );
};

export function SearchSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/50"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-slate-200 rounded-xl animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-5 bg-slate-200 rounded w-32 animate-pulse" />
                <div className="h-6 bg-slate-200 rounded-full w-16 animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 bg-slate-200 rounded w-16 animate-pulse" />
                <div className="h-6 bg-slate-200 rounded w-20 animate-pulse" />
              </div>
              <div className="h-9 bg-slate-200 rounded-lg w-32 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
