import { useReducer } from 'react';
import { types } from '../types/types';
import { SearchContext } from './SearchContext';
import { searchReducer } from './searchReducer';

export const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchProvider = ({ children }) => {
  const [searchState, dispatch] = useReducer(searchReducer, INITIAL_STATE);

  const setSearchData = searchData => {
    dispatch({
      type: types.newSearch,
      payload: searchData,
    });
    
  };

  return (
    <SearchContext.Provider value={{ ...searchState, setSearchData, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
