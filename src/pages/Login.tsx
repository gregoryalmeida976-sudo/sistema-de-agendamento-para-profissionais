import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Cadastro realizado! Se configurado, verifique seu e-mail.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // The session state change will be picked up by the router
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'Erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-col items-center justify-center p-6 min-h-[100vh]" style={{ backgroundColor: 'var(--bg-default)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}
      >
        <div className="flex-col items-center mb-6">
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            backgroundColor: 'var(--brand-primary)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '1rem',
            boxShadow: 'var(--shadow-float)'
          }}>
            <LogIn size={32} />
          </div>
          <h1 className="text-title text-center" style={{ fontSize: '1.5rem' }}>
            {isSignUp ? 'Criar sua Conta' : 'Acesse sua Agenda'}
          </h1>
          <p className="text-small text-center mt-2">
            O PWA definitivo para autônomos
          </p>
        </div>

        {errorMsg && (
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--danger-color)', color: 'white', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="flex-col gap-4">
          <div className="flex-col gap-1">
            <label className="text-small">E-mail Profissional</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
              placeholder="seu@email.com" 
              className="card" 
              style={{ padding: '0.75rem', border: '1px solid var(--border-color)', boxShadow: 'none' }} 
            />
          </div>
          <div className="flex-col gap-1 mb-4">
            <label className="text-small">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
              placeholder="••••••••" 
              className="card" 
              style={{ padding: '0.75rem', border: '1px solid var(--border-color)', boxShadow: 'none' }} 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary flex justify-center" 
            style={{ width: '100%', padding: '1rem' }}
          >
            {loading ? 'Aguarde...' : (isSignUp ? 'Cadastrar' : 'Entrar')}
          </button>
        </form>

        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          style={{ 
            background: 'none', border: 'none', width: '100%', 
            marginTop: '1.5rem', color: 'var(--text-secondary)',
            fontSize: '0.875rem', cursor: 'pointer'
          }}
        >
          {isSignUp ? 'Já tem uma conta? Faça Login' : 'Ainda não é cadastrado? Criar Conta'}
        </button>
      </motion.div>
    </div>
  );
}
