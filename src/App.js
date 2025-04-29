// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import { FavoritesProvider } from './context/FavoritesContext';
const Favorites = lazy(() => import('./pages/Favorites'));
const EventDetail = lazy(() => import('./pages/EventDetail'));

function App() {
  return (
    <FavoritesProvider>
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/favorites" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <Favorites />
                </Suspense>
            }/>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </FavoritesProvider>
  );
}