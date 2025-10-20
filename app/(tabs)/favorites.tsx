import { PosterGrid } from '@/components/movie/PosterGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { TabScene } from '@/components/ui/TabScene';
import { useFavorites } from '@/state/favorites';
import React from 'react';

export default function FavoritesScreen() {
  const { ready, favoritesList } = useFavorites();
  if (!ready) return null;
  if (favoritesList.length === 0) return <EmptyState title="No favorites yet" message="Tap the heart on a movie to save it." />;
  return (
    <TabScene>
      <PosterGrid items={favoritesList} />
    </TabScene>
  );
}


