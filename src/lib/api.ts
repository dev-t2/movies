import axios from 'axios';

import API_KEY from './apiKey';

const getData = async (path: string, params?: {}) => {
  try {
    const {
      data: { results },
      data,
    } = await axios.get(`https://api.themoviedb.org/3${path}`, {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
        region: 'kr',
        append_to_response: 'videos',
        ...params,
      },
    });

    return [results ?? data, null];
  } catch (error) {
    return [null, error];
  }
};

export const movieApi = {
  discover: () => getData('/discover/movie'),
  details: (movieId: number) => getData(`/movie/${movieId}`),
  nowPlaying: () => getData('/movie/now_playing'),
  popular: () => getData('/movie/popular'),
  upcoming: () => getData('/movie/upcoming'),
  search: (query: string) => getData('/search/movie', { query }),
};

export const getImageUri = (path?: string) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};
