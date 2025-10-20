import { PosterGrid } from '@/components/movie/PosterGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { SearchBar } from '@/components/ui/SearchBar';
import { useSearchMovies } from '@/hooks/queries';
import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function SearchScreen() {
  const [q, setQ] = useState('');
  const { data, refetch, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError } = useSearchMovies(q);
  const items = data?.items ?? [];

  if (!q.trim()) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <SearchBar value={q} onChangeText={setQ} />
          <EmptyState title="Search movies" message="Type to find titles." />
        </>
      </TouchableWithoutFeedback>
    );
  }

  if (isError) {
    return (
      <>
        <SearchBar value={q} onChangeText={setQ} />
        <ErrorState onRetry={refetch} />
      </>
    );
  }

  return (
    <>
      <SearchBar value={q} onChangeText={setQ} />
      <PosterGrid
        items={items}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        refetch={refetch}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
      />
    </>
  );
}


