import * as Localization from 'expo-localization';
import ky from 'ky';

const baseUrl = process.env.EXPO_PUBLIC_TMDB_API_URL as string;
const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY as string;

if (!baseUrl) {
  console.warn('Missing EXPO_PUBLIC_TMDB_API_URL environment variable');
}
if (!apiKey) {
  console.warn('Missing EXPO_PUBLIC_TMDB_API_KEY environment variable');
}

const language = (() => {
  const tag = Localization.getLocales()?.[0]?.languageTag;
  return tag ?? 'en-US';
})();

export const tmdb = ky.create({
  prefixUrl: baseUrl,
  headers: {
    Accept: 'application/json',
    Authorization: apiKey ? `Bearer ${apiKey}` : '',
  },
  // Provide defaults; per-request searchParams will merge with these
  searchParams: {
    language,
  },
});

export type PaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export const getJson = async <T>(input: string, searchParams?: Record<string, string | number | boolean>) => {
  const sp = new URLSearchParams();
  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      sp.set(k, String(v));
    }
  }
  const res = await tmdb.get(input, { searchParams: sp }).json<T>();
  return res;
};


