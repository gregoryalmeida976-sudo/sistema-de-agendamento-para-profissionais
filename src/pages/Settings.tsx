import { useState } from 'react';
import BottomSheet from '../components/BottomSheet';

export default function Settings() {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme') || 'light'
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Perfil atualizado com sucesso! (Mock)');
    setIsProfileOpen(false);
  };

  return (
    <>
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
          <button 
            onClick={() => setIsProfileOpen(true)}
            className="btn btn-primary mt-4" 
            style={{ width: '100%' }}
          >
            Editar Perfil
          </button>
        </div>
      </div>

      <BottomSheet
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        title="Editar Perfil"
      >
        <form onSubmit={handleSaveProfile} className="flex-col gap-4">
          <div className="flex-col gap-1">
            <label className="text-small">Nome Completo</label>
            <input type="text" defaultValue="Alex Silva" required className="card" style={{ padding: '0.75rem' }} />
          </div>
          <div className="flex-col gap-1 mb-4">
            <label className="text-small">Meta Mensal (R$)</label>
            <input type="number" defaultValue={8000} className="card" style={{ padding: '0.75rem' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
            Salvar Alterações
          </button>
        </form>
      </BottomSheet>
    </>
  );
}
