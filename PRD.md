# 📄 Product Requirements Document (PRD)

## Product: AI Resume Analyzer (MVP)

---

# 1. 🧭 Overview

## 1.1 Product Summary

AI Resume Analyzer is a web-based tool that allows users to upload their resumes (PDF format) and receive structured, AI-generated feedback to improve clarity, impact, and ATS (Applicant Tracking System) compatibility.

The goal is to provide **instant, actionable resume improvements** in under 30 seconds.

---

## 1.2 Objective

* Help users improve resume quality quickly
* Increase chances of passing ATS filters
* Provide measurable, rewritten improvements
* Create a demo-worthy, scalable SaaS foundation

---

## 1.3 Target Users

* Engineering students (primary)
* Fresh graduates
* Job seekers
* LinkedIn-focused professionals
* Freelancers building portfolios

---

## 1.4 Success Metrics (MVP)

* Time to result < 30 seconds
* 80%+ users understand output clearly
* 50%+ users copy or reuse suggestions
* Demo usability without explanation

---

# 2. 🧱 Scope Definition

## 2.1 In Scope (MVP)

### Core Features:

1. Resume Upload (PDF only)
2. Text extraction from PDF
3. AI-powered analysis
4. Structured output sections
5. Copy-to-clipboard functionality
6. Loading & feedback UI

---

## 2.2 Out of Scope (for now)

* Login / authentication
* Resume saving/history
* DOCX upload
* Multi-language support
* Payment system
* Real ATS integration

---

# 3. ⚙️ Functional Requirements

---

## 3.1 Resume Upload Module

### Requirements:

* Accept only `.pdf` files
* Max file size: 5MB
* Drag & drop + manual upload

### Validations:

* Show error if:

  * File not PDF
  * File too large
  * File empty

### UX Behavior:

* Show file name after upload
* Show remove/reset option

---

## 3.2 Resume Parsing Module

### Description:

Extract readable text from uploaded PDF

### Requirements:

* Use `pdfjs-dist`
* Extract all pages
* Merge into single string

### Edge Cases:

* Scanned PDFs (no text layer) → show error
* Empty extraction → fallback message

---

## 3.3 AI Analysis Engine

### Input:

* Extracted resume text

### Output:

Structured response with 4 sections:

---

### Required Output Format:

#### 1. Overall Feedback

* Strengths
* Weaknesses

#### 2. Bullet Improvements

* Identify weak bullets
* Rewrite with:

  * Action verbs
  * Quantifiable results

#### 3. ATS Optimization Tips

* Missing keywords
* Formatting suggestions
* Keyword density

#### 4. Rewritten Summary

* Professional summary rewrite
* Concise (3–4 lines)

---

### AI Prompt (Final Version)

```
You are an expert resume reviewer and ATS optimization specialist.

Analyze the following resume and provide:

1. Overall feedback (strengths + weaknesses)
2. Specific bullet point improvements (rewrite weak bullets with strong action verbs and measurable impact)
3. ATS optimization tips (keywords, formatting issues)
4. A rewritten professional summary

Keep it concise, practical, and impactful.

Resume:
{{resume_text}}
```

---

## 3.4 Results Display Module

### Layout:

Display results in **4 separate cards**

---

### Card 1: Overall Feedback

* Bullet format
* Highlight strengths vs weaknesses

---

### Card 2: Bullet Improvements

* Show original → improved version
* Use visual separation

---

### Card 3: ATS Tips

* Checklist style
* Short and actionable

---

### Card 4: Summary Rewrite

* Clean paragraph
* Copy-ready

---

### Additional Features:

* Copy button per section
* “Copied!” feedback
* Scrollable container

---

## 3.5 Loading & Feedback States

### States:

1. Idle
2. File Uploaded
3. Processing
4. Results Ready
5. Error

---

### Loading UX:

* Spinner or animated text
* Text: “Analyzing your resume…”

---

## 3.6 Error Handling

### Cases:

* No file uploaded
* Invalid file type
* PDF parsing failed
* API failure

### UX:

* Clear message
* Retry option

---

# 4. 🎨 UI / UX Requirements

---

## 4.1 Design Style

* Clean SaaS feel
* Dark mode preferred
* Glassmorphism optional
* Minimal distractions

---

## 4.2 Layout Structure

### Top Section:

* Title: “AI Resume Analyzer”
* Subtitle: “Improve your resume instantly with AI”

---

### Middle Section:

* Upload box
* Drag & drop area
* Analyze button

---

### Bottom Section:

* Results cards (stacked)

---

## 4.3 UI Components

* Upload Box
* Button (Primary CTA)
* Cards
* Copy Button
* Loader
* Toast/alert

---

## 4.4 UX Principles

* One-click flow
* No friction
* Clear hierarchy
* Fast feedback

---

# 5. 🧪 Non-Functional Requirements

---

## 5.1 Performance

* Response time < 30 seconds
* UI interactions < 100ms

---

## 5.2 Reliability

* Handle API failures gracefully
* Retry mechanism

---

## 5.3 Scalability (Future)

* Modular API layer
* Replaceable AI backend

---

## 5.4 Security

* Do not store resumes (MVP)
* Temporary processing only

---

# 6. 🧰 Tech Stack

---

## Frontend:

* React (Vite or Next.js)
* Tailwind CSS

---

## Backend (optional for MVP):

* Node.js / serverless function

---

## Libraries:

* pdfjs-dist (PDF parsing)
* Axios / Fetch (API calls)

---

## AI:

* OpenAI API

---

# 7. 🔁 User Flow

---

1. User opens app
2. Uploads resume
3. Clicks “Analyze”
4. System extracts text
5. Sends to AI
6. Receives structured response
7. Displays results
8. User copies improvements

---

# 8. ⏱️ Development Plan (3 Hours)

---

## Hour 1:

* UI setup
* File upload
* PDF parsing

---

## Hour 2:

* AI integration
* Prompt + response

---

## Hour 3:

* UI polish
* Loading states
* Copy buttons

---

# 9. 🚀 Future Enhancements

---

* Resume score (0–100)
* Job-role-based analysis
* Resume rewriting export
* DOCX support
* LinkedIn profile analyzer
* SaaS dashboard

---

# 10. 💡 Product Positioning

---

## Tagline:

“Fix your resume before recruiters reject it.”

---

## Value Proposition:

* Instant feedback
* Actionable improvements
* ATS-focused

---

## Differentiation:

* Structured output (not generic AI text)
* Copy-ready suggestions
* Fast + simple UX

---

# 11. ⚠️ Risks & Mitigation

---

| Risk               | Mitigation            |
| ------------------ | --------------------- |
| Poor AI output     | Refine prompt         |
| PDF parsing issues | Show fallback message |
| Slow response      | Optimize API usage    |
| Generic results    | Add structured format |

---

# 12. ✅ Definition of Done

---

* User uploads PDF successfully
* Resume text extracted correctly
* AI returns structured output
* All 4 sections visible
* Copy functionality works
* Loading & errors handled

---

# 13. 🔥 Demo Script

---

“Most resumes fail before reaching recruiters due to ATS filters. This tool analyzes your resume instantly and tells you exactly what to fix.”

---

# 14. 📌 Conclusion

This MVP focuses on **clarity, speed, and value delivery**. The goal is not perfection, but a **strong, demo-ready product** that can evolve into a monetizable SaaS.

---
