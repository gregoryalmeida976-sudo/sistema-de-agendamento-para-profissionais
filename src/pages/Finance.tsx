import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';

const data = [
  { name: 'Seg', faturamento: 450, despesa: 100 },
  { name: 'Ter', faturamento: 800, despesa: 150 },
  { name: 'Qua', faturamento: 300, despesa: 50 },
  { name: 'Qui', faturamento: 1200, despesa: 300 },
  { name: 'Sex', faturamento: 900, despesa: 120 },
  { name: 'Sáb', faturamento: 600, despesa: 80 },
  { name: 'Dom', faturamento: 250, despesa: 0 },
];

export default function Finance() {
  const relatorioRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = () => {
    if (relatorioRef.current) {
      const opt: any = {
        margin: 1,
        filename: 'relatorio_financeiro.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(relatorioRef.current).save();
    }
  };

  const pageVariants: any = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show" className="flex-col gap-4 mt-2">
      <header className="flex justify-between items-center mb-2">
        <h1 className="text-title">Finanças</h1>
        <button className="btn btn-secondary flex items-center gap-2" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={handleExportPDF}>
          <Download size={16} /> Relatório
        </button>
      </header>
      
      {/* Container for PDF generation */}
      <div ref={relatorioRef}>
        <motion.div variants={pageVariants} className="card" style={{ marginBottom: '1rem' }}>
          <p className="text-body mb-2" style={{ fontWeight: 600 }}>Desempenho da Semana</p>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFaturamento" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--success-color)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--success-color)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--danger-color)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--danger-color)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.4} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="faturamento" stroke="var(--success-color)" fillOpacity={1} fill="url(#colorFaturamento)" />
                <Area type="monotone" dataKey="despesa" stroke="var(--danger-color)" fillOpacity={1} fill="url(#colorDespesa)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={pageVariants} className="card">
          <p className="text-body">Visão Geral do Mês</p>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-small">Faturamento Bruto</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--success-color)' }}>R$ 4.500,00</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="text-small">Despesas (Pedágio, Mat.)</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--danger-color)' }}>R$ 800,00</p>
            </div>
          </div>
          <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border-color)', opacity: 0.5 }} />
          <div className="flex justify-between items-center">
            <p className="text-subtitle">Lucro Líquido</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--brand-primary)' }}>R$ 3.700,00</p>
          </div>
        </motion.div>
      </div>
      
    </motion.div>
  );
}
