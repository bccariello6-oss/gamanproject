import React, { useState, useEffect } from 'react';
import SplashScreen from './screens/SplashScreen';
import MenuApp from './screens/MenuApp';
import KitchenPanel from './screens/KitchenPanel';

export default function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [showSplash, setShowSplash] = useState(route === '' || route === '#/');

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash;
      setRoute(hash);
      if (hash === '#/menu' || hash === '#/cozinha') {
        setShowSplash(false);
      } else if (hash === '' || hash === '#/') {
        setShowSplash(true);
      }
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  if (route === '#/cozinha') {
    return <KitchenPanel />;
  }

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return <MenuApp />;
}
