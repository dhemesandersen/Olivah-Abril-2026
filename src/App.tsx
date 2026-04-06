import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutTemplate, 
  Megaphone, 
  Mail, 
  LineChart, 
  CheckCircle2, 
  Circle, 
  ArrowRightCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

type Status = 'To Do' | 'Doing' | 'Done';
type Level = 'Baixo' | 'Médio' | 'Alto';

interface Task {
  id: string;
  title: string;
  status: Status;
  impact: Level;
  effort: Level;
  actionPlan: string[];
}

interface Area {
  id: string;
  title: string;
  icon: React.ElementType;
  tasks: Task[];
}

const initialData: Area[] = [
  {
    id: 'website',
    title: '1. Website & Produto',
    icon: LayoutTemplate,
    tasks: [
      { 
        id: 'w1', title: 'Implementação de formulário de personalização nos produtos', status: 'Doing', impact: 'Alto', effort: 'Alto',
        actionPlan: [
          'Definir campos necessários (medidas, tipo de pedra, acabamento) para captação de lead.',
          'Criar formulário no Shopify focado na recolha de email e detalhes do pedido.',
          'Integrar com E-goi: adicionar o contacto automaticamente ao grupo correto.',
          'Configurar automação: enviar email de agradecimento ao cliente e notificação com os dados para info@olivah.pt / gisella@.'
        ]
      },
      { 
        id: 'w2', title: 'Criação de template de produto sem preço no Shopify', status: 'To Do', impact: 'Médio', effort: 'Médio',
        actionPlan: [
          'Criar um novo template de produto no tema do Shopify.',
          'Ocultar botão "Adicionar ao Carrinho" e o preço base neste template.',
          'Inserir formulário de contacto/pedido de orçamento no lugar da compra.',
          'Atribuir o novo template aos produtos exclusivos e feitos à medida.'
        ]
      },
      { 
        id: 'w3', title: 'Inserção e organização do catálogo (~50 itens)', status: 'Doing', impact: 'Alto', effort: 'Alto',
        actionPlan: [
          'Estruturar e criar as categorias no Shopify de acordo com os itens do catálogo.',
          'Otimizar as imagens do catálogo já definidas para formato web (compressão e redimensionamento).',
          'Inserir os cerca de 50 produtos com descrições detalhadas e variantes.',
          'Rever SEO on-page (títulos, meta descriptions, alt text das imagens).'
        ]
      },
      { 
        id: 'w4', title: 'Melhorias contínuas de UX/UI', status: 'To Do', impact: 'Médio', effort: 'Baixo',
        actionPlan: [
          'Analisar heatmaps (ex: Hotjar) e métricas de navegação no Google Analytics.',
          'Otimizar velocidade de carregamento (Core Web Vitals).',
          'Melhorar navegação mobile (menu acessível, botões touch-friendly).',
          'Simplificar processo de checkout para reduzir abandono de carrinho.'
        ]
      },
    ]
  },
  {
    id: 'acquisition',
    title: '2. Aquisição (Meta Ads)',
    icon: Megaphone,
    tasks: [
      { 
        id: 'a1', title: 'Campanha inicial com orçamento de 10€/dia', status: 'To Do', impact: 'Alto', effort: 'Baixo',
        actionPlan: [
          'Configurar Business Manager e conta de anúncios.',
          'Definir objetivo da campanha (Tráfego ou Conversão).',
          'Distribuir orçamento (ex: 7€ prospecting, 3€ retargeting).',
          'Agendar data de início e fim da fase de teste inicial.'
        ]
      },
      { 
        id: 'a2', title: 'Estrutura com público aberto e interesses', status: 'To Do', impact: 'Médio', effort: 'Médio',
        actionPlan: [
          'Criar conjunto de anúncios "Broad" (idade, localização, sem interesses).',
          'Criar conjunto de anúncios "Interesses" (decoração, arquitetura, luxo).',
          'Criar público Lookalike (se houver base de dados de clientes).',
          'Configurar exclusões (compradores recentes, visitantes de suporte).'
        ]
      },
      { 
        id: 'a3', title: 'Teste de criativos (lifestyle, produto, processo)', status: 'To Do', impact: 'Alto', effort: 'Médio',
        actionPlan: [
          'Selecionar 3-5 imagens/vídeos de alta qualidade.',
          'Criar variações de copy (foco em exclusividade vs. design de interiores).',
          'Configurar testes A/B dinâmicos no Meta.',
          'Analisar criativos vencedores após 7 dias de veiculação.'
        ]
      },
      { 
        id: 'a4', title: 'Métricas: CTR, CPC, engagement', status: 'To Do', impact: 'Alto', effort: 'Baixo',
        actionPlan: [
          'Criar dashboard personalizado no Meta Ads Manager.',
          'Definir KPIs alvo (ex: CTR > 1.5%, CPC < 0.50€).',
          'Documentar resultados para histórico.',
          'Ajustar lances e orçamentos com base no ROAS/CPA.'
        ]
      },
    ]
  },
  {
    id: 'email',
    title: '3. Email Marketing',
    icon: Mail,
    tasks: [
      { 
        id: 'e1', title: 'Ativação da base de contactos atual', status: 'To Do', impact: 'Alto', effort: 'Médio',
        actionPlan: [
          'Importar e organizar a base de contactos atual no E-goi.',
          'Criar campanha de boas-vindas / apresentação oficial da loja online.',
          'Garantir conformidade com RGPD na importação dos contactos.',
          'Analisar taxa de abertura e cliques desta primeira comunicação.'
        ]
      },
      { 
        id: 'e2', title: 'Sequência de 3 emails (lançamento, produto, custom)', status: 'To Do', impact: 'Alto', effort: 'Alto',
        actionPlan: [
          'Email 1: Storytelling da marca Olivah e o valor da pedra natural.',
          'Email 2: Showcase dos best-sellers e detalhes de design.',
          'Email 3: Foco na personalização e projetos à medida.',
          'Configurar envio de 1 email por semana durante Abril e analisar resposta dos leads.'
        ]
      },
      { 
        id: 'e3', title: 'Automação para novos leads', status: 'To Do', impact: 'Alto', effort: 'Médio',
        actionPlan: [
          'Criar pop-up de captação no site (ex: 10% off na 1ª compra ou guia de decoração).',
          'Integrar formulário com o E-goi.',
          'Configurar trigger de boas-vindas imediato após subscrição.',
          'Monitorizar taxa de conversão do pop-up e ajustar copy/design.'
        ]
      },
    ]
  },
  {
    id: 'data',
    title: '4. Dados & Tracking',
    icon: LineChart,
    tasks: [
      { 
        id: 'd1', title: 'Meta Pixel e eventos (Lead, ViewContent)', status: 'To Do', impact: 'Alto', effort: 'Médio',
        actionPlan: [
          'Instalar código base do Pixel via Google Tag Manager.',
          'Configurar evento ViewContent nas páginas de produto Shopify.',
          'Criar e integrar evento Lead nos formulários de orçamento/contacto.',
          'Verificar disparos com a extensão Meta Pixel Helper.'
        ]
      },
      { 
        id: 'd2', title: 'GA4', status: 'Done', impact: 'Alto', effort: 'Médio',
        actionPlan: [
          'Criar propriedade GA4 e instalar via GTM.',
          'Configurar eventos de conversão (compras, leads).',
          'Ligar GA4 ao Google Search Console.',
          'Criar relatórios personalizados de aquisição e comportamento.'
        ]
      },
      { 
        id: 'd3', title: 'Monitorização e Relatórios Mensais', status: 'Doing', impact: 'Alto', effort: 'Baixo',
        actionPlan: [
          'Definir dia do mês para extração de dados e análise.',
          'Criar relatório GA4 focado no tráfego do site e conversões do ecommerce.',
          'Criar relatório Meta Ads com os resultados das campanhas (ROAS, CPA, CTR).',
          'Identificar gargalos e propor planos de ação para o mês seguinte.'
        ]
      },
    ]
  }
];

const StatusBadge = ({ status }: { status: Status }) => {
  const config = {
    'To Do': { icon: Circle, className: 'bg-stone-100 text-stone-600 border-stone-200' },
    'Doing': { icon: ArrowRightCircle, className: 'bg-amber-50 text-amber-700 border-amber-200' },
    'Done': { icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  };
  
  const { icon: Icon, className } = config[status];
  
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </div>
  );
};

const LevelBadge = ({ level, type }: { level: Level, type: 'Impacto' | 'Esforço' }) => {
  const config = {
    'Baixo': 'bg-stone-100 text-stone-600',
    'Médio': 'bg-blue-50 text-blue-700',
    'Alto': type === 'Impacto' ? 'bg-rose-50 text-rose-700' : 'bg-orange-50 text-orange-700'
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">{type}</span>
      <span className={`px-2 py-0.5 rounded text-xs font-medium w-fit ${config[level]}`}>
        {level}
      </span>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState<Area[]>(initialData);
  const [expandedAreas, setExpandedAreas] = useState<Record<string, boolean>>(
    initialData.reduce((acc, area) => ({ ...acc, [area.id]: true }), {})
  );
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});

  const toggleArea = (id: string) => {
    setExpandedAreas(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTask = (id: string) => {
    setExpandedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTaskStatus = (areaId: string, taskId: string) => {
    setData(prevData => prevData.map(area => {
      if (area.id !== areaId) return area;
      return {
        ...area,
        tasks: area.tasks.map(task => {
          if (task.id !== taskId) return task;
          const nextStatus: Record<Status, Status> = {
            'To Do': 'Doing',
            'Doing': 'Done',
            'Done': 'To Do'
          };
          return { ...task, status: nextStatus[task.status] };
        })
      };
    }));
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-200">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 bg-stone-100 text-stone-600 text-xs font-semibold tracking-widest uppercase rounded-sm">
                  Abril 2026
                </span>
                <span className="px-2.5 py-1 bg-stone-900 text-stone-50 text-xs font-semibold tracking-widest uppercase rounded-sm">
                  Dashboard Estratégico
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight">
                Olivah
              </h1>
              <p className="text-stone-500 mt-2 font-light text-lg">
                Ecommerce premium de decoração em pedra natural
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <a 
                href="https://www.olivah.pt" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors group"
              >
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
                www.olivah.pt
              </a>
              <a 
                href="https://store.olivah.pt" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors group"
              >
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
                store.olivah.pt
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid gap-8">
          {data.map((area, index) => (
            <motion.div 
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden"
            >
              <div 
                className="px-6 py-5 border-b border-stone-100 flex items-center justify-between cursor-pointer hover:bg-stone-50 transition-colors"
                onClick={() => toggleArea(area.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-stone-100 rounded-lg text-stone-700">
                    <area.icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-medium text-stone-800">{area.title}</h2>
                </div>
                <button className="text-stone-400 hover:text-stone-600 transition-colors">
                  {expandedAreas[area.id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
              
              <AnimatePresence>
                {expandedAreas[area.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="divide-y divide-stone-100">
                      {area.tasks.map((task) => (
                        <div key={task.id} className="group">
                          <div 
                            className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors cursor-pointer"
                            onClick={() => toggleTask(task.id)}
                          >
                            <div className="flex items-start gap-4 flex-1">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTaskStatus(area.id, task.id);
                                }}
                                className="mt-1 flex-shrink-0 focus:outline-none"
                                title="Clique para alterar o estado"
                              >
                                <StatusBadge status={task.status} />
                              </button>
                              <span className={`text-stone-700 font-medium leading-relaxed ${task.status === 'Done' ? 'line-through text-stone-400' : ''}`}>
                                {task.title}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-6 sm:ml-auto pl-12 sm:pl-0">
                              <LevelBadge level={task.impact} type="Impacto" />
                              <LevelBadge level={task.effort} type="Esforço" />
                              <div className="text-stone-300 group-hover:text-stone-500 transition-colors ml-2">
                                {expandedTasks[task.id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                              </div>
                            </div>
                          </div>
                          
                          <AnimatePresence>
                            {expandedTasks[task.id] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-5 pt-1 pl-[4.5rem]">
                                  <div className="bg-stone-50 rounded-lg p-5 border border-stone-100">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-4">Plano de Ação Detalhado</h4>
                                    <ul className="space-y-3">
                                      {task.actionPlan.map((step, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-stone-600">
                                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white border border-stone-200 flex items-center justify-center text-[10px] font-medium text-stone-500 mt-0.5 shadow-sm">
                                            {idx + 1}
                                          </span>
                                          <span className="leading-relaxed pt-0.5">{step}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
