import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components/native';

import { movieApi } from '../lib/api';
import { Horizontal, List } from '../components';
import { Input } from '../components/search';

const StyledScrollView = styled.ScrollView({
  backgroundColor: '#000',
});

interface IResults {
  movies: {
    id: number;
    poster_path: string;
    backdrop_path: string;
    title: string;
    vote_average: number;
    overview: string;
  }[];
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
    const [movies, error] = await movieApi.search(query.trim());

    setResults({ movies, error });
  }, [query]);

  return (
    <StyledScrollView>
      <Input value={query} onChange={onChange} onSubmit={onSubmit} />

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
    </StyledScrollView>
  );
};

export default memo(Search);
