import { AuthProvider, SearchProvider } from './context';

import { AppRouter } from './router/AppRouter';

export const App = () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <AppRouter />
      </SearchProvider>
    </AuthProvider>
  );
};
