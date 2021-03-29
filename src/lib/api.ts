import axios from 'axios';

import API_KEY from './apiKey';

const makeRequest = (path: string, params?: {}) => {
  return axios.get(`https://api.themoviedb.org/3${path}`, {
    params: { api_key: API_KEY, language: 'ko-KR', region: 'kr', ...params },
  });
};

export const movieApi = {
  discover: () => makeRequest('/discover/movie'),
  details: (movieId: number) => makeRequest(`/movie/${movieId}`),
  nowPlaying: () => makeRequest('/movie/now_playing'),
  popular: () => makeRequest('/movie/popular'),
  upcoming: () => makeRequest('/movie/upcoming'),
  search: (query: string) => makeRequest('/search/movie', { query }),
};

export const tvApi = {
  details: (tvId: number) => makeRequest(`/tv/${tvId}`),
  today: () => makeRequest('/tv/airing_today'),
  thisWeek: () => makeRequest('/tv/on_the_air'),
  popular: () => makeRequest('/tv/popular'),
  topRated: () => makeRequest('/tv/top_rated'),
  search: (query: string) => makeRequest('/search/tv', { query }),
};
