import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components/native';

import { movieApi } from '../lib/api';
import { Horizontal, List, ScrollViewContainer } from '../components';
import { Input } from '../components/search';

interface IMovie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  vote_average: number;
  overview: string;
}

interface IResults {
  movies: IMovie[];
  error: null | Error;
}

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IResults>({
    movies: [],
    error: null,
  });

  const onChange = useCallback(text => {
    setQuery(text);
  }, []);

  const onSubmit = useCallback(async () => {
    if (query.trim() !== '') {
      const [movies, error] = await movieApi.search(query);

      const filteredMovies = movies.filter((movie: IMovie) => {
        return (
          typeof movie.poster_path === 'string' && movie.overview.trim() !== ''
        );
      });

      setResults({ movies: filteredMovies, error });
    }
  }, [query]);

  return (
    <ScrollViewContainer refreshFunction={onSubmit}>
      <Input
        value={query}
        placeholder="검색할 영화 제목을 입력하세요."
        onChange={onChange}
        onSubmit={onSubmit}
      />

      {results.movies.length !== 0 && (
        <List title="Search Results">
          {results.movies.map(movie => (
            <Horizontal
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              vote={movie.vote_average}
              overview={movie.overview}
            />
          ))}
        </List>
      )}
    </ScrollViewContainer>
  );
};

export default memo(Search);
