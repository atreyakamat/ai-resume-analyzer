import { NextResponse } from "next/server";
import { ollamaService } from "@/lib/ollama";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing text content." },
        { status: 400 }
      );
    }

    // Check if Ollama is available
    const isHealthy = await ollamaService.checkHealth();
    if (!isHealthy) {
      return NextResponse.json(
        {
          error: `Ollama is not running or model '${ollamaService.getModel()}' is not available. Please ensure Ollama is running and the model is pulled (e.g., 'ollama pull ${ollamaService.getModel()}').`,
        },
        { status: 503 }
      );
    }

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

Important: Return ONLY valid JSON without any markdown formatting or code blocks.`;

    const responseText = await ollamaService.generate(prompt, {
      format: "json",
      temperature: 0.7,
    });

    if (!responseText) {
      throw new Error("No response from Ollama API");
    }

    // Parse the JSON response
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse Ollama response:", responseText);
      throw new Error("Invalid JSON response from AI model");
    }

    // Validate the response structure
    if (
      !result.overallFeedback ||
      !result.bulletImprovements ||
      !result.atsOptimizationTips ||
      !result.rewrittenSummary
    ) {
      throw new Error("Incomplete response from AI model");
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error analyzing resume:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to analyze resume. Please try again.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
