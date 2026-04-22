import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Sou o seu assistente virtual. Como posso ajudar com sua agenda ou finanças hoje?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleShortcut = (shortcutText: string) => {
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), text: shortcutText, sender: 'user' }]);
    
    // Mock response bot
    setTimeout(() => {
      let reply = 'Ainda estou aprendendo a responder a isso.';
      
      if (shortcutText === 'Quanto faturei hoje?') {
         reply = 'Até o momento, seu faturamento de hoje é R$ 450,00.';
      } else if (shortcutText === 'Qual o próximo cliente?') {
         reply = 'Seu próximo cliente é Roberto Silva, às 14:30. O serviço é Instalação de Ar Condicionado.';
      } else if (shortcutText === 'Resumo do Mês') {
         reply = 'No mês atual você faturou R$ 4.500,00 e obteve R$ 3.700,00 de lucro líquido.';
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: 'bot' }]);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleShortcut(input);
    setInput('');
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: 'calc(var(--bottom-bar-height) + 1rem)',
          right: '1rem',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--brand-primary)',
          color: 'white',
          border: 'none',
          boxShadow: 'var(--shadow-float)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 100
        }}
      >
        <Bot size={28} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'black',
                zIndex: 1000
              }}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                bottom: 0, left: 0, right: 0,
                maxWidth: '480px',
                margin: '0 auto', // Center on larger desktop
                height: '80vh',
                backgroundColor: 'var(--bg-surface)',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                zIndex: 1010,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 -10px 40px rgba(0,0,0,0.2)'
              }}
            >
              <div className="flex justify-between items-center p-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <div className="flex items-center gap-2">
                  <div style={{ padding: '0.5rem', background: 'var(--bg-surface-elevated)', borderRadius: '50%' }}>
                    <Bot size={20} color="var(--brand-primary)" />
                  </div>
                  <h3 className="text-subtitle font-bold">Assistente</h3>
                </div>
                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.sender === 'user' ? 'var(--brand-primary)' : 'var(--bg-surface-elevated)',
                    color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                    padding: '0.75rem 1rem',
                    borderRadius: '16px',
                    borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                    maxWidth: '80%',
                    fontSize: '0.9rem',
                    lineHeight: 1.5
                  }}>
                    {msg.text}
                  </div>
                ))}
              </div>

              <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
                {/* Atatalhos rápidos */}
                <div className="flex gap-2 mb-3" style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
                  <button onClick={() => handleShortcut('Quanto faturei hoje?')} className="btn btn-secondary" style={{ whiteSpace: 'nowrap', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>💰 Faturamento hoje?</button>
                  <button onClick={() => handleShortcut('Qual o próximo cliente?')} className="btn btn-secondary" style={{ whiteSpace: 'nowrap', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>📅 Próximo cliente?</button>
                  <button onClick={() => handleShortcut('Resumo do Mês')} className="btn btn-secondary" style={{ whiteSpace: 'nowrap', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>📊 Resumo do Mês</button>
                </div>
                
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pergunte algo..."
                    style={{
                      flex: 1, padding: '0.75rem 1rem', borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface-elevated)',
                      color: 'var(--text-primary)', outline: 'none'
                    }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '0 1rem', borderRadius: 'var(--radius-full)' }}>
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
