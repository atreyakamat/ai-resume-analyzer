/**
 * Ollama Service
 *
 * Provides integration with Ollama API for local AI inference
 * Supports text-based resume analysis using gemma3:1b or other models
 */

export interface OllamaGenerateRequest {
  model: string;
  prompt: string;
  stream?: boolean;
  format?: "json";
  options?: {
    temperature?: number;
    top_p?: number;
    top_k?: number;
  };
}

export interface OllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

export class OllamaService {
  private baseUrl: string;
  private model: string;

  constructor() {
    this.baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
    this.model = process.env.OLLAMA_MODEL || "gemma3:1b";
  }

  /**
   * Generate text completion using Ollama
   */
  async generate(prompt: string, options?: { temperature?: number; format?: "json" }): Promise<string> {
    const requestBody: OllamaGenerateRequest = {
      model: this.model,
      prompt,
      stream: false,
      ...(options?.format && { format: options.format }),
      options: {
        temperature: options?.temperature ?? 0.7,
      },
    };

    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
      }

      const data: OllamaGenerateResponse = await response.json();
      return data.response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to connect to Ollama: ${error.message}`);
      }
      throw new Error("Failed to connect to Ollama");
    }
  }

  /**
   * Check if Ollama is running and model is available
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: "GET",
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      const models = data.models || [];

      // Check if the specified model is available
      const modelAvailable = models.some((m: any) => m.name.includes(this.model));

      return modelAvailable;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get available models
   */
  async listModels(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch models");
      }

      const data = await response.json();
      return data.models?.map((m: any) => m.name) || [];
    } catch (error) {
      throw new Error("Failed to list Ollama models");
    }
  }

  /**
   * Get the current model name
   */
  getModel(): string {
    return this.model;
  }

  /**
   * Get the base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}

export const ollamaService = new OllamaService();
