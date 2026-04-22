import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, MessageCircle, Map as MapIcon, ImagePlus, Receipt, CheckCircle2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomSheet from '../components/BottomSheet';

export default function ServiceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState('pendente'); // pendente, caminho, concluido
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data for this service
  const service = {
    title: 'Manutenção Preventiva Ar 12k Btus',
    client: 'Roberto Silva',
    phone: '5511999999999',
    address: 'Av. Paulista, 1000 - Apto 42, São Paulo, SP',
    date: 'Hoje, 14:30',
    price: 'R$ 250,00'
  };

  const gmapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address)}`;
  const waConfirmLink = `https://wa.me/${service.phone}?text=${encodeURIComponent(`Olá ${service.client}, confirmo nosso agendamento para ${service.date}. (ID: ${id})`)}`;
  const waWayLink = `https://wa.me/${service.phone}?text=${encodeURIComponent(`Olá ${service.client}, estou a caminho para realizar seu serviço!`)}`;

  const pageVariants: any = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
  };

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Despesa lançada com sucesso! (Mock)');
    setIsExpenseOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      alert(`Foto "${e.target.files[0].name}" selecionada com sucesso! (Mock)`);
    }
  };

  return (
    <>
      <motion.div variants={pageVariants} initial="hidden" animate="show">
        <header className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            style={{ background: 'var(--bg-surface-elevated)', border: 'none', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', display: 'flex' }}
          >
            <ChevronLeft size={24} color="var(--text-primary)" />
          </button>
          <h1 className="text-title" style={{ fontSize: '1.25rem' }}>Detalhes do Serviço</h1>
        </header>

        <div className="card mb-4" style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-subtitle" style={{ fontSize: '1.1rem', color: 'var(--brand-primary)' }}>{service.title}</h2>
            <span className="text-small" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{service.price}</span>
          </div>
          
          <div className="flex-col gap-2 mb-4">
            <p className="text-body"><span style={{ fontWeight: 600 }}>Cliente:</span> {service.client}</p>
            <p className="text-body"><span style={{ fontWeight: 600 }}>Horário:</span> {service.date}</p>
            <p className="text-body"><span style={{ fontWeight: 600 }}>Endereço:</span><br/> {service.address}</p>
          </div>

          {/* 1-Click Action Buttons */}
          <div className="flex gap-2" style={{ overflowX: 'auto', paddingBottom: '0.5rem', margin: '0 -0.5rem', padding: '0 0.5rem' }}>
            <a href={waConfirmLink} target="_blank" rel="noreferrer" className="btn btn-secondary flex items-center gap-2" style={{ whiteSpace: 'nowrap', flexShrink: 0, fontSize: '0.875rem' }}>
              <MessageCircle size={16} /> Confirmar
            </a>
            <a href={waWayLink} target="_blank" rel="noreferrer" className="btn btn-secondary flex items-center gap-2" style={{ whiteSpace: 'nowrap', flexShrink: 0, fontSize: '0.875rem' }}>
              <MessageCircle size={16} /> Estou a caminho
            </a>
            <a href={gmapsLink} target="_blank" rel="noreferrer" className="btn btn-primary flex items-center gap-2" style={{ whiteSpace: 'nowrap', flexShrink: 0, fontSize: '0.875rem' }}>
              <MapIcon size={16} /> Navegar
            </a>
          </div>
        </div>

        <h3 className="text-subtitle mb-2">Execução do Serviço</h3>
        
        <div className="card mb-4">
          {/* Status indicator mockup */}
          <div className="flex items-center gap-2 mb-4">
            <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: status === 'pendente' ? 'var(--accent-color)' : 'var(--success-color)' }} />
            <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: status === 'concluido' ? 'var(--success-color)' : 'var(--border-color)' }} />
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <span style={{ fontWeight: 600 }}>
              {status === 'pendente' ? 'Aguardando Início' : status === 'caminho' ? 'A Caminho' : 'Serviço Concluído!'}
            </span>
            {status !== 'concluido' && (
              <button 
                className={`btn ${status === 'pendente' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setStatus(status === 'pendente' ? 'caminho' : 'concluido')}
                style={{ padding: '0.5rem 1rem' }}
              >
                {status === 'pendente' ? 'Iniciar Deslocamento' : 'Marcar como Concluído'}
              </button>
            )}
          </div>

          <hr style={{ borderTop: '1px solid var(--border-color)', margin: '1rem 0', opacity: 0.5 }} />

          <div className="flex gap-2">
            {/* Hidden Input for Camera/Gallery */}
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />

            <button 
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-secondary flex items-center justify-center gap-2" 
              style={{ flex: 1, flexDirection: 'column', padding: '1rem' }}
            >
              <ImagePlus size={24} color="var(--brand-primary)" />
              <span style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Adicionar Foto</span>
            </button>
            
            <button 
              onClick={() => setIsExpenseOpen(true)}
              className="btn btn-secondary flex items-center justify-center gap-2" 
              style={{ flex: 1, flexDirection: 'column', padding: '1rem' }}
            >
              <Receipt size={24} color="var(--danger-color)" />
              <span style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Lançar Despesa</span>
            </button>
          </div>
        </div>
        
        {status === 'concluido' && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-col items-center justify-center mt-6 p-4">
            <CheckCircle2 size={48} color="var(--success-color)" />
            <p className="mt-2" style={{ fontWeight: 600 }}>Excelente trabalho!</p>
          </motion.div>
        )}

      </motion.div>

      <BottomSheet
        isOpen={isExpenseOpen}
        onClose={() => setIsExpenseOpen(false)}
        title="Lançar Despesa"
      >
        <form onSubmit={handleExpenseSubmit} className="flex-col gap-4">
          <div className="flex-col gap-1">
            <label className="text-small">Tipo de Despesa</label>
            <input type="text" required placeholder="Ex: Pedágio, Material Extra" className="card" style={{ padding: '0.75rem' }} />
          </div>
          <div className="flex-col gap-1 mb-4">
            <label className="text-small">Valor da Despesa (R$)</label>
            <input type="number" required placeholder="0.00" className="card" style={{ padding: '0.75rem' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--danger-color)' }}>
            Salvar Despesa
          </button>
        </form>
      </BottomSheet>
    </>
  );
}
