import { Routes, Route } from 'react-router-dom';
import BottomNavBar from './components/BottomNavBar';
import VirtualAssistant from './components/VirtualAssistant';
import Home from './pages/Home';
import Finance from './pages/Finance';
import Settings from './pages/Settings';
import ServiceDetails from './pages/ServiceDetails';

function App() {
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
