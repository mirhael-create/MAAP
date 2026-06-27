/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ConceptNode {
  id: string;
  label: string;
  type: "neurotransmitter" | "receptor" | "protein" | "pathway" | "effect" | "state";
  description: string;
}

export interface ConceptEdge {
  from: string;
  to: string;
  label: string;
}

export interface ConceptMapData {
  nodes: ConceptNode[];
  edges: ConceptEdge[];
}

export interface AdvancedContent {
  id: string;
  title: string;
  definition: string;
  mechanism: string;
  pathway: string;
  clinicalRelevance: string;
  highYieldFacts: string[];
}

export interface TableRow {
  [key: string]: string | number | boolean;
}

export interface InteractiveTableData {
  id: string;
  title: string;
  headers: { key: string; label: string }[];
  rows: TableRow[];
}

export interface ClinicalPearlData {
  id: string;
  title: string;
  mechanism: string;
  whyItMatters: string;
  boardRelevance: string;
  isHighYield: boolean;
}

export interface FlashcardData {
  question: string;
  answer: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
}

export interface QuizQuestionData {
  id: string;
  type: "MCQ" | "Matching" | "Labeling" | "Reasoning";
  question: string;
  options?: string[];
  correctAnswer: string; // or serialized structure
  explanation: string;
  pairs?: { left: string; right: string }[]; // For Matching
  labels?: { x: number; y: number; label: string }[]; // For Labeling
}

export interface BoardQuestionData {
  id: string;
  vignette: string;
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string; // "A" | "B" | "C" | "D" | "E"
  explanation: string;
  distractorExplanations: { [key: string]: string };
  difficulty: number; // 1-10
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  studyTime: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  objectives: string[];
  takeaways: string[];
  conceptMap: ConceptMapData;
  advancedContent: AdvancedContent[];
  pearls: ClinicalPearlData[];
  flashcards: FlashcardData[];
  quiz: QuizQuestionData[];
  boardQuestions: BoardQuestionData[];
}
