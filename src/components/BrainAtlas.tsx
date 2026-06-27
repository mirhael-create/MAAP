/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Brain, Sparkles, Activity, AlertCircle } from "lucide-react";

interface RegionInfo {
  id: string;
  name: string;
  function: string;
  neurotransmitter: string;
  pathology: string;
  coords: { cx: number; cy: number; r: number; label: string };
  highYield: string;
}

export default function BrainAtlas() {
  const regions: RegionInfo[] = [
    {
      id: "pfc",
      name: "Corteza Prefrontal (CPF)",
      function: "Funciones ejecutivas, memoria de trabajo, regulación emocional y toma de decisiones.",
      neurotransmitter: "Glutamato, Dopamina (D1), Noradrenalina (alfa-2A)",
      pathology: "La hipoactividad de las proyecciones mesocorticales de DA hacia la CPFDL/CPFVM desencadena síntomas cognitivos, negativos y afectivos.",
      coords: { cx: 160, cy: 150, r: 24, label: "CPF" },
      highYield: "La hipofunción de NMDA aquí en las interneuronas GABA positivas para parvalbúmina es el impulsor central de la disconectividad prefrontal."
    },
    {
      id: "striatum",
      name: "Cuerpo Estriado (Dorsal y Ventral)",
      function: "Planificación motora, filtro de acciones, formación de hábitos y vías de refuerzo.",
      neurotransmitter: "Dopamina (D1/D2), GABA",
      pathology: "Las proyecciones mesolímbicas hiperactivas causan síntomas positivos (delirios/alucinaciones). El bloqueo de D2 en el cuerpo estriado dorsal causa síntomas extrapiramidales (SEP) y discinesia tardía.",
      coords: { cx: 280, cy: 190, r: 22, label: "Estriado" },
      highYield: "El cuerpo estriado ventral (Núcleo Accumbens) es la puerta de entrada definitiva para el filtro motivacional y la conducta de búsqueda de recompensa."
    },
    {
      id: "thalamus",
      name: "Tálamo",
      function: "Filtro sensorial y sistema de compuerta, retransmitiendo señales a la corteza cerebral.",
      neurotransmitter: "Glutamato, GABA",
      pathology: "El colapso del filtro sensorial permite una sobrecarga sensorial, contribuyendo a los pensamientos desorganizados y alucinaciones.",
      coords: { cx: 330, cy: 220, r: 18, label: "Tálamo" },
      highYield: "Una vía de DA inerva el tálamo en primates, posiblemente regulando el sueño, el estado de alerta y el filtro cognitivo."
    },
    {
      id: "amygdala",
      name: "Amígdala",
      function: "Condicionamiento del miedo, memoria emocional, detección de amenazas y activación de alarmas.",
      neurotransmitter: "Serotonina (5HT2A), GABA, Glutamato",
      pathology: "La hiperactividad se vincula con fobias, TEPT, pánico y agresión maniática.",
      coords: { cx: 290, cy: 260, r: 15, label: "Amíg" },
      highYield: "Conectada a redes prefrontales que regulan la supresión emocional y la reevaluación cognitiva."
    },
    {
      id: "hippocampus",
      name: "Hipocampo",
      function: "Codificación de la memoria, consolidación y navegación espacial.",
      neurotransmitter: "Glutamato (NMDA), Serotonina",
      pathology: "La pérdida de neuronas hipocampales y la hipofunción de NMDA aquí se vincula con la demencia y el deterioro cognitivo.",
      coords: { cx: 350, cy: 280, r: 16, label: "Hipoc" },
      highYield: "Los receptores NMDA aquí desencadenan la potenciación a largo plazo (LTP) y el reclutamiento del receptor AMPA, la base del aprendizaje."
    },
    {
      id: "vta",
      name: "Área Tegmental Ventral (ATV)",
      function: "Origen de las vías de proyección dopaminérgica mesolímbica (recompensa) y mesocortical (cognición).",
      neurotransmitter: "Dopamina, GABA",
      pathology: "El disparo excesivo de las proyecciones del ATV al cuerpo estriado ventral es el sustrato clásico de los delirios y la psicosis.",
      coords: { cx: 340, cy: 310, r: 12, label: "ATV" },
      highYield: "Directamente inervada por vías de proyección de glutamato prefrontales descendentes, que regulan sus tasas de disparo."
    },
    {
      id: "raphe",
      name: "Núcleos del Rafe",
      function: "La fuente principal de proyecciones de serotonina (5-HT) en todo el sistema nervioso central.",
      neurotransmitter: "Serotonina (5-HT)",
      pathology: "La degeneración de las células de serotonina del rafe en el Parkinson causa una regulación compensatoria positiva de 5-HT2A cortical, impulsando la PEP.",
      coords: { cx: 410, cy: 330, r: 12, label: "Rafe" },
      highYield: "Los autorreceptores somatodendríticos 5HT1A se asientan aquí, actuando como reguladores de retroalimentación negativa de la liberación de serotonina."
    },
    {
      id: "lc",
      name: "Locus Coeruleus (LC)",
      function: "El motor principal de las proyecciones de noradrenalina (NE), impulsando la atención, el enfoque y la vigilancia.",
      neurotransmitter: "Noradrenalina (NE)",
      pathology: "La hiperactividad causa hiperalerta grave, ansiedad y alteraciones del estado de sueño.",
      coords: { cx: 430, cy: 300, r: 12, label: "LC" },
      highYield: "Los autorreceptores alfa-2A se asientan en las dendritas del LC, actuando como frenos para calmar las oleadas de noradrenalina."
    }
  ];

  const [selectedRegion, setSelectedRegion] = useState<RegionInfo>(regions[0]);

  return (
    <div id="brain-atlas-section" className="p-8 bg-[#0F172A] text-slate-100 flex-1 space-y-8 overflow-y-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Brain Visualizer Panel */}
        <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-6">
            <div>
              <h3 className="text-md font-bold text-white flex items-center gap-2">
                <Brain className="w-4 h-4 text-sky-400" />
                Mapa de Neuroanatomía Estructural
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Haga clic en las zonas activas resaltadas para inspeccionar las vías funcionales
              </p>
            </div>
            <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">
              Proyección Sagital
            </span>
          </div>

          {/* Master Brain SVG */}
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center p-4">
            <svg 
              viewBox="0 0 600 500" 
              className="w-full h-auto drop-shadow-[0_0_20px_rgba(56,189,248,0.05)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Decorative Background Grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(51, 65, 85, 0.15)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="600" height="500" fill="url(#grid)" rx="16" />

              {/* Cortex Background Shadow Outline */}
              <path 
                d="M 120,180 C 100,120 180,40 300,50 C 420,60 500,100 520,180 C 530,240 510,320 460,350 C 430,370 410,420 370,420 C 340,420 330,360 300,350 C 260,350 240,320 220,310 C 190,300 130,270 120,180 Z" 
                fill="rgba(30, 41, 59, 0.4)" 
                stroke="#334155" 
                strokeWidth="2" 
              />

              {/* Cerebellum */}
              <path 
                d="M 460,350 C 490,360 510,400 480,430 C 450,450 410,430 400,390 C 400,360 430,340 460,350 Z" 
                fill="rgba(51, 65, 85, 0.4)" 
                stroke="#475569" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
              />

              {/* Brain Stem */}
              <path 
                d="M 340,350 C 340,380 350,440 370,480 C 350,480 320,440 310,380 C 310,350 330,340 340,350 Z" 
                fill="rgba(15, 23, 42, 0.8)" 
                stroke="#1e293b" 
                strokeWidth="1.5"
              />

              {/* Deep Brain Structures / Limbic Shadow */}
              <path 
                d="M 230,240 C 220,200 270,160 320,170 C 370,180 390,210 380,250 C 360,280 300,290 260,280 C 240,270 230,250 230,240 Z" 
                fill="rgba(56, 189, 248, 0.05)" 
                stroke="rgba(56, 189, 248, 0.2)" 
                strokeWidth="1.5"
              />

              {/* Region Interactive Anchors */}
              {regions.map((region) => {
                const isSelected = selectedRegion.id === region.id;
                return (
                  <g 
                    key={region.id} 
                    className="cursor-pointer group"
                    onClick={() => setSelectedRegion(region)}
                  >
                    {/* Ripple animation for selected anchor */}
                    {isSelected && (
                      <circle 
                        cx={region.coords.cx} 
                        cy={region.coords.cy} 
                        r={region.coords.r + 8} 
                        fill="none" 
                        stroke="#38bdf8" 
                        strokeWidth="1.5"
                        className="animate-pulse opacity-40"
                      />
                    )}

                    {/* Outer hover dot */}
                    <circle 
                      cx={region.coords.cx} 
                      cy={region.coords.cy} 
                      r={region.coords.r} 
                      fill={isSelected ? "rgba(56, 189, 248, 0.25)" : "rgba(30, 41, 59, 0.8)"} 
                      stroke={isSelected ? "#38bdf8" : "#64748b"} 
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      className="transition-all duration-300 group-hover:stroke-sky-400 group-hover:fill-sky-500/10"
                    />

                    {/* Simple region acronym inside dot */}
                    <text 
                      x={region.coords.cx} 
                      y={region.coords.cy + 4} 
                      textAnchor="middle" 
                      fill={isSelected ? "#ffffff" : "#cbd5e1"} 
                      fontSize="10" 
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {region.coords.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Detailed Neuroanatomy Panel */}
        <div className="w-full md:w-96 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">
              {selectedRegion.name}
            </h3>
            <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider">
              Especificación Anatómica
            </span>
          </div>

          <div className="space-y-4">
            {/* Functional Roles */}
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-semibold flex items-center gap-1.5 uppercase font-mono">
                <Brain className="w-3.5 h-3.5 text-sky-400" />
                Función Fisiológica
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">
                {selectedRegion.function}
              </p>
            </div>

            {/* Principal Neurotransmitters */}
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-semibold flex items-center gap-1.5 uppercase font-mono">
                <Activity className="w-3.5 h-3.5 text-violet-400" />
                Neurotransmisores Principales
              </span>
              <p className="text-slate-300 text-xs font-mono bg-slate-950/40 border border-slate-800/80 p-2 rounded-lg text-sky-300">
                {selectedRegion.neurotransmitter}
              </p>
            </div>

            {/* Associated Pathology */}
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-semibold flex items-center gap-1.5 uppercase font-mono">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                Vínculo con la Patología Clínica
              </span>
              <p className="text-slate-300 text-xs leading-relaxed text-slate-300">
                {selectedRegion.pathology}
              </p>
            </div>

            {/* Board High-Yield Fact */}
            <div className="bg-sky-500/5 border border-sky-500/10 rounded-2xl p-4 space-y-2 mt-4">
              <span className="text-sky-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 font-mono">
                <Sparkles className="w-3 h-3 text-sky-400" />
                Perla de alto rendimiento del Dr. Stahl
              </span>
              <p className="text-slate-300 text-xs leading-relaxed italic">
                "{selectedRegion.highYield}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
