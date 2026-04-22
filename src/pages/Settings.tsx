import { useState } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme') || 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="flex-col gap-4 mt-4">
      <h1 className="text-title mb-4">Ajustes</h1>
      
      <div className="card flex justify-between items-center">
        <div>
          <h2 className="text-subtitle">Aparência</h2>
          <p className="text-small mt-1">Alternar modo claro / escuro</p>
        </div>
        <button 
          onClick={toggleTheme}
          className="btn btn-secondary"
          style={{ padding: '0.5rem 1rem' }}
        >
          {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
        </button>
      </div>

      <div className="card mt-4">
        <h2 className="text-subtitle mb-2">Perfil Profissional</h2>
        <div className="flex-col gap-2">
          <p className="text-body">Nome: Alex Silva</p>
          <p className="text-body">Meta Mensal: R$ 8.000,00</p>
        </div>
        <button className="btn btn-primary mt-4" style={{ width: '100%' }}>
          Editar Perfil
        </button>
      </div>
    </div>
  );
}
