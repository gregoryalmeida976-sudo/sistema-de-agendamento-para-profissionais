import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import BottomNavBar from './components/BottomNavBar';
import VirtualAssistant from './components/VirtualAssistant';
import Home from './pages/Home';
import Finance from './pages/Finance';
import Settings from './pages/Settings';
import ServiceDetails from './pages/ServiceDetails';
import Login from './pages/Login';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-primary">Carregando...</div>;
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div className="app-container">
      <main style={{ padding: '1rem', paddingBottom: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
        </Routes>
      </main>
      <VirtualAssistant />
      <BottomNavBar />
    </div>
  );
}

export default App;
