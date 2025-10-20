import type { MovieSummary } from '@/hooks/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type FavoriteMap = Record<string, MovieSummary>;
const STORAGE_KEY = 'favorites.movies.v1';

const useDebouncedEffect = (effect: () => void, deps: unknown[], delay: number) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(effect, delay);
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export function useFavorites() {
  const [map, setMap] = useState<FavoriteMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setMap(JSON.parse(raw));
      } catch {}
      setReady(true);
    })();
  }, []);

  useDebouncedEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(map)).catch(() => undefined);
  }, [map], 300);

  const isFavorite = useCallback((id: number) => Boolean(map[id]), [map]);
  const toggleFavorite = useCallback((movie: MovieSummary) => {
    setMap((prev) => {
      const next = { ...prev } as FavoriteMap;
      if (next[movie.id]) {
        delete next[movie.id];
      } else {
        next[movie.id] = movie;
      }
      return next;
    });
  }, []);

  const favoritesList = useMemo(() => Object.values(map), [map]);

  return { ready, favoritesList, isFavorite, toggleFavorite };
}


