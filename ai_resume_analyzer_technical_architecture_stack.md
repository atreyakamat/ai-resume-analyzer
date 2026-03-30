# 🧰 Technical Architecture & Stack Document
## Product: AI Resume Analyzer (MVP with Ollama)

---

# 1. 🧭 Overview

This document defines the **end-to-end technical architecture**, tooling, and implementation details for the AI Resume Analyzer using:

- Local AI via **Ollama API**
- Optional Vision model support (for scanned resumes)
- Fast, minimal frontend (React + Tailwind)

Goal: Build a **fast, private, low-cost AI system** that can run locally or on a small server.

---

# 2. 🏗️ System Architecture

## High-Level Flow

1. User uploads PDF
2. Frontend extracts or sends file
3. Backend processes file
4. If text-based → NLP model
5. If scanned → Vision model
6. Ollama processes prompt
7. Structured response returned
8. UI renders output

---

## Architecture Type

- Frontend: SPA (React)
- Backend: Lightweight API (Node.js / Express or serverless)
- AI Layer: Ollama (local inference server)

---

# 3. 🧰 Tech Stack Breakdown

## 3.1 Frontend

- React (Vite preferred for speed)
- Tailwind CSS (UI styling)
- Framer Motion (animations)
- pdfjs-dist (PDF parsing)

### Responsibilities:
- File upload
- Basic text extraction
- UI rendering
- API communication

---

## 3.2 Backend

- Node.js
- Express.js (or lightweight serverless function)

### Responsibilities:
- Accept resume data
- Detect file type (text vs image)
- Route to correct AI model
- Format prompt
- Call Ollama API
- Return structured response

---

## 3.3 AI Layer (Ollama)

Ollama runs locally and exposes an API.

### Base URL:
http://localhost:11434

---

# 4. 🤖 Model Strategy

## 4.1 Text Model (Primary)

Used for:
- Normal resumes (text-based PDFs)

### Recommended Models:
- llama3
- mistral
- phi3 (lightweight)

### Example Pull:

```
ollama pull llama3
```

---

## 4.2 Vision Model (IMPORTANT)

Used for:
- Scanned resumes
- Image-based PDFs

### Recommended Models:
- llava
- bakllava

### Example Pull:

```
ollama pull llava
```

---

## Model Selection Logic

IF extracted text length > threshold → use text model
ELSE → fallback to vision model

---

# 5. 🔌 Ollama API Integration

## 5.1 Text Model API Call

Endpoint:
POST /api/generate

Example:

```
POST http://localhost:11434/api/generate

{
  "model": "llama3",
  "prompt": "<formatted prompt>",
  "stream": false
}
```

---

## 5.2 Vision Model API Call

Used when PDF has no extractable text

```
POST http://localhost:11434/api/generate

{
  "model": "llava",
  "prompt": "Analyze this resume image...",
  "images": ["<base64_image>"]
}
```

---

# 6. 📄 Resume Processing Pipeline

## Step 1: Upload
- Receive PDF

## Step 2: Extraction
- Use pdfjs
- Extract text

## Step 3: Decision

IF text exists:
→ Send to text model

ELSE:
→ Convert PDF → image
→ Send to vision model

---

# 7. 🧠 Prompt Engineering Layer

## Standard Prompt Template

You are an expert resume reviewer and ATS optimization specialist.

Analyze the resume and provide:
1. Overall feedback
2. Bullet improvements
3. ATS tips
4. Rewritten summary

Keep output structured.

---

## Vision Prompt Variant

You are analyzing a resume image.
Extract content and provide improvements.

---

# 8. 📦 API Design

## POST /analyze

### Request:
- file OR text

### Response:

{
  "overall": "...",
  "bullets": "...",
  "ats": "...",
  "summary": "..."
}

---

# 9. ⚡ Performance Considerations

- Use lightweight models for speed
- Limit token size
- Cache results (optional)

---

# 10. 🔐 Security

- No permanent storage
- Process in memory
- Sanitize inputs

---

# 11. 🧪 Error Handling

- Ollama not running → show error
- Model not found → fallback model
- Empty response → retry

---

# 12. 🚀 Deployment Options

## Local Dev
- Ollama local
- React dev server

## Production
- VPS with Ollama
- Dockerized backend

---

# 13. 🐳 Optional Docker Setup

- Ollama container
- Backend container
- Nginx reverse proxy

---

# 14. 📈 Future Scaling

- Replace Ollama with cloud LLM
- Add queue system
- Add user accounts

---

# 15. ✅ Final Principle

"Keep AI local, fast, and structured — optimize for demo + real usability."