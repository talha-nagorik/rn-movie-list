import { PosterGrid } from '@/components/movie/PosterGrid';
import { ErrorState } from '@/components/ui/ErrorState';
import { usePopularMovies } from '@/hooks/queries';
import React from 'react';

export default function PopularScreen() {
  const { data, refetch, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError } = usePopularMovies();
  const items = data?.items ?? [];
  if (isError) return <ErrorState onRetry={refetch} />;
  return (
    <PosterGrid
      items={items}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      refetch={refetch}
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
    />
  );
}


