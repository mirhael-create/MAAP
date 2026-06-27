/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sparkles, Sliders, Activity, HelpCircle, Layers } from "lucide-react";
import { chapter4Data } from "../data/chapter4";

interface NTInfo {
  id: string;
  name: string;
  chemicalName: string;
  synthesis: { steps: string[]; enzymes: string[] };
  receptors: { family: string; subtypes: string; action: string }[];
  clearance: { mechanism: string; enzymes: string[] };
  clinicalRole: string;
  highYield: string;
  color: string;
}

export default function NeurotransmitterAtlas() {
  const nts: NTInfo[] = [
    {
      id: "dopamine",
      name: "Dopamina (DA)",
      chemicalName: "3,4-dihydroxyphenethylamine",
      synthesis: {
        steps: [
          "Captación de tirosina desde el torrente sanguíneo hacia la terminal presináptica",
          "Conversión de tirosina a L-DOPA mediante la Tirosina Hidroxilasa (TOH)",
          "Conversión de L-DOPA a dopamina mediante la DOPA Descarboxilasa (DDC)",
          "Almacenamiento en vesículas a través de VMAT2"
        ],
        enzymes: ["Tirosina Hidroxilasa (TOH) - Limitante", "DOPA Descarboxilasa (DDC)"]
      },
      receptors: [
        { family: "Tipo D1", subtypes: "D1, D5", action: "GPCR (acoplado a Gs), aumenta AMPc. Excitador." },
        { family: "Tipo D2", subtypes: "D2, D3, D4", action: "GPCR (acoplado a Gi), disminuye AMPc. Inhibidor." }
      ],
      clearance: {
        mechanism: "Recaptación de alta afinidad mediante DAT (cuerpo estriado). En la CPF, la eliminación es impulsada por la COMT y la captación de NET.",
        enzymes: ["COMT (Catecol-O-metiltransferasa)", "MAO-A y MAO-B (Monoamino Oxidasa)"]
      },
      clinicalRole: "Regula la coordinación motora (bucles CSTC), la motivación, el refuerzo de recompensa, el filtro sensorial y la inhibición de la liberación de prolactina.",
      highYield: "La hiperactividad de D2 mesolímbica impulsa delirios/alucinaciones, mientras que la hipofunción de D1 mesocortical impulsa síntomas negativos y cognitivos.",
      color: "sky"
    },
    {
      id: "serotonin",
      name: "Serotonina (5-HT)",
      chemicalName: "5-hydroxytryptamine",
      synthesis: {
        steps: [
          "Captación de triptófano en la terminal presináptica",
          "Conversión de triptófano a 5-HTP mediante la Triptófano Hidroxilasa (TRY-OH)",
          "Conversión de 5-HTP a serotonina (5-HT) mediante la Descarboxilasa de L-Aminoácidos Aromáticos (AAADC)",
          "Almacenamiento vesicular a través de VMAT2"
        ],
        enzymes: ["Triptófano Hidroxilasa (TRY-OH) - Limitante", "AAADC"]
      },
      receptors: [
        { family: "5-HT1", subtypes: "5-HT1A, 1B, 1D, 1E, 1F", action: "GPCR (acoplado a Gi), disminuye AMPc. Inhibidor." },
        { family: "5-HT2", subtypes: "5-HT2A, 2B, 2C", action: "GPCR (acoplado a Gq), aumenta IP3/DAG/Ca2+. Excitador." },
        { family: "5-HT3", subtypes: "5-HT3", action: "Canal iónico regulado por ligando (selectivo de cationes). Excitador." },
        { family: "5-HT4/5/6/7", subtypes: "5-HT4, 5A, 6, 7", action: "GPCR (acoplado a Gs o Gi) que modula el AMPc." }
      ],
      clearance: {
        mechanism: "Recaptación desde la sinapsis a través de SERT (blanco de los ISRS). Degradada intracelularmente por MAO.",
        enzymes: ["MAO-B (principal enzima degradativa en altas concentraciones)"]
      },
      clinicalRole: "Modula el estado de ánimo, el ciclo de sueño, la percepción sensorial y el flujo excitador directo en las vías de proyección de glutamato prefrontales.",
      highYield: "Las alucinaciones visuales se desencadenan por la hiperestimulación directa de 5HT2A en las neuronas piramidales corticales prefrontales.",
      color: "violet"
    },
    {
      id: "glutamate",
      name: "Glutamato",
      chemicalName: "L-glutamic acid",
      synthesis: {
        steps: [
          "Glutamina liberada de las células gliales a través de transportadores SNAT",
          "Captación de glutamina en las neuronas a través de SNAT presináptico",
          "Conversión de glutamina a glutamato mediante la glutaminasa mitocondrial",
          "Almacenamiento vesicular mediante vGluT"
        ],
        enzymes: ["Glutaminasa", "Glutamina Sintetasa (Glial)"]
      },
      receptors: [
        { family: "NMDA Ionotrópico", subtypes: "NR1, NR2A-D, NR3", action: "Canal de Ca2+ regulado por ligando y voltaje. Requiere coagonista Glicina/D-Ser." },
        { family: "AMPA/Kainato Ionotrópico", subtypes: "GluR1-4, GluR5-7", action: "Canales de Na+ regulados por ligando. Median excitación/despolarización rápida." },
        { family: "mGluRs Metabotrópicos", subtypes: "Grupo I (mGluR1/5), Grupo II/III (mGluR2-8)", action: "GPCR que regulan cascadas celulares e inhibición presináptica." }
      ],
      clearance: {
        mechanism: "Eliminado rápidamente de la hendidura sináptica a través de transportadores EAAT en la glía astrocítica vecina.",
        enzymes: ["Glutamina Sintetasa (enzima glial que convierte el glutamato de nuevo en glutamina)"]
      },
      clinicalRole: "El principal interruptor excitador del cerebro, mediando la transmisión sináptica rápida, LTP y sinaptogénesis.",
      highYield: "La hipofunción de NMDA en las interneuronas GABA de parvalbúmina conduce a ráfagas de glutamato cortical sin freno, lo que desencadena psicosis aguas abajo.",
      color: "amber"
    }
  ];

  const [activeNt, setActiveNt] = useState<NTInfo>(nts[0]);

  return (
    <div id="neurotransmitter-atlas-section" className="p-8 bg-[#0F172A] text-slate-100 flex-1 space-y-8 overflow-y-auto">
      {/* NT Selector Toggles */}
      <div className="flex gap-4">
        {nts.map((nt) => {
          const isActive = activeNt.id === nt.id;
          return (
            <button
              key={nt.id}
              onClick={() => setActiveNt(nt)}
              className={`px-5 py-3 rounded-2xl border text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                isActive
                  ? `bg-slate-900 border-${nt.color}-500/50 text-${nt.color}-400 shadow-md shadow-${nt.color}-500/5`
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full bg-${nt.color}-500 animate-pulse`}></span>
                {nt.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Synthesis Pathway Steps Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h4 className="text-md font-bold text-gray-100">Ciclo de Síntesis Enzimática</h4>
              <p className="text-xs text-gray-400">Vía química desde el aminoácido precursor</p>
            </div>
            <span className="font-mono text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded">
              {chapter4Data.studyTime}
            </span>
          </div>

          <div className="space-y-4">
            {chapter4Data.advancedContent
              .find((c) => c.title.toLowerCase().includes(chapter4Data.conceptMap.nodes.find(n => n.id === (chapter4Data.conceptMap.nodes.find(v => v.label.includes(chapter4Data.title.split(", ")[1]))?.id || "DA"))?.label.toLowerCase() || ""))
              ?.highYieldFacts.map((fact, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
                  <div className="text-sky-400 font-mono text-sm mt-0.5">0{index + 1}</div>
                  <p className="text-sm text-slate-300">{fact}</p>
                </div>
              )) || (
              <div className="space-y-4">
                {chapter4Data.advancedContent.find(c => c.id.includes(chapter4Data.conceptMap.nodes.find(n => n.label.includes("Dopamine"))?.id || "da"))?.highYieldFacts.map((fact, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <span className="font-mono text-sky-400 font-semibold">0{idx + 1}</span>
                    <span className="text-sm text-slate-300 leading-relaxed">{fact}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Flowchart rendering */}
          <div className="p-5 bg-slate-950/50 rounded-xl border border-slate-800">
            <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span> Síntesis Sináptica y Degradación
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs bg-slate-800 border border-slate-700 px-2 py-1 rounded text-sky-400 font-mono">PASO 1</span>
                <span className="text-sm text-slate-300">{chapter4Data.advancedContent.find(c => c.id.includes(chapter4Data.id ? "da" : "da"))?.definition}</span>
              </div>
              <div className="pl-4 border-l border-sky-500/20 py-2 space-y-2">
                <p className="text-xs text-slate-400 leading-relaxed">
                  {chapter4Data.advancedContent.find(c => c.id.includes(chapter4Data.id))?.mechanism}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pathway Flowchart */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            Vía de Neurotransmisión
          </h3>
          
          <div className="flex flex-col gap-6">
            <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-2">Transporte y Almacenamiento</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeNt.synthesis.steps.join(" ➔ ")}
              </p>
            </div>

            <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-2">Acciones de los Receptores</p>
              <div className="space-y-2">
                {activeNt.receptors.map((r, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">{r.family} ({r.subtypes})</span>
                    <span className="text-slate-400 italic text-right max-w-xs">{r.action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-2">Eliminación e Inactivación</p>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                {activeNt.clearance.mechanism}
              </p>
              <div className="flex gap-2">
                {activeNt.clearance.enzymes.map((e, idx) => (
                  <span key={idx} className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded font-mono">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Support object mapping active Nt string safely
const chapter4DataDataMap: Record<string, string> = {
  "chapter-4": "Dopamine"
};
