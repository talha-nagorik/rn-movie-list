import { ErrorState } from '@/components/ui/ErrorState';
import { Colors } from '@/constants/theme';
import { usePersonDetails } from '@/hooks/queries';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PersonDetailsScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);
  const { data, isError, refetch } = usePersonDetails(id);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'] as any;

  return (
    <>
      <Stack.Screen options={{ title: data?.name ?? 'Person', presentation: 'modal' }} />
      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 24, backgroundColor: theme.background }}>
          <View style={[styles.surface, { backgroundColor: theme.card, borderColor: theme.border }]}> 
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {data?.profile_path ? (
                <Image source={{ uri: `https://image.tmdb.org/t/p/w185${data.profile_path}` }} style={styles.avatar} transition={150} />
              ) : (
                <View style={[styles.avatar, { backgroundColor: '#d6e2ec' }]} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={[styles.name, { color: theme.text }]}>{data?.name}</Text>
                {data?.known_for_department ? (
                  <Text style={[styles.meta, { color: theme.icon }]}>{data.known_for_department}</Text>
                ) : null}
                {data?.birthday ? (
                  <Text style={[styles.meta, { color: theme.icon }]}>Born: {data.birthday}{data.place_of_birth ? `, ${data.place_of_birth}` : ''}</Text>
                ) : null}
              </View>
            </View>
            {data?.biography ? (
              <Text style={[styles.bio, { color: theme.icon }]}>{data.biography}</Text>
            ) : null}
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  surface: {
    marginTop: 12,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  avatar: {
    width: 96,
    height: 128,
    borderRadius: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  meta: {
    marginTop: 4,
  },
  bio: {
    marginTop: 10,
    lineHeight: 20,
    opacity: 0.9,
  },
});


