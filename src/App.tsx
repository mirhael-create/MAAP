/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import BrainAtlas from "./components/BrainAtlas";
import NeurotransmitterAtlas from "./components/NeurotransmitterAtlas";
import ReceptorUniverse from "./components/ReceptorUniverse";
import DrugMatrix from "./components/DrugMatrix";
import StahlConsultant from "./components/StahlConsultant";
import ChapterViewer from "./components/ChapterViewer";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("dashboard");
  const [completedCardsCount, setCompletedCardsCount] = useState<number>(0);

  const handleAddCompletedCard = () => {
    setCompletedCardsCount((prev) => prev + 1);
  };

  const renderActiveView = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard onSelectView={setCurrentTab} completedCardsCount={completedCardsCount} />;
      case "chapter-4":
      case "chapters":
        return <ChapterViewer onAddCompletedCard={handleAddCompletedCard} />;
      case "brain-atlas":
        return <BrainAtlas />;
      case "neuro-atlas":
        return <NeurotransmitterAtlas />;
      case "receptors":
        return <ReceptorUniverse />;
      case "drug-matrix":
        return <DrugMatrix />;
      case "consultant":
        return <StahlConsultant />;
      default:
        return <Dashboard onSelectView={setCurrentTab} completedCardsCount={completedCardsCount} />;
    }
  };

  return (
    <div id="academy-root-layout" className="flex h-screen w-screen overflow-hidden bg-[#0F172A] font-sans text-slate-100">
      {/* Sidebar Navigation */}
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Global Workstation Header */}
        <Header 
          currentTab={currentTab} 
          completedFlashcardsCount={completedCardsCount}
          quizScore={0}
        />

        {/* View Content Workspace */}
        <main className="flex-1 overflow-hidden flex flex-col bg-[#0F172A]">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}
