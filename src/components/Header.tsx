/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock, Search, Trophy, CheckCircle2 } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  completedFlashcardsCount: number;
  quizScore: number;
}

export default function Header({ currentTab, completedFlashcardsCount, quizScore }: HeaderProps) {
  // Format current page title
  const getPageTitle = () => {
    switch (currentTab) {
      case "dashboard":
        return "Estación de Trabajo Académica";
      case "chapters":
        return "Biblioteca de Capítulos Esenciales";
      case "brain-atlas":
        return "Atlas Cerebral Interactivo";
      case "neuro-atlas":
        return "Explorador de Vías Sinápticas";
      case "receptors":
        return "Universo de Señalización de Receptores";
      case "drug-matrix":
        return "Matriz de Afinidad de Receptores";
      case "consultant":
        return "Asistente Clínico de IA Stahl";
      default:
        if (currentTab.startsWith("chapter-")) {
          return "Visor Interactivo de Libros de Texto";
        }
        return "Stahl Academy";
    }
  };

  return (
    <header 
      id="header-bar" 
      className="h-16 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10 text-slate-100 shrink-0"
    >
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-slate-500 font-medium">Stahl Academy</span>
        <span className="text-slate-700">/</span>
        <span className="font-semibold text-slate-300">{getPageTitle()}</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Global Performance Widget */}
        <div className="hidden md:flex items-center gap-4 bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-1.5 text-xs">
          <div className="flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5 text-yellow-500" />
            <span className="text-slate-400 font-medium">Racha Diaria:</span>
            <span className="font-mono text-yellow-500 font-bold">5 Días</span>
          </div>
          <div className="h-4 w-px bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-slate-400 font-medium">Tarjetas Dominadas:</span>
            <span className="font-mono text-emerald-400 font-bold">{completedFlashcardsCount}</span>
          </div>
        </div>

        {/* Global Digital Clock */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-slate-800/80 rounded-xl text-slate-400 font-mono text-xs">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span>27 de junio de 2026</span>
        </div>
      </div>
    </header>
  );
}
