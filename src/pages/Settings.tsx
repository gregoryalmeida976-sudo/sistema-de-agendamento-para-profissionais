import { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import BottomSheet from '../components/BottomSheet';
import { supabase } from '../lib/supabase';

export default function Settings() {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme') || 'light'
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [name, setName] = useState('Carregando...');
  const [email, setEmail] = useState('');
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setEmail(user.email || '');
        const autoName = user.email ? user.email.split('@')[0] : 'Profissional';
        // Capitalize first letter of autoName
        const capitalizedName = autoName.charAt(0).toUpperCase() + autoName.slice(1);
        const displayName = user.user_metadata?.full_name || capitalizedName;
        setName(displayName);
        setInputName(displayName);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
         const autoName = session.user.email ? session.user.email.split('@')[0] : 'Profissional';
         const capitalizedName = autoName.charAt(0).toUpperCase() + autoName.slice(1);
         const displayName = session.user.user_metadata?.full_name || capitalizedName;
         setName(displayName);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setName(inputName);
    setIsProfileOpen(false);

    // Save to Supabase Auth Metadata natively
    await supabase.auth.updateUser({
      data: { full_name: inputName }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
            <p className="text-body"><span style={{fontWeight:600}}>Nome:</span> {name}</p>
            <p className="text-body"><span style={{fontWeight:600}}>Email:</span> {email}</p>
            <p className="text-body"><span style={{fontWeight:600}}>Meta Mensal:</span> R$ 8.000,00</p>
          </div>
          <button 
            onClick={() => {
              setInputName(name); // Reset input to current saved name
              setIsProfileOpen(true);
            }}
            className="btn btn-primary mt-4" 
            style={{ width: '100%' }}
          >
            Editar Perfil
          </button>
        </div>

        <button 
          onClick={handleLogout}
          className="btn btn-secondary flex items-center justify-center gap-2 mt-4" 
          style={{ width: '100%', borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }}
        >
          <LogOut size={20} />
          Sair do Aplicativo
        </button>
      </div>

      <BottomSheet
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        title="Editar Perfil"
      >
        <form onSubmit={handleSaveProfile} className="flex-col gap-4">
          <div className="flex-col gap-1">
            <label className="text-small">Nome Completo</label>
            <input 
              type="text" 
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              required 
              className="card" 
              style={{ padding: '0.75rem' }} 
            />
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
