import { GoogleGenAI } from "@google/genai";
import { Soldier, MilitaryFieldProfile } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateExitProtocol = async (
  soldier: Soldier,
  profile: MilitaryFieldProfile
): Promise<string> => {
  try {
    const prompt = `
      Generate a short, strictly formal military exit approval statement.
      
      Details:
      - Field Command: ${profile.name} (${profile.location})
      - Commander: ${profile.commanderName}
      - Soldier: ${soldier.rank} ${soldier.surname} ${soldier.name}
      - Exit Date: ${soldier.exitDate}
      - Rejoin Date: ${soldier.rejoinDate}

      The output should be a single paragraph confirming authorization to leave the post, citing accordance with standard regulations. Do not use markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Authorization granted per standard protocol.";
  } catch (error) {
    console.error("Gemini generation failed", error);
    return "Authorization granted pending final physical check. System offline protocol active.";
  }
};
