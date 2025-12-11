import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { VISIONARY_DIRECTOR_SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

export const initializeGenAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing in process.env");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const generateVisionaryResponse = async (
  prompt: string,
  modelName: string = 'gemini-2.5-flash'
): Promise<string> => {
  const ai = initializeGenAI();
  if (!ai) throw new Error("AI Client not initialized");

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: VISIONARY_DIRECTOR_SYSTEM_INSTRUCTION,
        temperature: 0.8,
      },
    });
    return response.text || "The connection to the Nexus is unstable. Try again.";
  } catch (error) {
    console.error("Gemini Text Generation Error:", error);
    return "Disruption in the neural link. Please verify your API Key or connection.";
  }
};

export const generateNexusImage = async (prompt: string): Promise<{ imageUrl: string | null, text: string | null }> => {
  const ai = initializeGenAI();
  if (!ai) throw new Error("AI Client not initialized");

  try {
    // Using gemini-2.5-flash-image as per instructions for general image tasks/generation
    // Note: In a real scenario with strict generation needs, we might use Imagen, but instructions map flash-image.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        // No specific imageConfig for flash-image in generation mode usually, 
        // but we assume the model handles the prompt to generate.
      }
    });

    let imageUrl = null;
    let text = null;

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          imageUrl = `data:${part.inlineData.mimeType};base64,${base64EncodeString}`;
        } else if (part.text) {
          text = part.text;
        }
      }
    }

    return { imageUrl, text };
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    return { imageUrl: null, text: "Failed to materialize vision." };
  }
};
