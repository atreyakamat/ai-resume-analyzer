import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing text content." },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are an expert ATS (Applicant Tracking System) and professional resume reviewer.
Analyze the following resume text and provide structured feedback.

Resume Text:
"""
${text}
"""

Provide your feedback in the following JSON format:
{
  "overallFeedback": "A concise paragraph summarizing the resume's strengths and weaknesses.",
  "bulletImprovements": [
    {
      "original": "The original weak bullet point from the resume.",
      "improved": "A rewritten, impactful bullet point using action verbs and metrics."
    }
  ],
  "atsOptimizationTips": [
    "A specific tip to improve ATS compatibility (e.g., formatting, keywords)."
  ],
  "rewrittenSummary": "A professional, compelling summary section rewritten for impact."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallFeedback: {
              type: Type.STRING,
              description: "A concise paragraph summarizing the resume's strengths and weaknesses.",
            },
            bulletImprovements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  improved: { type: Type.STRING },
                },
                required: ["original", "improved"],
              },
            },
            atsOptimizationTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            rewrittenSummary: {
              type: Type.STRING,
            },
          },
          required: [
            "overallFeedback",
            "bulletImprovements",
            "atsOptimizationTips",
            "rewrittenSummary",
          ],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response from Gemini API");
    }

    const result = JSON.parse(resultText);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume. Please try again." },
      { status: 500 }
    );
  }
}
