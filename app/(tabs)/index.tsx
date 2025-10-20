import { PosterGrid } from '@/components/movie/PosterGrid';
import { ErrorState } from '@/components/ui/ErrorState';
import { TabScene } from '@/components/ui/TabScene';
import { useTrendingMovies } from '@/hooks/queries';
import React from 'react';

export default function TrendingScreen() {
  const { data, refetch, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError } = useTrendingMovies();
  const items = data?.items ?? [];
  if (isError) return <ErrorState onRetry={refetch} />;
  return (
    <TabScene>
      <PosterGrid
        items={items}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        refetch={refetch}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
      />
    </TabScene>
  );
}
