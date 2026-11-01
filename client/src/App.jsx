import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Certificates from './pages/Certificates.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Footer from './components/Footer.jsx';
import IntroOverlay from './components/IntroOverlay.jsx';
import MatrixRain from './components/MatrixRain.jsx';
import Navbar from './components/Navbar.jsx';
import { IntroContext } from './context/IntroContext.js';

function PortfolioRoutes() {
  const location = useLocation();
  const [phase, setPhase] = useState('done');
  const [hasDecoded, setHasDecoded] = useState(false);
  const introAttempted = useRef(false);
  const startDecode = useCallback(() => {
    setHasDecoded(true);
    setPhase('decode');
  }, []);
  const finishIntro = useCallback(() => setPhase('done'), []);
  const skipIntro = useCallback(() => setPhase('skipped'), []);

  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '/home.exe') return;
    if (introAttempted.current) return;
    introAttempted.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    try {
      if (window.sessionStorage.getItem('portfolio-intro-seen') === 'true') return;
      window.sessionStorage.setItem('portfolio-intro-seen', 'true');
    } catch (error) {
      console.warn('Session storage is unavailable; the intro will play this visit only.', error);
    }

    setPhase('boot');
  }, [location.pathname]);

  return (
    <IntroContext.Provider value={{ phase, hasDecoded }}>
      <div className="relative flex min-h-screen flex-col">
        <MatrixRain className="matrix-background" />
        <Navbar />
        <main className="relative z-10 flex-1">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/home.exe" element={<Home />} />
            <Route path="/projects.sys" element={<Projects />} />
            <Route path="/certs.dat" element={<Certificates />} />
            <Route path="/contact.sh" element={<Contact />} />
            <Route path="*" element={<Navigate to="/home.exe" replace />} />
          </Routes>
        </main>
        <Footer />
        {(phase === 'boot' || phase === 'decode') && (
          <IntroOverlay
            onDecode={startDecode}
            onFinish={finishIntro}
            onSkip={skipIntro}
          />
        )}
      </div>
    </IntroContext.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <PortfolioRoutes />
    </BrowserRouter>
  );
}
