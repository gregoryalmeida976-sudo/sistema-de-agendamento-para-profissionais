import { Link, useLocation } from 'react-router-dom';
import { Home, PieChart, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNavBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/finance', label: 'Finanças', icon: PieChart },
    { path: '/settings', label: 'Ajustes', icon: Settings },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 'var(--safe-area-bottom)',
      left: 0,
      right: 0,
      height: 'var(--bottom-bar-height)',
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-color)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '0 1rem',
      zIndex: 50,
      boxShadow: '0 -4px 10px rgba(0,0,0,0.05)',
    }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
              position: 'relative',
              padding: '0.5rem',
              transition: 'color var(--transition-fast)'
            }}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  style={{
                    position: 'absolute',
                    bottom: '-28px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand-primary)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
            </div>
            <span style={{ 
              fontSize: '0.7rem', 
              marginTop: '4px',
              fontWeight: isActive ? 600 : 400 
            }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
