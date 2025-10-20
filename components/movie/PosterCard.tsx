import type { MovieSummary } from '@/hooks/queries';
import { useFavorites } from '@/state/favorites';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = { movie: MovieSummary; width: number };

export function PosterCard({ movie, width }: Props) {
  const scale = useSharedValue(1);
  const { isFavorite, toggleFavorite } = useFavorites();
  const posterUri = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined;

  const rStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Link href={{ pathname: '/movie/[id]', params: { id: String(movie.id) } }} asChild>
      <Pressable
        onPressIn={() => (scale.value = withTiming(0.98, { duration: 100 }))}
        onPressOut={() => (scale.value = withTiming(1, { duration: 120 }))}
        style={{ width }}>
        <Animated.View style={[styles.card, rStyle]}> 
          {posterUri ? (
            <Image source={{ uri: posterUri }} style={styles.poster} transition={150} contentFit="cover" />
          ) : (
            <View style={[styles.poster, styles.posterFallback]}>
              <Text style={styles.fallbackText}>{movie.title.slice(0, 2).toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.meta}>
            <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
            <View style={styles.row}>
              <Text style={styles.rating}>★ {movie.vote_average?.toFixed(1) ?? '–'}</Text>
              <Pressable onPress={() => toggleFavorite(movie)} hitSlop={10}>
                <Text style={[styles.heart, isFavorite(movie.id) && styles.heartActive]}>♥</Text>
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
  heartActive: {
    color: '#d85b5b',
  },
});


