import React, {createContext, useState} from 'react';

const SearchContext = createContext();

export function SearchContextProvider({children}) {
  const [keyword, onChangeText] = useState(''); // [keyword, onChangeText] 는 처음 보는 패턴이네
  return (
    <SearchContext.Provider value={{keyword, onChangeText}}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
