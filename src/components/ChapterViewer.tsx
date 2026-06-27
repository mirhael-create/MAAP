/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { chapter4Data } from "../data/chapter4";
import { 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  Sliders, 
  Layers, 
  Check, 
  Rotate3d, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Search,
  CheckCircle2,
  XCircle,
  Brain
} from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface ChapterViewerProps {
  onAddCompletedCard: () => void;
}

export default function ChapterViewer({ onAddCompletedCard }: ChapterViewerProps) {
  const chapter = chapter4Data;

  const tabs = [
    { id: "overview", label: "A. Resumen" },
    { id: "concepts", label: "B. Mapa de Conceptos" },
    { id: "explanation", label: "C. Contenido Principal" },
    { id: "figures", label: "D. Figuras" },
    { id: "tables", label: "E. Tablas" },
    { id: "charts", label: "F. Análisis Visual" },
    { id: "pearls", label: "G. Perlas" },
    { id: "flashcards", label: "H. Tarjetas" },
    { id: "quiz", label: "I. Motor de Evaluación" },
    { id: "board", label: "J. Simulador de Examen" }
  ];

  const [activeSec, setActiveSec] = useState("overview");

  // Section B - Interactive Concept Map node state
  const [selectedConceptNode, setSelectedConceptNode] = useState(chapter.conceptMap.nodes[0]);

  // Section E - Search term
  const [tableSearch, setSearchTable] = useState("");

  // Section H - Flashcards state
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardDifficultyFilter, setCardFilter] = useState<string>("All");

  const filteredFlashcards = chapter.flashcards.filter(
    (c) => cardDifficultyFilter === "All" || c.difficulty === cardDifficultyFilter
  );

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIdx((prev) => (prev + 1) % filteredFlashcards.length);
    }, 150);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIdx((prev) => (prev - 1 + filteredFlashcards.length) % filteredFlashcards.length);
    }, 150);
  };

  const handleMarkMastered = () => {
    onAddCompletedCard();
    handleNextCard();
  };

  // Section I - Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectQuizOpt = (qid: string, opt: string) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qid]: opt }));
  };

  const gradeQuiz = () => {
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
  };

  // Section J - Board Exam state
  const [selectedBoardOpt, setSelectedBoardOpt] = useState<Record<string, string>>({});
  const [revealedBoardQuestions, setRevealedBoardQuestions] = useState<Record<string, boolean>>({});

  const handleSelectBoardOpt = (qid: string, key: string) => {
    if (revealedBoardQuestions[qid]) return;
    setSelectedBoardOpt((prev) => ({ ...prev, [qid]: key }));
  };

  const revealBoardExplanation = (qid: string) => {
    setRevealedBoardQuestions((prev) => ({ ...prev, [qid]: true }));
  };

  // Visual Analytics mock datasets from Stahl pages 155 and 79
  const courseOfSchizophreniaData = [
    { year: 20, functioning: 95, label: "Asintomático" },
    { year: 22, functioning: 90, label: "Pródromo" },
    { year: 23, functioning: 40, label: "1.er Episodio" },
    { year: 24, functioning: 75, label: "Remisión" },
    { year: 25, functioning: 30, label: "2.º Episodio" },
    { year: 26, functioning: 60, label: "Remisión" },
    { year: 27, functioning: 25, label: "3.er Episodio" },
    { year: 29, functioning: 15, label: "4.º Episodio" },
    { year: 31, functioning: 35, label: "Residual" },
    { year: 40, functioning: 20, label: "Refractario" }
  ];

  const atypicalAffinityData = [
    { receptor: "D2", clozapine: 20, risperidone: 85, aripiprazole: 95 },
    { receptor: "5HT2A", clozapine: 95, risperidone: 95, aripiprazole: 70 },
    { receptor: "H1", clozapine: 90, risperidone: 30, aripiprazole: 40 },
    { receptor: "M1", clozapine: 85, risperidone: 10, aripiprazole: 5 },
    { receptor: "Alpha1", clozapine: 85, risperidone: 80, aripiprazole: 30 }
  ];

  return (
    <div id="textbook-viewer" className="p-8 bg-[#0F172A] text-slate-100 flex-1 flex flex-col overflow-hidden">
      {/* Visual Navigation Tab Headers */}
      <div className="flex gap-1.5 border-b border-slate-800 pb-2 overflow-x-auto shrink-0 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveSec(tab.id);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all duration-300 ${
              activeSec === tab.id
                ? "bg-slate-900 border border-sky-500/50 text-sky-400 font-bold"
                : "bg-transparent border border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Workspace Scrollbar */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 space-y-8">
        
        {/* SECTION A — CHAPTER OVERVIEW */}
        {activeSec === "overview" && (
          <div className="space-y-6">
            <div className="p-8 bg-gradient-to-r from-sky-500/10 to-violet-500/5 border border-sky-500/20 rounded-3xl relative overflow-hidden">
              <div className="absolute right-4 top-4 text-sky-500/20">
                <Brain className="w-48 h-48 -rotate-12" />
              </div>
              <span className="text-[10px] bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-wider">
                Espec. del Capítulo {chapter.number}
              </span>
              <h1 className="text-2xl font-black text-white mt-4">{chapter.title}</h1>
              <p className="text-slate-400 text-xs mt-2 max-w-2xl leading-relaxed">
                Un plan psiquiátrico maestro que detalla los síntomas de la psicosis y mapea las tres hipótesis de neurotransmisores fundamentales que explican la esquizofrenia.
              </p>
              <div className="flex gap-4 mt-6">
                <span className="text-xs bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800 text-slate-400">
                  Tiempo de estudio: <strong className="text-sky-400">{chapter.studyTime}</strong>
                </span>
                <span className="text-xs bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800 text-slate-400">
                  Dificultad: <strong className="text-rose-400">{chapter.difficulty === "Expert" ? "Experto" : chapter.difficulty}</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Learning Objectives */}
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-md font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  Objetivos de Aprendizaje Primarios
                </h3>
                <ul className="space-y-3 text-xs text-slate-300">
                  {chapter.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Takeaways */}
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-md font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  Puntos Clave Clínicos
                </h3>
                <ul className="space-y-3 text-xs text-slate-300">
                  {chapter.takeaways.map((take, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                      <span>{take}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SECTION B — INTERACTIVE CONCEPT MAP */}
        {activeSec === "concepts" && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400 font-mono">
              Haga clic en los nodos de concepto para rastrear las cascadas de señalización fisiológica
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Simple Interactive Graph Menu Grid */}
              <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-wrap gap-4 items-center justify-center min-h-[300px]">
                {chapter.conceptMap.nodes.map((node) => {
                  const isSelected = selectedConceptNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedConceptNode(node)}
                      className={`px-4 py-3 rounded-2xl border text-xs font-semibold cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "bg-slate-950 border-sky-500/60 text-sky-400 shadow-md shadow-sky-500/5"
                          : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-100"
                      }`}
                    >
                      {node.label}
                    </button>
                  );
                })}
              </div>

              {/* Inspector Card */}
              <div className="lg:col-span-1 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">Nodo de Concepto Seleccionado</span>
                  <h4 className="text-md font-bold text-white mt-1">{selectedConceptNode.label}</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-semibold uppercase font-mono">Definición y Función</p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedConceptNode.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION C — ADVANCED CONTENT EXPLANATIONS */}
        {activeSec === "explanation" && (
          <div className="space-y-4">
            {chapter.advancedContent.map((content) => (
              <details 
                key={content.id} 
                className="group bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer text-slate-300 hover:text-white transition-colors select-none font-semibold text-sm">
                  <span className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-sky-400" />
                    {content.title}
                  </span>
                  <span className="transition duration-300 group-open:-rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="p-6 border-t border-slate-800/80 bg-slate-950/40 space-y-4 text-xs">
                  <p className="text-slate-400">{content.definition}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-sky-400 font-semibold uppercase font-mono text-[10px]">Vía de Síntesis</span>
                      <p className="text-slate-300 leading-relaxed">{content.mechanism}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-violet-400 font-semibold uppercase font-mono text-[10px]">Relevancia Clínica</span>
                      <p className="text-slate-300 leading-relaxed">{content.clinicalRelevance}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-sky-500/5 border border-sky-500/10 rounded-xl">
                    <span className="text-sky-400 font-semibold uppercase font-mono text-[10px] block mb-2">Datos de Alto Rendimiento</span>
                    <ul className="space-y-2">
                      {content.highYieldFacts.map((fact, idx) => (
                        <li key={idx} className="flex gap-2 text-slate-300">
                          <span>✓</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}

        {/* SECTION D — FIGURES RECONSTRUCTION */}
        {activeSec === "figures" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Synapse Illustration */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col items-center">
              <h4 className="text-sm font-bold text-white mb-2 uppercase font-mono tracking-wider text-center">
                Neurotransmisión Sináptica Reciclada
              </h4>
              <p className="text-xs text-slate-400 text-center mb-6">
                Pase el cursor para rastrear los pasos de síntesis de EAAT, vGluT y glutaminasa
              </p>
              <svg viewBox="0 0 400 300" className="w-full max-w-sm h-auto">
                <path d="M 120,20 C 120,120 180,120 180,150 C 180,180 120,180 120,280" fill="none" stroke="#334155" strokeWidth="4" />
                <path d="M 280,20 C 280,120 220,120 220,150 C 220,180 280,180 280,280" fill="none" stroke="#334155" strokeWidth="4" />
                {/* Vesicles */}
                <circle cx="200" cy="80" r="14" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="200" cy="80" r="4" fill="#38bdf8" />
                <circle cx="170" cy="110" r="14" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="170" cy="110" r="4" fill="#38bdf8" />
                {/* Text Labels */}
                <text x="200" y="84" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">vGluT</text>
              </svg>
            </div>

            {/* Direct Indirect Circuit */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col items-center">
              <h4 className="text-sm font-bold text-white mb-2 uppercase font-mono tracking-wider text-center">
                Proyecciones directas/indirectas del bucle CSTC
              </h4>
              <p className="text-xs text-slate-400 text-center mb-6">
                El delicado equilibrio de la salida motora: D1 Ir frente a D2 Detener
              </p>
              <svg viewBox="0 0 400 300" className="w-full max-w-sm h-auto">
                {/* Cortex */}
                <rect x="50" y="30" width="100" height="40" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="100" y="54" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Corteza</text>
                {/* Thalamus */}
                <rect x="250" y="30" width="100" height="40" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="300" y="54" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Tálamo</text>
                {/* Striatum */}
                <rect x="150" y="140" width="100" height="50" rx="10" fill="#334155" stroke="#38bdf8" strokeWidth="2" />
                <text x="200" y="164" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Estriado</text>
                {/* Connections */}
                <path d="M 100,70 L 170,140" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 200,190 L 300,70" fill="none" stroke="#ef4444" strokeWidth="2" />
              </svg>
            </div>
          </div>
        )}

        {/* SECTION E — TABLES RECONSTRUCTION */}
        {activeSec === "tables" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold text-white font-mono uppercase tracking-wider">
                Tabla 4-1: Modelos farmacológicos que vinculan psicoestimulantes, disociativos y psicodélicos
              </h3>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      <th className="py-4 px-6">Dominio</th>
                      <th className="py-4 px-6">Psicoestimulantes</th>
                      <th className="py-4 px-6">Anestésicos Disociativos</th>
                      <th className="py-4 px-6">Psicodélicos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs">
                    <tr>
                      <td className="py-4 px-6 font-bold text-white">Mecanismo</td>
                      <td className="py-4 px-6 text-sky-400 font-mono">Agonista de dopamina D2</td>
                      <td className="py-4 px-6 text-violet-400 font-mono">Antagonista de NMDA</td>
                      <td className="py-4 px-6 text-teal-400 font-mono">Agonista de 5HT2A</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-bold text-white">Alucinaciones Primarias</td>
                      <td className="py-4 px-6 text-slate-300">Auditivas</td>
                      <td className="py-4 px-6 text-slate-300">Visuales</td>
                      <td className="py-4 px-6 text-slate-300">Visuales</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-bold text-white">Tipo de Delirio</td>
                      <td className="py-4 px-6 text-slate-300">Paranoide</td>
                      <td className="py-4 px-6 text-slate-300">Paranoide</td>
                      <td className="py-4 px-6 text-slate-300">Místico</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-bold text-white">Mantenimiento de Introspección</td>
                      <td className="py-4 px-6 text-slate-400 font-mono font-bold">No</td>
                      <td className="py-4 px-6 text-slate-400 font-mono font-bold">No</td>
                      <td className="py-4 px-6 text-emerald-400 font-mono font-bold">Sí</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION F — INTERACTIVE CHARTS */}
        {activeSec === "charts" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Functional Decline course of schizophrenia */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
              <h4 className="text-sm font-bold text-white mb-2 uppercase font-mono tracking-wider">
                Curso de Deterioro Funcional a través de Episodios
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                Progresión de la resistencia al tratamiento y pérdida de tejido cerebral (Stahl Pág. 155)
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={courseOfSchizophreniaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(51,65,85,0.2)" />
                    <XAxis dataKey="year" stroke="#64748b" fontSize={10} label={{ value: 'Edad (Años)', position: 'insideBottom', offset: -5 }} />
                    <YAxis stroke="#64748b" fontSize={10} label={{ value: 'Nivel de Funcionamiento (%)', angle: -90, position: 'insideLeft', offset: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b" }} />
                    <Line type="monotone" dataKey="functioning" stroke="#f43f5e" strokeWidth={3} dot={{ fill: '#f43f5e', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar atypical comparison */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
              <h4 className="text-sm font-bold text-white mb-2 uppercase font-mono tracking-wider">
                Perfiles de Receptores de Antipsicóticos Atípicos
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                Mapeo de perfiles de afinidad para Clozapina, Risperidona y Aripiprazol
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={atypicalAffinityData}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis dataKey="receptor" stroke="#64748b" fontSize={10} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.1)" fontSize={8} />
                    <Radar name="Clozapina" dataKey="clozapine" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                    <Radar name="Risperidona" dataKey="risperidone" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* SECTION G — CLINICAL PEARLS */}
        {activeSec === "pearls" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chapter.pearls.map((pearl) => (
              <div 
                key={pearl.id} 
                className={`p-6 rounded-3xl border ${
                  pearl.isHighYield 
                    ? "bg-sky-500/5 border-sky-500/20" 
                    : "bg-slate-900/40 border-slate-800"
                } flex flex-col justify-between h-full`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Pauta Clínica</span>
                    {pearl.isHighYield && (
                      <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded font-mono font-bold">
                        ALTO RENDIMIENTO
                      </span>
                    )}
                  </div>
                  <h4 className="text-md font-bold text-white">{pearl.title}</h4>
                  <div className="space-y-2 text-xs">
                    <p className="text-slate-400 leading-relaxed"><strong className="text-slate-200">Mecanismo:</strong> {pearl.mechanism}</p>
                    <p className="text-slate-400 leading-relaxed"><strong className="text-slate-200">Impacto Clínico:</strong> {pearl.whyItMatters}</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-sky-400 italic">
                  <strong>Consejo del Examen:</strong> {pearl.boardRelevance}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION H — FLASHCARDS */}
        {activeSec === "flashcards" && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 font-mono">
                  Tarjeta {currentCardIdx + 1} de {filteredFlashcards.length}
                </span>
              </div>
              <select
                value={cardDifficultyFilter}
                onChange={(e) => {
                  setCardFilter(e.target.value);
                  setCurrentCardIdx(0);
                }}
                className="bg-slate-900 border border-slate-800 text-xs px-3 py-1.5 rounded-xl focus:outline-none"
              >
                <option value="All">Todas las Dificultades</option>
                <option value="Easy">Fácil</option>
                <option value="Medium">Media</option>
                <option value="Hard">Difícil</option>
              </select>
            </div>

            {/* Flashcard Render */}
            <div 
              id="flashcard-body"
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full aspect-video bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between cursor-pointer select-none group hover:border-sky-500/30 transition-all duration-300 shadow-2xl"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  {filteredFlashcards[currentCardIdx]?.difficulty === "Easy" ? "Fácil" : filteredFlashcards[currentCardIdx]?.difficulty === "Medium" ? "Media" : "Difícil"}
                </span>
                <span className="text-xs font-mono text-sky-400 bg-sky-500/5 px-2 py-0.5 rounded border border-sky-500/10">
                  {filteredFlashcards[currentCardIdx]?.tags[0]}
                </span>
              </div>

              <div className="flex-1 flex items-center justify-center text-center">
                <p className="text-md font-bold text-white">
                  {isFlipped 
                    ? filteredFlashcards[currentCardIdx]?.answer 
                    : filteredFlashcards[currentCardIdx]?.question
                  }
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                <span>Haga clic para voltear la tarjeta</span>
                <Rotate3d className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card Controls */}
            <div className="flex justify-between items-center">
              <button 
                onClick={handlePrevCard}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer"
              >
                ◀ Anterior
              </button>
              <button 
                onClick={handleMarkMastered}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl cursor-pointer"
              >
                Marcar como Dominada ✓
              </button>
              <button 
                onClick={handleNextCard}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer"
              >
                Siguiente ▶
              </button>
            </div>
          </div>
        )}

        {/* SECTION I — QUIZ ENGINE */}
        {activeSec === "quiz" && (
          <div className="max-w-2xl mx-auto space-y-8">
            {chapter.quiz.map((q, idx) => (
              <div key={q.id} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-sky-400">PREGUNTA {idx + 1}</span>
                  <span className="text-[10px] bg-slate-800 px-2.5 py-0.5 rounded text-slate-400 font-mono">
                    {q.type}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white">{q.question}</p>
                <div className="grid grid-cols-1 gap-2.5">
                  {q.options?.map((opt) => {
                    const isSelected = userAnswers[q.id] === opt;
                    const isCorrect = q.correctAnswer === opt;
                    let optionStyle = "border-slate-800 bg-slate-950/20 text-slate-300 hover:border-slate-700";
                    if (isSelected) {
                      optionStyle = "border-sky-500/50 bg-sky-500/5 text-sky-400";
                    }
                    if (quizSubmitted) {
                      if (isCorrect) {
                        optionStyle = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                      } else if (isSelected) {
                        optionStyle = "border-rose-500/50 bg-rose-500/10 text-rose-400";
                      } else {
                        optionStyle = "border-slate-800 bg-slate-950/20 text-slate-500 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectQuizOpt(q.id, opt)}
                        className={`w-full text-left p-4 rounded-xl border text-xs font-medium cursor-pointer transition-all duration-300 ${optionStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs space-y-2">
                    <p className={`font-mono font-bold uppercase tracking-wider ${
                      userAnswers[q.id] === q.correctAnswer ? "text-emerald-400" : "text-rose-400"
                    }`}>
                      {userAnswers[q.id] === q.correctAnswer ? "✓ Correcto" : "✗ Incorrecto"}
                    </p>
                    <p className="text-slate-400 leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-4 justify-end">
              {quizSubmitted ? (
                <button 
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-xs font-bold rounded-xl border border-slate-800 cursor-pointer"
                >
                  Reiniciar Evaluación
                </button>
              ) : (
                <button 
                  onClick={gradeQuiz}
                  className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Enviar Respuestas
                </button>
              )}
            </div>
          </div>
        )}

        {/* SECTION J — BOARD EXAM SIMULATOR */}
        {activeSec === "board" && (
          <div className="max-w-2xl mx-auto space-y-12">
            {chapter.boardQuestions.map((q, idx) => {
              const isRevealed = revealedBoardQuestions[q.id];
              const selectedOpt = selectedBoardOpt[q.id];
              return (
                <div key={q.id} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
                  {/* Vignette Panel */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="font-mono text-xs text-rose-400 font-bold">CASO CLÍNICO {idx + 1}</span>
                      <span className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-0.5 rounded font-mono font-bold">
                        DIFICULTAD: {q.difficulty}/10
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950/40 p-5 rounded-2xl border border-slate-850">
                      "{q.vignette}"
                    </p>
                  </div>

                  {/* Question Stem */}
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-white">{q.question}</p>
                    <div className="grid grid-cols-1 gap-2.5">
                      {q.options.map((opt) => {
                        const isSelected = selectedOpt === opt.key;
                        const isCorrect = q.correctAnswer === opt.key;
                        let optionStyle = "border-slate-800 bg-slate-950/20 text-slate-300 hover:border-slate-700";
                        if (isSelected) {
                          optionStyle = "border-rose-500/50 bg-rose-500/5 text-rose-400";
                        }
                        if (isRevealed) {
                          if (isCorrect) {
                            optionStyle = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                          } else if (isSelected) {
                            optionStyle = "border-rose-500/50 bg-rose-500/10 text-rose-400";
                          } else {
                            optionStyle = "border-slate-800 bg-slate-950/20 text-slate-500 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            onClick={() => handleSelectBoardOpt(q.id, opt.key)}
                            className={`w-full text-left p-4 rounded-xl border text-xs font-medium cursor-pointer transition-all duration-300 flex items-start gap-3 ${optionStyle}`}
                          >
                            <span className="font-mono font-bold text-slate-400 shrink-0">{opt.key}.</span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action or Explanations */}
                  {!isRevealed ? (
                    <div className="flex justify-end">
                      <button
                        onClick={() => revealBoardExplanation(q.id)}
                        disabled={!selectedOpt}
                        className="px-5 py-2.5 bg-rose-500 hover:bg-rose-450 disabled:bg-slate-800 disabled:opacity-40 text-slate-950 text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Confirmar Respuesta y Revelar Explicación
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 bg-slate-950/60 border border-slate-800/80 rounded-2xl text-xs space-y-4">
                      <div>
                        <p className={`font-mono font-bold uppercase tracking-wider text-sm mb-1 ${
                          selectedOpt === q.correctAnswer ? "text-emerald-400" : "text-rose-400"
                        }`}>
                          {selectedOpt === q.correctAnswer ? "✓ CORRECTO" : "✗ INCORRECTO"}
                        </p>
                        <p className="text-slate-300 leading-relaxed font-sans">{q.explanation}</p>
                      </div>

                      <div className="border-t border-slate-800/80 pt-4 space-y-3">
                        <p className="font-mono font-semibold text-slate-400 uppercase tracking-widest text-[10px]">Análisis de Distractores</p>
                        {Object.entries(q.distractorExplanations).map(([key, text]) => (
                          <div key={key} className="flex gap-2">
                            <strong className="font-mono text-slate-500 shrink-0">{key}:</strong>
                            <p className="text-slate-400">{text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
