/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client with standard headers
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy-key",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    }
  }
});

async function startServer() {
  // AI Chatbot endpoint proxying Gemini 3.5-flash
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      // Format conversation history for GenAI SDK
      const contents = (history || []).map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      }));
      
      // Append the current message
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: "You are Dr. Stephen M. Stahl, world-renowned psychiatry professor and author of 'Stahl's Essential Psychopharmacology'. You are tutoring an elite psychiatry resident on Chapter 4 ('Psychosis, Schizophrenia, and the Neurotransmitter Networks'). Answer their questions with advanced academic depth, referencing receptor profiles, CSTC loops, GPCR signaling, and correct clinical nomenclature. Keep answers rigorous, high-yield, structured, and clinically actionable.",
          temperature: 0.7
        }
      });

      const reply = response.text || "My clinical analysis synapses failed to generate a response. Please re-state your query.";
      res.json({ reply });
    } catch (error: any) {
      console.error("Gemini API error in server:", error);
      res.status(500).json({ reply: "I apologize, but my virtual prefrontal cortex experienced a transmission delay. Please verify your internet connection or try again." });
    }
  });

  // Chapters/curriculum endpoint for study analytics
  app.get("/api/chapters", (req, res) => {
    res.json({
      chapters: [
        { id: "chapter-4", number: 4, title: "Psychosis, Schizophrenia, and Neurotransmitter Networks", isLoaded: true }
      ]
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Resolve static assets in production
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));

    // Catch-all route to serve index.html in production
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) {
        return next();
      }
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Stahl Academy Server listening on port ${PORT}`);
  });
}

startServer();
