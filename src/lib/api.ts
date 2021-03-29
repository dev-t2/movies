import axios from 'axios';

import API_KEY from './apiKey';

interface IMakeRequest {
  path: string;
  params: {};
}

export const makeRequest = ({ path, params }: IMakeRequest) => {
  return axios.get(`https://api.themoviedb.org/3${path}`, {
    params: { api_key: API_KEY, ...params },
  });
};
