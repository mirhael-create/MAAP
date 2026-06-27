/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, FormEvent } from "react";
import { Send, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function StahlConsultant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "¡Hola! Soy el Asistente Clínico Virtual del Dr. Stahl. Pregúntame cualquier duda avanzada sobre psicofarmacología con respecto a perfiles de afinidad de receptores, vías de sinaptogénesis o prescripción de antipsicóticos basada en mecanismos."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages
        })
      });

      if (!response.ok) {
        throw new Error("No se pudo comunicar con el Motor Clínico de IA Stahl.");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Explica la hipótesis de la hipofunción de NMDA en la esquizofrenia.",
    "Compara los perfiles de unión a receptores de Clozapina y Olanzapina.",
    "¿Por qué el antagonismo 5HT2A reduce el riesgo de SEP en antipsicóticos atípicos?",
    "Explica cómo el déficit de GAD67 desinhibe las proyecciones de glutamato."
  ];

  return (
    <div id="consultant-section" className="p-8 bg-[#0F172A] text-slate-100 flex-1 flex flex-col h-full overflow-hidden">
      {/* Messages Panel */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin scrollbar-thumb-slate-800">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-xl p-4 rounded-3xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-sky-500 to-violet-600 text-white rounded-br-none"
                  : "bg-slate-900 border border-slate-800 text-slate-300 rounded-bl-none"
              }`}
            >
              {msg.role === "model" && (
                <div className="flex items-center gap-1.5 text-sky-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  Consultor Clínico Stahl
                </div>
              )}
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 text-slate-300 rounded-3xl p-4 max-w-xl rounded-bl-none flex items-center gap-3">
              <RefreshCw className="w-4 h-4 text-sky-400 animate-spin" />
              <span className="text-xs font-mono text-slate-400">Consultando sinapsis clínicas...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-start p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl gap-3">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-300">{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      {messages.length === 1 && (
        <div className="mb-4">
          <p className="text-[10px] uppercase font-mono text-slate-500 tracking-wider mb-2 font-semibold">Consultas Clínicas Sugeridas</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setInput(s)}
                className="text-xs bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-xl text-slate-400 hover:text-slate-100 transition-all duration-300 cursor-pointer text-left"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex gap-3 bg-slate-900 border border-slate-800/80 rounded-2xl p-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pregunta al asistente de IA clínica del Dr. Stahl..."
          disabled={loading}
          className="flex-1 bg-transparent border-0 text-slate-100 placeholder-slate-500 text-xs px-4 focus:outline-none focus:ring-0 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-3 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:opacity-40 text-slate-950 font-bold rounded-xl transition-all duration-300 cursor-pointer"
        >
          <Send className="w-4 h-4 text-slate-950" />
        </button>
      </form>
    </div>
  );
}
