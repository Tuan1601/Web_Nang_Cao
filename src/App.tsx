import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { Header } from './components/Header';
import { fetchBooks } from './features/books/booksSlice';
import { WarningToast } from './features/books/components/WarningToast';
import HomePage from './pages/HomePage';

const StatsPage = lazy(() => import('./features/stats/StatsPage'));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Suspense
          fallback={
            <div className="state" role="status">
              <span className="spinner" aria-hidden="true" />
              Đang tải trang...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<p className="empty">Không tìm thấy trang.</p>} />
          </Routes>
        </Suspense>
      </main>
      <WarningToast />
    </BrowserRouter>
  );
}

export default App;
