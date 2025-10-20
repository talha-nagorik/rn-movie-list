import type { MovieSummary } from '@/hooks/queries';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useFavorites } from '@/state/favorites';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = { movie: MovieSummary; width: number };

function PosterCardComponent({ movie, width }: Props) {
  const scale = useSharedValue(1);
  const { isFavorite, toggleFavorite } = useFavorites();
  const posterUri = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined;
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const ratingColor = useThemeColor({}, 'textMuted');
  const heartColor = useThemeColor({}, 'icon');
  const heartActive = useThemeColor({}, 'error');

  const rStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Link href={{ pathname: '/movie/[id]', params: { id: String(movie.id) } }} asChild>
      <Pressable
        onPressIn={() => (scale.value = withTiming(0.98, { duration: 100 }))}
        onPressOut={() => (scale.value = withTiming(1, { duration: 120 }))}
        accessibilityRole="button"
        accessibilityLabel={`Open ${movie.title}`}
        style={{ width }}>
        <Animated.View style={[styles.card, { backgroundColor: cardBg, borderColor: border }, rStyle]}> 
          {posterUri ? (
            <Image source={{ uri: posterUri }} style={styles.poster} transition={150} contentFit="cover" />
          ) : (
            <View style={[styles.poster, styles.posterFallback] }>
              <Text style={styles.fallbackText}>{movie.title.slice(0, 2).toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.meta}>
            <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
            <View style={styles.row}>
              <Text accessibilityLabel={`Rating ${movie.vote_average?.toFixed(1) ?? 'unknown'}`} style={[styles.rating, { color: ratingColor }]}>★ {movie.vote_average?.toFixed(1) ?? '–'}</Text>
              <Pressable onPress={() => toggleFavorite(movie)} hitSlop={10}>
                <Text
                  accessibilityRole="button"
                  accessibilityLabel={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
                  style={[styles.heart, { color: heartColor }, isFavorite(movie.id) && { color: heartActive }]}>
                  ♥
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f5efe6',
    borderWidth: 1,
  },
  poster: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  posterFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d6e2ec',
  },
  fallbackText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#274060',
  },
  meta: {
    padding: 10,
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    minHeight: 36, // reserve space for up to 2 lines to equalize card heights
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 12,
    color: '#354a5f',
  },
  heart: {
    fontSize: 16,
    color: '#7a8b99',
  },
});

// Custom comparison function for React.memo
const areEqual = (prevProps: Props, nextProps: Props) => {
  // Compare movie object properties that affect rendering
  return (
    prevProps.movie.id === nextProps.movie.id &&
    prevProps.movie.title === nextProps.movie.title &&
    prevProps.movie.poster_path === nextProps.movie.poster_path &&
    prevProps.movie.vote_average === nextProps.movie.vote_average &&
    prevProps.width === nextProps.width
  );
};

// Export memoized component
export const PosterCard = React.memo(PosterCardComponent, areEqual);


