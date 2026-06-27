/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sliders, Search, Download, HelpCircle } from "lucide-react";

interface DrugData {
  name: string;
  class: string;
  d2: string;
  fiveht2a: string;
  m1: string;
  h1: string;
  alpha1: string;
  eps: string;
  weightGain: string;
  sedation: string;
  prolactin: string;
}

export default function DrugMatrix() {
  const drugs: DrugData[] = [
    {
      name: "Haloperidol",
      class: "Típico",
      d2: "Alto",
      fiveht2a: "Ninguno",
      m1: "Ninguno",
      h1: "Ninguno",
      alpha1: "Bajo",
      eps: "Muy Alto",
      weightGain: "Mínimo",
      sedation: "Bajo",
      prolactin: "Muy Alto"
    },
    {
      name: "Clorpromazina",
      class: "Típico",
      d2: "Moderado",
      fiveht2a: "Bajo",
      m1: "Moderado",
      h1: "Alto",
      alpha1: "Alto",
      eps: "Moderado",
      weightGain: "Moderado",
      sedation: "Grave",
      prolactin: "Alto"
    },
    {
      name: "Clozapina",
      class: "Atípico",
      d2: "Bajo",
      fiveht2a: "Alto",
      m1: "Alto",
      h1: "Alto",
      alpha1: "Alto",
      eps: "Muy Bajo",
      weightGain: "Grave",
      sedation: "Grave",
      prolactin: "Ninguno"
    },
    {
      name: "Olanzapina",
      class: "Atípico",
      d2: "Moderado",
      fiveht2a: "Alto",
      m1: "Moderado",
      h1: "Alto",
      alpha1: "Moderado",
      eps: "Bajo",
      weightGain: "Grave",
      sedation: "Alto",
      prolactin: "Bajo"
    },
    {
      name: "Risperidona",
      class: "Atípico",
      d2: "Alto",
      fiveht2a: "Alto",
      m1: "Ninguno",
      h1: "Bajo",
      alpha1: "Alto",
      eps: "Moderado",
      weightGain: "Moderado",
      sedation: "Bajo",
      prolactin: "Muy Alto"
    },
    {
      name: "Aripiprazol",
      class: "Agonista parcial",
      d2: "Parcial",
      fiveht2a: "Moderado",
      m1: "Ninguno",
      h1: "Bajo",
      alpha1: "Bajo",
      eps: "Muy Bajo",
      weightGain: "Mínimo",
      sedation: "Mínimo",
      prolactin: "Ninguno"
    },
    {
      name: "Quetiapina",
      class: "Atípico",
      d2: "Bajo",
      fiveht2a: "Moderado",
      m1: "Bajo",
      h1: "Alto",
      alpha1: "Moderado",
      eps: "Muy Bajo",
      weightGain: "Moderado",
      sedation: "Alto",
      prolactin: "Ninguno"
    },
    {
      name: "Ziprasidona",
      class: "Atípico",
      d2: "Moderado",
      fiveht2a: "Alto",
      m1: "Ninguno",
      h1: "Bajo",
      alpha1: "Moderado",
      eps: "Bajo",
      weightGain: "Mínimo",
      sedation: "Bajo",
      prolactin: "Bajo"
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [activeClass, setActiveClass] = useState<string>("all");

  // Get matching bg colors for affinities/side effects to build a gorgeous heatmap
  const getCellBg = (val: string) => {
    switch (val) {
      case "Alto":
      case "Muy Alto":
      case "Grave":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      case "Moderado":
      case "Medio":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "Bajo":
      case "Mínimo":
      case "Muy Bajo":
        return "bg-sky-500/10 text-sky-400 border border-sky-500/20";
      case "Parcial":
        return "bg-teal-500/10 text-teal-400 border border-teal-500/20";
      default:
        return "bg-slate-900/40 text-slate-500 border border-slate-800";
    }
  };

  const filteredDrugs = drugs.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = activeClass === "all" || d.class.toLowerCase() === activeClass.toLowerCase() || 
      (activeClass === "typical" && d.class === "Típico") || 
      (activeClass === "atypical" && d.class === "Atípico") || 
      (activeClass === "partial agonist" && d.class === "Agonista parcial");
    return matchesSearch && matchesClass;
  });

  return (
    <div id="drug-matrix-section" className="p-8 bg-[#0F172A] text-slate-100 flex-1 space-y-6 overflow-y-auto">
      {/* Filtering Options Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2">
          {["all", "typical", "atypical", "partial agonist"].map((cls) => (
            <button
              key={cls}
              onClick={() => setActiveClass(cls)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize tracking-wider border cursor-pointer transition-all duration-300 ${
                activeClass === cls
                  ? "bg-slate-900 border-sky-500/50 text-sky-400"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cls === "all" ? "Todas las Clases" : cls === "typical" ? "Típicos" : cls === "atypical" ? "Atípicos" : "Agonistas Parciales"}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar fármacos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-slate-800 rounded-xl text-xs font-medium placeholder-slate-500 text-white focus:outline-none focus:border-sky-500/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* Main Table Matrix */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                <th className="py-4 px-6 font-semibold">Fármaco</th>
                <th className="py-4 px-6 font-semibold">Clase</th>
                <th className="py-4 px-4 text-center font-semibold">D2</th>
                <th className="py-4 px-4 text-center font-semibold">5HT2A</th>
                <th className="py-4 px-4 text-center font-semibold">M1</th>
                <th className="py-4 px-4 text-center font-semibold">H1</th>
                <th className="py-4 px-4 text-center font-semibold">α1</th>
                <th className="py-4 px-4 text-center font-semibold">SEP</th>
                <th className="py-4 px-4 text-center font-semibold">Aumento de Peso</th>
                <th className="py-4 px-4 text-center font-semibold">Sedación</th>
                <th className="py-4 px-4 text-center font-semibold">Prolactina</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredDrugs.map((d) => (
                <tr key={d.name} className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-4 px-6 font-bold text-white text-sm">{d.name}</td>
                  <td className="py-4 px-6 font-medium text-slate-400 font-sans">
                    <span className="bg-slate-800/50 border border-slate-700/60 px-2 py-0.5 rounded text-[10px] tracking-wide font-semibold text-slate-300">
                      {d.class}
                    </span>
                  </td>
                  
                  {/* Heatmap columns */}
                  <td className="py-4 px-2 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold w-16 text-center ${getCellBg(d.d2)}`}>
                      {d.d2}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold w-16 text-center ${getCellBg(d.fiveht2a)}`}>
                      {d.fiveht2a}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold w-16 text-center ${getCellBg(d.m1)}`}>
                      {d.m1}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold w-16 text-center ${getCellBg(d.h1)}`}>
                      {d.h1}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold w-16 text-center ${getCellBg(d.alpha1)}`}>
                      {d.alpha1}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold w-16 text-center ${getCellBg(d.eps)}`}>
                      {d.eps}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold w-16 text-center ${getCellBg(d.weightGain)}`}>
                      {d.weightGain}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold w-16 text-center ${getCellBg(d.sedation)}`}>
                      {d.sedation}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold w-16 text-center ${getCellBg(d.prolactin)}`}>
                      {d.prolactin}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
