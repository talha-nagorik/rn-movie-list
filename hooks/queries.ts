import { getJson, PaginatedResponse } from '@/lib/tmdb';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export type MovieSummary = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  vote_average: number;
};

export type MovieDetails = MovieSummary & {
  genres?: { id: number; name: string }[];
  runtime?: number;
  homepage?: string | null;
  status?: string;
  tagline?: string | null;
  vote_count?: number;
};

type Cursor = number | undefined;

const getNextPageParam = (lastPage: PaginatedResponse<MovieSummary>): Cursor => {
  if (!lastPage) return undefined;
  return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
};

const mapMovies = (pages?: PaginatedResponse<MovieSummary>[]) => pages?.flatMap((p) => p.results) ?? [];

export function useTrendingMovies() {
  return useInfiniteQuery({
    queryKey: ['movies', 'trending', 'day'],
    queryFn: async ({ pageParam = 1 }) => getJson<PaginatedResponse<MovieSummary>>('trending/movie/day', { page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      items: mapMovies(data.pages as PaginatedResponse<MovieSummary>[]),
    }),
  });
}

export function usePopularMovies() {
  return useInfiniteQuery({
    queryKey: ['movies', 'popular'],
    queryFn: async ({ pageParam = 1 }) => getJson<PaginatedResponse<MovieSummary>>('movie/popular', { page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      items: mapMovies(data.pages as PaginatedResponse<MovieSummary>[]),
    }),
  });
}

export function useNowPlayingMovies() {
  return useInfiniteQuery({
    queryKey: ['movies', 'now_playing'],
    queryFn: async ({ pageParam = 1 }) => getJson<PaginatedResponse<MovieSummary>>('movie/now_playing', { page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      items: mapMovies(data.pages as PaginatedResponse<MovieSummary>[]),
    }),
  });
}

export function useSearchMovies(query: string) {
  const enabled = query.trim().length > 0;
  return useInfiniteQuery({
    queryKey: ['movies', 'search', query],
    queryFn: async ({ pageParam = 1 }) => getJson<PaginatedResponse<MovieSummary>>('search/movie', { page: pageParam as number, query }),
    enabled,
    initialPageParam: 1,
    getNextPageParam,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      items: mapMovies(data.pages as PaginatedResponse<MovieSummary>[]),
    }),
  });
}

export function useMovieDetails(id?: number) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => getJson<MovieDetails>(`movie/${id}`),
    enabled: !!id,
  });
}

export type Credits = {
  id: number;
  cast: {
    id: number;
    name: string;
    character?: string;
    profile_path: string | null;
    order?: number;
  }[];
};

export function useMovieCredits(id?: number) {
  return useQuery({
    queryKey: ['movie', id, 'credits'],
    queryFn: () => getJson<Credits>(`movie/${id}/credits`),
    enabled: !!id,
  });
}

export function useSimilarMovies(id?: number) {
  return useQuery({
    queryKey: ['movie', id, 'similar'],
    queryFn: () => getJson<PaginatedResponse<MovieSummary>>(`movie/${id}/similar`, { page: 1 }),
    enabled: !!id,
    select: (data) => data.results,
  });
}


