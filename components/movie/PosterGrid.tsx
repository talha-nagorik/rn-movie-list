import type { MovieSummary } from '@/hooks/queries';
import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useCallback, useMemo } from 'react';
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

function PosterGridComponent({ items, isLoading, isFetchingNextPage, refetch, onEndReached }: Props) {
  const { width } = useWindowDimensions();
  const columns = width >= 768 ? 3 : 2;
  const gap = 12;
  const cardWidth = (width - gap * (columns + 1)) / columns;
  const surfaceAlt = useThemeColor({}, 'surfaceAlt' as any);

  // Calculate fixed item height for getItemLayout optimization
  // Card height: poster(220) + meta padding(20) + title minHeight(36) + gap(6) + grid gap(12) = 294px
  const ITEM_HEIGHT = 294;

  const keyExtractor = useCallback((m: MovieSummary, index: number) => `${m.id}-${index}`, []);

  // getItemLayout for VirtualizedList optimization - enables better scrolling performance
  const getItemLayout = useCallback((data: ArrayLike<MovieSummary> | null | undefined, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  // Memoize renderItem function to prevent recreation on every render
  const renderItem = useCallback(({ item }: { item: MovieSummary }) => (
    <PosterCard movie={item} width={cardWidth} />
  ), [cardWidth]);

  // Memoize ListFooterComponent to prevent recreation
  const ListFooterComponent = useMemo(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerRow}>
        <View style={{ width: cardWidth }}><SkeletonPoster /></View>
        <View style={{ width: cardWidth }}><SkeletonPoster /></View>
      </View>
    );
  }, [isFetchingNextPage, cardWidth]);

  // Memoize refreshControl to prevent recreation
  const refreshControl = useMemo(() => (
    <RefreshControl refreshing={!!isLoading} onRefresh={refetch ?? (() => undefined)} />
  ), [isLoading, refetch]);

  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor}
      numColumns={columns}
      columnWrapperStyle={{ gap, paddingHorizontal: gap }}
      contentContainerStyle={{ gap, paddingVertical: gap, backgroundColor: surfaceAlt }}
      renderItem={renderItem}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      refreshControl={refreshControl}
      ListFooterComponent={ListFooterComponent}
      // VirtualizedList performance optimizations
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={10}
      updateCellsBatchingPeriod={50}
      // Additional performance props
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
        autoscrollToTopThreshold: 10,
      }}
      // Optimize for better scrolling
      scrollEventThrottle={16}
      disableVirtualization={false}
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

// Custom comparison function for React.memo
const areEqual = (prevProps: Props, nextProps: Props) => {
  // Compare arrays by length and reference (shallow comparison)
  // For deeper comparison, we could compare each item, but that might be expensive
  return (
    prevProps.items === nextProps.items &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.isFetchingNextPage === nextProps.isFetchingNextPage &&
    prevProps.refetch === nextProps.refetch &&
    prevProps.onEndReached === nextProps.onEndReached
  );
};

// Export memoized component
export const PosterGrid = React.memo(PosterGridComponent, areEqual);


