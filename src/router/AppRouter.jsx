import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, HotelPage, ListPage } from '../pages';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<ListPage />} />
        <Route path="/hotels/:id" element={<HotelPage />} />
      </Routes>
    </BrowserRouter>
  );
};
