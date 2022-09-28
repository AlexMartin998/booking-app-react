import { SearchProvider } from './context/search/SearchProvider';
import { AppRouter } from './router/AppRouter';

export const App = () => {
  return (
    <SearchProvider>
      <AppRouter />
    </SearchProvider>
  );
};
