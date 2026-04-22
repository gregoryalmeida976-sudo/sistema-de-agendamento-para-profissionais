import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomSheet from '../components/BottomSheet';
import { supabase } from '../lib/supabase';

export default function Home() {
  const navigate = useNavigate();
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [userName, setUserName] = useState('Profissional');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const autoName = user.email ? user.email.split('@')[0] : 'Profissional';
        const capitalizedName = autoName.charAt(0).toUpperCase() + autoName.slice(1);
        setUserName(user.user_metadata?.full_name || capitalizedName);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
         const autoName = session.user.email ? session.user.email.split('@')[0] : 'Profissional';
         const capitalizedName = autoName.charAt(0).toUpperCase() + autoName.slice(1);
         setUserName(session.user.user_metadata?.full_name || capitalizedName);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Agendamento salvo com sucesso! (Mock)');
    setIsScheduleOpen(false);
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  // Pega a primeira letra do nome pra colocar no Avatar
  const getInitial = () => {
    return userName ? userName.charAt(0).toUpperCase() : 'A';
  };

  return (
    <>
      <motion.div 
        className="flex-col gap-4 mt-2"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.header variants={itemVariants} className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-title">Olá, {userName.split(' ')[0]} 👋</h1>
            <p className="text-small" style={{ color: 'var(--brand-primary)' }}>
              "A persistência é o caminho do êxito."
            </p>
          </div>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            backgroundColor: 'var(--brand-primary)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', fontSize: '1.25rem', boxShadow: 'var(--shadow-md)'
          }}>
            {getInitial()}
          </div>
        </motion.header>

        {/* Revenue Card */}
        <motion.div 
          variants={itemVariants}
          className="card" 
          style={{ 
            background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-hover) 100%)', 
            color: 'white', 
            border: 'none',
            boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.4)'
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', fontWeight: 500 }}>Faturamento de Hoje</p>
          <h2 style={{ fontSize: '2.25rem', color: 'white', marginTop: '0.25rem', fontWeight: 700 }}>R$ 450,00</h2>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-2">
          <div className="flex justify-between items-end mb-3">
            <h3 className="text-subtitle">Próximo Serviço</h3>
            <span className="text-small" style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>Ver agenda</span>
          </div>
          
          {/* Hero Card: Next Service */}
          <motion.div 
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/service/1')}
            className="card" 
            style={{ 
              position: 'relative', 
              overflow: 'hidden', 
              padding: '1.5rem',
              cursor: 'pointer'
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: 'var(--accent-color)' }} />
            <div className="flex justify-between items-start">
              <div style={{ flex: 1, paddingRight: '1rem' }}>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Manutenção Preventiva Ar 12k Btus</h4>
                <p className="text-body flex items-center gap-2 mb-1" style={{ fontSize: '0.9rem' }}>
                  <span style={{ fontWeight: 500 }}>Cliente:</span> Roberto Silva
                </p>
                <p className="text-small flex items-center gap-1" style={{ marginBottom: '0.5rem' }}>
                  <MapPin size={14} /> Av. Paulista, 1000 - Apto 42
                </p>
              </div>
              <div className="flex-col items-end">
                <div className="flex items-center gap-1" style={{ color: 'var(--accent-color)', marginBottom: '0.25rem' }}>
                  <Clock size={16} />
                  <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>14:30</span>
                </div>
                <span className="text-small" style={{ fontWeight: 600, color: 'var(--success-color)' }}>R$ 250,00</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-subtitle mt-2 mb-3">Hoje</h3>
          <div className="flex-col gap-3">
            {/* Mock outro item da agenda */}
            <div className="card flex justify-between items-center" style={{ padding: '1rem' }}>
              <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Visita Técnica</h4>
                  <p className="text-small">Ana Costa</p>
              </div>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>16:00</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Action FAB-style inline */}
        <motion.button 
          onClick={() => setIsScheduleOpen(true)}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary mt-4" 
          style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', gap: '0.5rem' }}
        >
          <CalendarPlus size={20} />
          Novo Agendamento
        </motion.button>
      </motion.div>

      <BottomSheet
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        title="Novo Agendamento"
      >
        <form onSubmit={handleCreateSchedule} className="flex-col gap-4">
          <div className="flex-col gap-1">
            <label className="text-small">Nome do Cliente</label>
            <input type="text" required placeholder="Ex: Roberto Silva" className="card" style={{ padding: '0.75rem' }} />
          </div>
          <div className="flex-col gap-1">
            <label className="text-small">Serviço/Título</label>
            <input type="text" required placeholder="Ex: Instalação de Ar" className="card" style={{ padding: '0.75rem' }} />
          </div>
          <div className="flex gap-4">
            <div className="flex-col gap-1" style={{ flex: 1 }}>
              <label className="text-small">Data e Hora</label>
              <input type="datetime-local" className="card" style={{ padding: '0.75rem' }} />
            </div>
            <div className="flex-col gap-1" style={{ flex: 1 }}>
              <label className="text-small">Preço Orçado (R$)</label>
              <input type="number" placeholder="0.00" className="card" style={{ padding: '0.75rem' }} />
            </div>
          </div>
          <div className="flex-col gap-1 mb-4">
            <label className="text-small">Endereço Completo</label>
            <textarea placeholder="Rua, Número, Bairro" className="card" rows={2} style={{ padding: '0.75rem', resize: 'none' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
            Salvar Agendamento
          </button>
        </form>
      </BottomSheet>
    </>
  );
}
