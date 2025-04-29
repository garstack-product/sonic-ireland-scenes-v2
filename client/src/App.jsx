import React from 'react';
// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import EventDetail from './pages/EventDetail/EventDetail.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
//const Favorites = lazy(() => import('./pages/Favorites/Favorites.jsx'));
//const EventDetail = lazy(() => import('./pages/EventDetail/EventDetail.jsx'));

function App() {
  return (
    <BrowserRouter>
    <FavoritesProvider>
    <Router>
      <div className="app">
        <Header />
        <h1>Test Content - If you see this, React is working</h1>
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
    </BrowserRouter>
  );
}