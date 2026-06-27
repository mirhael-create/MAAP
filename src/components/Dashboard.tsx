/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Brain, Award, PlayCircle, Layers, Activity, Sliders, ChevronRight } from "lucide-react";

interface DashboardProps {
  onSelectView: (view: string) => void;
  completedCardsCount: number;
}

export default function Dashboard({ onSelectView, completedCardsCount }: DashboardProps) {
  const stats = [
    { label: "Progreso de Estudio", val: "1/5 Capítulos", desc: "Capítulo 4 Completado", icon: Award, color: "text-emerald-400" },
    { label: "Tarjetas Dominadas", val: `${completedCardsCount} Tarjetas`, desc: "Capítulo 4 estudiado", icon: Layers, color: "text-sky-400" },
    { label: "Preguntas de Examen", val: "2 Casos Clínicos", desc: "Nivel Experto Calificado", icon: Brain, color: "text-rose-400" }
  ];

  const quickNavs = [
    { id: "brain-atlas", label: "Atlas Cerebral", desc: "Proyecciones anatómicas interactivas", icon: Brain, color: "from-sky-500/10 to-sky-600/5 hover:border-sky-500/40 text-sky-400" },
    { id: "neuro-atlas", label: "Atlas de Neurotransmisores", desc: "Síntesis y vías sinápticas", icon: Activity, color: "from-violet-500/10 to-violet-600/5 hover:border-violet-500/40 text-violet-400" },
    { id: "receptors", label: "Universo de Receptores", desc: "Árboles de señalización GPCR e ionotrópicos", icon: Sliders, color: "from-amber-500/10 to-amber-600/5 hover:border-amber-500/40 text-amber-400" },
    { id: "drug-matrix", label: "Matriz de Comparación de Fármacos", desc: "Perfiles de afinidad de receptores y mapas de calor", icon: Layers, color: "from-emerald-500/10 to-emerald-600/5 hover:border-emerald-500/40 text-emerald-400" }
  ];

  const chapters = [
    { num: 1, title: "Neurotransmisión química", status: "Prerrequisito Completado", isAvailable: false },
    { num: 2, title: "Transportadores, receptores y enzimas", status: "Prerrequisito Completado", isAvailable: false },
    { num: 3, title: "Los canales iónicos como dianas de la psicofarmacología", status: "Prerrequisito Completado", isAvailable: false },
    { num: 4, title: "Psicosis, esquizofrenia y redes de neurotransmisores", status: "Módulo Activo", isAvailable: true },
    { num: 5, title: "Agentes antipsicóticos: Bloqueo del receptor D2", status: "Próximamente", isAvailable: false }
  ];

  return (
    <div id="dashboard-container" className="p-8 bg-[#0F172A] text-slate-100 flex-1 space-y-8 overflow-y-auto">
      {/* Bienvenido */}ca
      <div className="p-8 bg-gradient-to-r from-sky-500/15 via-violet-600/10 to-transparent border border-sky-500/20 rounded-3xl relative overflow-hidden">
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-15">
          <Brain className="w-64 h-64 rotate-12 text-sky-400" />
        </div>
        <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-widest">
          Portal del Residente de Psiquiatría
        </span>
        <h1 className="text-2xl font-black text-white mt-4 tracking-tight">
          Academia de Psicofarmacología Visual
        </h1>
        <p className="text-slate-400 text-xs mt-2 max-w-xl leading-relaxed">
          Bienvenido al espacio de trabajo definitivo de libros de texto interactivos. Sintetice explicaciones complejas de neurociencia, explore universos tridimensionales de receptores y prepárese para certificaciones profesionales.
        </p>
        <button 
          onClick={() => onSelectView("chapter-4")}
          className="mt-6 px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-sky-500/10 transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          <PlayCircle className="w-4 h-4" />
          Estudiar Capítulo 4 Activo
        </button>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</p>
                <p className="text-xl font-bold text-white tracking-tight">{stat.val}</p>
                <p className="text-xs text-slate-400">{stat.desc}</p>
              </div>
              <div className={`p-3 bg-slate-950/60 border border-slate-850 rounded-xl ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Section Grid: Quick Navigation & Chapter Library */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Nav Bento */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">Portales de Acceso Rápido</h3>
          <div className="grid grid-cols-1 gap-3">
            {quickNavs.map((nav) => {
              const Icon = nav.icon;
              return (
                <button
                  key={nav.id}
                  onClick={() => onSelectView(nav.id)}
                  className={`p-4 rounded-2xl border border-slate-800/80 bg-gradient-to-r text-left transition-all duration-300 cursor-pointer ${nav.color}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-950/60 rounded-lg">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">{nav.label}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{nav.desc}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chapter Library list */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">Progresión del Plan de Estudios</h3>
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl divide-y divide-slate-800 overflow-hidden">
            {chapters.map((ch) => (
              <div 
                key={ch.num} 
                className={`p-4 flex items-center justify-between transition-colors ${
                  ch.isAvailable ? "bg-sky-500/5" : "hover:bg-slate-900/20"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                    ch.isAvailable 
                      ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" 
                      : "bg-slate-800 text-slate-500 border border-slate-750"
                  }`}>
                    {ch.num}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold tracking-wide ${ch.isAvailable ? "text-sky-400" : "text-slate-300"}`}>
                      {ch.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{ch.status}</p>
                  </div>
                </div>
                {ch.isAvailable ? (
                  <button 
                    onClick={() => onSelectView("chapter-4")}
                    className="p-2 bg-sky-500/10 border border-sky-500/20 rounded-lg text-sky-400 hover:bg-sky-500 hover:text-slate-950 transition-all duration-300 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-600 font-mono italic">Prerrequisito Bloqueado</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
