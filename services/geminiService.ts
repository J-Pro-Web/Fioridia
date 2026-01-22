
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSkincareRecommendation = async (concerns: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The user has these skin concerns: ${concerns}. 
    Based on our luxury botanical line (Luminous Face Oil, Velvet Cleansing Milk, Botanical Mist, Repair Balm, Rose Infusion Oil, Petal Cleansing Balm), 
    suggest a simple 3-step routine. Be poetic and clinical.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          routineName: { type: Type.STRING },
          description: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                step: { type: Type.NUMBER },
                product: { type: Type.STRING },
                action: { type: Type.STRING }
              },
              required: ["step", "product", "action"]
            }
          }
        },
        required: ["routineName", "description", "steps"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
};
