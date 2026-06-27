/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  LayoutDashboard, 
  BookOpen, 
  BrainCircuit, 
  Activity, 
  Network, 
  Sliders, 
  Sparkles, 
  GraduationCap 
} from "lucide-react";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ currentTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Panel de Control", icon: LayoutDashboard },
    { id: "chapters", label: "Biblioteca de Capítulos", icon: BookOpen },
    { id: "brain-atlas", label: "Atlas Cerebral", icon: BrainCircuit },
    { id: "neuro-atlas", label: "Atlas de Neurotransmisores", icon: Activity },
    { id: "receptors", label: "Universo de Receptores", icon: Network },
    { id: "drug-matrix", label: "Matriz de Fármacos", icon: Sliders },
    { id: "consultant", label: "Asistente de IA", icon: Sparkles }
  ];

  return (
    <aside 
      id="sidebar-container" 
      className="w-64 bg-[#111827] border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 text-slate-100 shrink-0 z-20"
    >
      <div className="flex flex-col flex-1 py-6 px-4">
        {/* Brand Header */}
        <div className="p-3 mb-6">
          <h1 className="text-sky-400 font-bold tracking-tighter text-xl uppercase">
            Psicofarmacologia
          </h1>
          <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase mt-0.5">
            Psicofarmacología Visual
          </p>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1 flex-1">
          <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-500 tracking-widest">Módulos Principales</div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id || (item.id === "chapters" && currentTab.startsWith("chapter-"));
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer text-left ${
                  isActive
                    ? "bg-sky-500/10 text-sky-400 border-r-2 border-sky-500 font-bold"
                    : "border border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-800/40"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? "scale-110" : ""}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Recent Study segment from professional polish design HTML */}
          <div className="pt-6">
            <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-500 tracking-widest">Estudio Reciente</div>
            <div className="px-3 mt-2">
              <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800/60">
                <p className="text-xs font-semibold text-slate-300 mb-1">Vía Mesolímbica</p>
                <div className="h-1 w-full bg-slate-850 rounded-full mt-2">
                  <div className="h-1 w-3/4 bg-amber-400 rounded-full"></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">75% de Dominio</p>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Footer Info from design HTML */}
      <div className="p-6 bg-slate-900/50 mt-auto border-t border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center font-bold text-xs text-slate-950">MA</div>
          <div>
            <p className="text-xs font-bold text-slate-200">M</p>
            <p className="text-[10px] text-slate-500">Perlas para el Residente de Psiquiatría</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
