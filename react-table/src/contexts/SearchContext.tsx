import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type SearchContextType = {
  searchValue: string;
  setSearchValue: (term: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState('');

  const searchState = useMemo(() => ({ searchValue, setSearchValue }), [searchValue]);

  return (
    <SearchContext.Provider value={searchState}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export {};