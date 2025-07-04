import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { SearchIcon } from 'lucide-react';
import { SearchResults, SearchSkeleton } from '@/modules/search/ui/search-results';

type SearchPageProps = {
  searchParams: {
    q?: string;
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim();
  if (!query) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/50 mb-4">
            <SearchIcon className="size-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Search Results</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-2">
            Found workspaces for &quot;{query}&quot;
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover and join workspaces that match your interests
          </p>
        </div>

        <Suspense fallback={<SearchSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  );
}
