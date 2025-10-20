import { ErrorState } from '@/components/ui/ErrorState';
import { useMovieDetails } from '@/hooks/queries';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function MovieDetailsScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);
  const { data, isLoading, isError, refetch } = useMovieDetails(id);

  return (
    <>
      <Stack.Screen options={{ title: data?.title ?? 'Details', presentation: 'modal' }} />
      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {data?.backdrop_path ? (
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w780${data.backdrop_path}` }}
              style={styles.backdrop}
              transition={150}
            />
          ) : null}
          <Text style={styles.title}>{data?.title}</Text>
          {data?.overview ? <Text style={styles.overview}>{data.overview}</Text> : null}
          <View style={styles.row}>
            {data?.genres?.length ? <Text style={styles.meta}>{data.genres.map((g) => g.name).join(' · ')}</Text> : null}
            {data?.runtime ? <Text style={styles.meta}>{data.runtime} min</Text> : null}
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  backdrop: {
    width: '100%',
    height: 220,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  overview: {
    paddingHorizontal: 16,
    paddingTop: 8,
    lineHeight: 20,
    opacity: 0.85,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  meta: {
    color: '#274060',
  },
});


