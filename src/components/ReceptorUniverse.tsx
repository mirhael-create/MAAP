/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sliders, Sparkles, Server, Check } from "lucide-react";

interface ReceptorInfo {
  name: string;
  type: "GPCR (Gs)" | "GPCR (Gi)" | "GPCR (Gq)" | "Ionotrópico (Catión)" | "Ionotrópico (Anión)";
  signaling: string;
  agonists: string;
  antagonists: string;
  sideEffects: string;
  description: string;
}

export default function ReceptorUniverse() {
  const receptors: ReceptorInfo[] = [
    {
      name: "Receptor D2",
      type: "GPCR (Gi)",
      signaling: "Inhibe la adenilato ciclasa, disminuye el AMPc intracelular, abre los canales de K+ y cierra los canales de Ca2+.",
      agonists: "Bromocriptina, Pramipexol, Levodopa",
      antagonists: "Haloperidol, Risperidona, Olanzapina",
      sideEffects: "SEP (Parkinsonismo, distonía, acatisia), discinesia tardía, hiperprolactinemia.",
      description: "La diana de entrada principal para todos los fármacos antipsicóticos. Se encuentra postsinápticamente en el cuerpo estriado y presinápticamente como autorreceptores terminales/somatodendríticos."
    },
    {
      name: "Receptor 5HT2A",
      type: "GPCR (Gq)",
      signaling: "Activa la Fosfolipasa C (PLC), generando IP3/DAG y movilizando el calcio (Ca2+) intracelular.",
      agonists: "LSD, Psilocibina, Mescalina",
      antagonists: "Clozapina, Olanzapina, Risperidona",
      sideEffects: "El antagonismo previene los SEP y estabiliza el estado de ánimo. El agonismo induce alucinaciones visuales y el bypass del filtro sensorial.",
      description: "Regulador crucial de la liberación de glutamato cortical. Altamente expresado en las dendritas apicales prefrontales."
    },
    {
      name: "Receptor NMDA",
      type: "Ionotrópico (Catión)",
      signaling: "Entrada de calcio (Ca2+) y sodio (Na+). Desencadena la LTP, la plasticidad sináptica y la arborización dendrítica.",
      agonists: "Glutamato + Glicina/D-Serina (coagonistas)",
      antagonists: "Ketamina, Fenciclidina (PCP), Memantina",
      sideEffects: "El antagonismo induce anestesia disociativa, déficits cognitivos y síntomas positivos (psicosis).",
      description: "Regulado por ligando y sensible al voltaje. El magnesio (Mg2+) bloquea el canal en reposo, requiriendo la despolarización de la membrana para ser expulsado."
    },
    {
      name: "Receptor GABAA",
      type: "Ionotrópico (Anión)",
      signaling: "Entrada de cloruro (Cl-), hiperpolarizando la membrana postsináptica y deprimiendo la excitabilidad neuronal.",
      agonists: "GABA, Benzodiacepinas, Zolpidem, Barbitúricos",
      antagonists: "Flumazenilo (antagonista neutro), Bicuculina",
      sideEffects: "El agonismo causa sedación, relajación muscular, ansiólisis, atenuación cognitiva y riesgo de dependencia.",
      description: "El principal canal inhibidor del sistema nervioso central. Presenta distintos sitios de modulación alostérica."
    },
    {
      name: "Receptor Alfa-1",
      type: "GPCR (Gq)",
      signaling: "Activa la PLC, movilizando el calcio intracelular, provocando la contracción del músculo liso vascular.",
      agonists: "Fenilefrina, Midodrina",
      antagonists: "Prazosina, Risperidona, Olanzapina, Clozapina",
      sideEffects: "El antagonismo causa hipotensión ortostática grave, taquicardia refleja y congestión nasal.",
      description: "A menudo bloqueado de forma no deseada (fuera de diana) por los antipsicóticos atípicos, lo que provoca efectos secundarios cardiovasculares."
    },
    {
      name: "Receptor H1",
      type: "GPCR (Gq)",
      signaling: "Activa la PLC, desencadenando la liberación de calcio intracelular y la cascada inflamatoria.",
      agonists: "Histamina, Betahistina",
      antagonists: "Difenhidramina, Olanzapina, Clozapina",
      sideEffects: "El antagonismo desencadena sedación intensa, somnolencia, aumento del apetito y aumento de peso sustancial.",
      description: "Diana secundaria de muchos antipsicóticos y antidepresivos tricíclicos, causante de efectos secundarios metabólicos."
    },
    {
      name: "Receptor M1",
      type: "GPCR (Gq)",
      signaling: "Activa la PLC, movilizando calcio y excitando las neuronas de proyección cortical.",
      agonists: "Acetilcolina, Pilocarpina",
      antagonists: "Atropina, Benzatropina, Clozapina",
      sideEffects: "El antagonismo desencadena síntomas anticolinérgicos: sequedad de boca, visión borrosa, estreñimiento, confusión cognitiva.",
      description: "El bloqueo anticolinérgico de M1 puede ayudar a equilibrar la relación ACh/DA estriatal para reducir el parkinsonismo inducido por fármacos (SEP)."
    }
  ];

  const [activeGroup, setActiveGroup] = useState<string>("all");
  const [selectedReceptor, setSelectedReceptor] = useState<ReceptorInfo>(receptors[0]);

  const filteredReceptors = receptors.filter((r) => {
    if (activeGroup === "all") return true;
    if (activeGroup === "gpcr") return r.type.startsWith("GPCR");
    if (activeGroup === "ionotropic") return r.type.startsWith("Ionotrópico") || r.type.startsWith("Ionotropic");
    return true;
  });

  return (
    <div id="receptor-universe-section" className="p-8 bg-[#0F172A] text-slate-100 flex-1 space-y-8 overflow-y-auto">
      {/* Category Toggles */}
      <div className="flex gap-4">
        {["all", "gpcr", "ionotropic"].map((group) => (
          <button
            key={group}
            onClick={() => setActiveGroup(group)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize tracking-wider border cursor-pointer transition-all duration-300 ${
              activeGroup === group
                ? "bg-slate-900 border-sky-500/50 text-sky-400"
                : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            {group === "all" ? "Todos los Receptores" : group.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Receptor List Menu */}
        <div className="lg:col-span-1 space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {filteredReceptors.map((r) => {
            const isSelected = selectedReceptor.name === r.name;
            return (
              <button
                key={r.name}
                onClick={() => setSelectedReceptor(r)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-sky-500/10 to-violet-500/5 border-sky-500/40 text-sky-400 shadow-md"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-sm text-slate-200">{r.name}</span>
                  <span className="text-[10px] font-mono opacity-80 uppercase bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                    {r.type.split(" ")[1] || "Canal"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1 mt-1 font-sans">
                  {r.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Receptor Detailed Inspector */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-white">{selectedReceptor.name}</h4>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mt-1 text-sky-400">
                {selectedReceptor.type}
              </p>
            </div>
            <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full uppercase tracking-wider font-mono font-bold">
              Especificación Funcional
            </span>
          </div>

          <div className="space-y-4">
            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedReceptor.description}
            </p>

            {/* Signaling Mechanics */}
            <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/80 space-y-1">
              <span className="text-slate-400 text-xs font-semibold flex items-center gap-1.5 uppercase font-mono">
                <Server className="w-3.5 h-3.5 text-sky-400" />
                Vía de Señalización Intracelular
              </span>
              <p className="text-xs text-sky-300 leading-relaxed font-mono">
                {selectedReceptor.signaling}
              </p>
            </div>

            {/* Pharmacology Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950/30 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-1">Agonistas Clave</p>
                <p className="text-xs text-slate-200">{selectedReceptor.agonists}</p>
              </div>
              <div className="p-4 bg-slate-950/30 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-1">Antagonistas Clave</p>
                <p className="text-xs text-slate-200">{selectedReceptor.antagonists}</p>
              </div>
            </div>

            {/* Clinical Side Effects Warning */}
            <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 animate-ping"></div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold mb-1">Efectos Secundarios Clínicos</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedReceptor.sideEffects}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
