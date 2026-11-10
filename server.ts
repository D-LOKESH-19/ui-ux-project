import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoint for Gemini AI insights
  app.post('/api/ai-insights', async (req, res) => {
    try {
      const { glucoseData, userPrompt } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          insight: "Gemini API key is not configured. Here is a standard calm recommendation: Your glucose is in a steady range. Maintain hydration and regular balanced meals."
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `You are Serene Metric, a supportive, warm, plainspoken medical assistant specialized in helping older adults understand blood glucose readings and healthy living. 
      Current glucose data context: ${JSON.stringify(glucoseData)}.
      User question or context: ${userPrompt || "Provide a calming, actionable summary of my current metabolic state and a gentle tip for the next few hours."}
      
      Rules:
      - Use warm, plainspoken human voice without clinical jargon.
      - Keep guidance brief and immediately actionable (under 3 sentences).
      - Reassure rather than panic.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({ insight: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI insight" });
    }
  });

  // Setup Vite middleware for development
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
