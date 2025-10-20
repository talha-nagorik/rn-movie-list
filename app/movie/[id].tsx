import { ErrorState } from '@/components/ui/ErrorState';
import { Colors } from '@/constants/theme';
import { useMovieDetails } from '@/hooks/queries';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function MovieDetailsScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);
  const { data, isLoading, isError, refetch } = useMovieDetails(id);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'] as any;

  return (
    <>
      <Stack.Screen options={{ title: data?.title ?? 'Details', presentation: 'modal' }} />
      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
          {data?.backdrop_path ? (
            <Image source={{ uri: `https://image.tmdb.org/t/p/w780${data.backdrop_path}` }} style={[styles.backdrop, { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }]} transition={150} />
          ) : null}
          <View style={[styles.surface, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.title, { color: theme.text }]}>{data?.title}</Text>
            {data?.overview ? <Text style={[styles.overview, { color: theme.icon }]}>{data.overview}</Text> : null}
            <View style={styles.row}>
              {data?.genres?.length ? <Text style={[styles.meta, { color: theme.icon }]}>{data.genres.map((g) => g.name).join(' · ')}</Text> : null}
              {data?.runtime ? <Text style={[styles.meta, { color: theme.icon }]}>{data.runtime} min</Text> : null}
            </View>
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
  surface: {
    marginTop: 12,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingTop: 4,
  },
  overview: {
    paddingTop: 6,
    lineHeight: 20,
    opacity: 0.85,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 8,
  },
  meta: {},
});


