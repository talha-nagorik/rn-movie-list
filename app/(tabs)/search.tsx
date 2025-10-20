import { PosterGrid } from '@/components/movie/PosterGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { SearchBar } from '@/components/ui/SearchBar';
import { TabScene } from '@/components/ui/TabScene';
import { useSearchMovies } from '@/hooks/queries';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import React, { useState } from 'react';

export default function SearchScreen() {
  const [q, setQ] = useState('');
  const debouncedQ = useDebouncedValue(q, 350);
  const { data, refetch, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError } = useSearchMovies(debouncedQ);
  const items = data?.items ?? [];
  const hasQuery = q.trim().length > 0;

  return (
    <TabScene>
      <SearchBar value={q} onChangeText={setQ} onSubmit={(t) => setQ(t)} />
      {!hasQuery ? (
        <EmptyState title="Search movies" message="Type to find titles." />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <PosterGrid
          items={items}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          refetch={refetch}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
        />
      )}
    </TabScene>
  );
}


