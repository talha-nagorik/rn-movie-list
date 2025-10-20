import type { MovieSummary } from '@/hooks/queries';
import React, { useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, useWindowDimensions, View } from 'react-native';
import { PosterCard } from './PosterCard';
import { SkeletonPoster } from './SkeletonPoster';

type Props = {
  items: MovieSummary[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  refetch?: () => void;
  onEndReached?: () => void;
};

export function PosterGrid({ items, isLoading, isFetchingNextPage, refetch, onEndReached }: Props) {
  const { width } = useWindowDimensions();
  const columns = width >= 768 ? 3 : 2;
  const gap = 12;
  const cardWidth = (width - gap * (columns + 1)) / columns;

  const keyExtractor = useCallback((m: MovieSummary) => String(m.id), []);

  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor}
      numColumns={columns}
      columnWrapperStyle={{ gap, paddingHorizontal: gap }}
      contentContainerStyle={{ gap, paddingVertical: gap }}
      renderItem={({ item }) => <PosterCard movie={item} width={cardWidth} />}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      refreshControl={<RefreshControl refreshing={!!isLoading} onRefresh={refetch ?? (() => undefined)} />}
      ListFooterComponent={isFetchingNextPage ? (
        <View style={styles.footerRow}>
          <View style={{ width: cardWidth }}><SkeletonPoster /></View>
          <View style={{ width: cardWidth }}><SkeletonPoster /></View>
        </View>
      ) : null}
    />
  );
}

const styles = StyleSheet.create({
  footerRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 12,
  },
});


