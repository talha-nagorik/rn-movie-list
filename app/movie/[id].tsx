import { ErrorState } from '@/components/ui/ErrorState';
import { Colors } from '@/constants/theme';
import { useMovieCredits, useMovieDetails, useSimilarMovies } from '@/hooks/queries';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function MovieDetailsScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);
  const { data, isError, refetch } = useMovieDetails(id);
  const { data: credits } = useMovieCredits(id);
  const { data: similar } = useSimilarMovies(id);
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
            {data?.tagline ? <Text style={[styles.tagline, { color: theme.icon }]}>{data.tagline}</Text> : null}
            {data?.overview ? <Text style={[styles.overview, { color: theme.icon }]}>{data.overview}</Text> : null}
            <View style={styles.row}>
              {data?.genres?.length ? <Text style={[styles.meta, { color: theme.icon }]}>{data.genres.map((g) => g.name).join(' · ')}</Text> : null}
              {data?.runtime ? <Text style={[styles.meta, { color: theme.icon }]}>{data.runtime} min</Text> : null}
            </View>
            <View style={styles.badgesRow}>
              {data?.vote_average != null ? (
                <View style={[styles.badge, { backgroundColor: '#d6e2ec' }]}>
                  <Text style={styles.badgeText}>★ {data.vote_average.toFixed(1)}</Text>
                </View>
              ) : null}
              {data?.vote_count != null ? (
                <View style={[styles.badge, { backgroundColor: '#efe7dc' }]}>
                  <Text style={styles.badgeText}>{data.vote_count} votes</Text>
                </View>
              ) : null}
              {data?.release_date ? (
                <View style={[styles.badge, { backgroundColor: '#e6d8c6' }]}>
                  <Text style={styles.badgeText}>{data.release_date}</Text>
                </View>
              ) : null}
            </View>
          </View>
          {credits?.cast?.length ? (
            <View style={{ marginTop: 16 }}>
              <Text style={[styles.sectionTitle, { color: theme.text, paddingHorizontal: 16 }]}>Cast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 12, paddingTop: 8 }}>
                {credits.cast.slice(0, 12).map((c) => (
                  <Link key={c.id} href={{ pathname: '/person/[id]', params: { id: String(c.id) } }} asChild>
                    <Pressable style={styles.castCard}>
                      {c.profile_path ? (
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w185${c.profile_path}` }} style={styles.castImage} transition={150} />
                      ) : (
                        <View style={[styles.castImage, { backgroundColor: '#d6e2ec' }]} />
                      )}
                      <Text numberOfLines={1} style={styles.castName}>{c.name}</Text>
                      {c.character ? <Text numberOfLines={1} style={styles.castCharacter}>{c.character}</Text> : null}
                    </Pressable>
                  </Link>
                ))}
              </ScrollView>
            </View>
          ) : null}
          {similar?.length ? (
            <View style={{ marginTop: 8 }}>
              <Text style={[styles.sectionTitle, { color: theme.text, paddingHorizontal: 16 }]}>Similar</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 12, paddingTop: 8, paddingBottom: 12 }}>
                {similar.slice(0, 12).map((m) => (
                  <Link key={m.id} href={{ pathname: '/movie/[id]', params: { id: String(m.id) } }} asChild>
                    <Pressable style={styles.similarCard}>
                      {m.poster_path ? (
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w342${m.poster_path}` }} style={styles.similarImage} transition={150} />
                      ) : (
                        <View style={[styles.similarImage, { backgroundColor: '#f5efe6', alignItems: 'center', justifyContent: 'center' }]}><Text>{m.title.slice(0,2).toUpperCase()}</Text></View>
                      )}
                    </Pressable>
                  </Link>
                ))}
              </ScrollView>
            </View>
          ) : null}
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
  tagline: {
    fontStyle: 'italic',
    opacity: 0.9,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 8,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 8,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  castCard: {
    width: 92,
    alignItems: 'center',
  },
  castImage: {
    width: 92,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#d6e2ec',
  },
  castName: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    maxWidth: 92,
  },
  castCharacter: {
    fontSize: 11,
    opacity: 0.8,
    maxWidth: 92,
  },
  similarCard: {
    width: 100,
  },
  similarImage: {
    width: 100,
    height: 150,
    borderRadius: 12,
  },
  meta: {},
});


