<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI Resume Analyzer

A modern web application that analyzes resumes using **local AI powered by Ollama**. Get instant feedback on your resume's strengths, weaknesses, ATS optimization tips, and improved bullet points - all while keeping your data private.

## ✨ Features

- 📄 **PDF Resume Upload** - Drag & drop or click to upload
- 🤖 **Local AI Analysis** - Uses Ollama with gemma3:1b model (privacy-first, no data sent to external APIs)
- 📊 **Comprehensive Feedback** - Overall assessment, bullet point improvements, ATS tips, and rewritten summaries
- 🎨 **Modern UI** - Built with Next.js, Tailwind CSS, and Framer Motion
- 🔒 **Privacy-First** - All processing happens locally, no data is stored

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v18 or higher)
2. **Ollama** - Install from [ollama.com](https://ollama.com)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/atreyakamat/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Ollama:**
   ```bash
   # Install Ollama if you haven't already (https://ollama.com)

   # Pull the gemma3:1b model
   ollama pull gemma3:1b

   # Start Ollama (it runs on http://localhost:11434 by default)
   ollama serve
   ```

4. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` if you need to change the default settings:
   ```env
   OLLAMA_BASE_URL="http://localhost:11434"
   OLLAMA_MODEL="gemma3:1b"
   APP_URL="http://localhost:3000"
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How It Works

1. **Upload Resume** - Upload your resume in PDF format (max 5MB)
2. **Extract Text** - The app extracts text from your PDF using pdf.js
3. **AI Analysis** - Ollama (with gemma3:1b) analyzes your resume locally
4. **Get Results** - Receive structured feedback in four key areas:
   - Overall Feedback
   - Bullet Point Improvements
   - ATS Optimization Tips
   - Rewritten Professional Summary

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **pdf.js** - PDF parsing

### AI Integration
- **Ollama** - Local AI inference
- **gemma3:1b** - Lightweight, fast language model (1B parameters)

### Alternative Models

You can use other Ollama models by changing the `OLLAMA_MODEL` environment variable:

```env
# Lightweight options (faster, lower resource usage)
OLLAMA_MODEL="gemma3:1b"      # Default - 1B parameters
OLLAMA_MODEL="phi3"           # 3.8B parameters

# More powerful options (slower, better quality)
OLLAMA_MODEL="llama3"         # 8B parameters
OLLAMA_MODEL="mistral"        # 7B parameters
```

Pull any model with:
```bash
ollama pull <model-name>
```

## 📁 Project Structure

```
ai-resume-analyzer/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # API route for resume analysis
│   ├── analyze/
│   │   └── page.tsx              # Main analyzer page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/
│   └── ui/                       # Reusable UI components
├── lib/
│   ├── ollama.ts                 # Ollama service integration
│   └── utils.ts                  # Utility functions
├── hooks/                        # Custom React hooks
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🔧 Configuration

### Ollama Configuration

The app uses these environment variables for Ollama configuration:

- `OLLAMA_BASE_URL` - Base URL for Ollama API (default: `http://localhost:11434`)
- `OLLAMA_MODEL` - Model to use for analysis (default: `gemma3:1b`)

### Production Deployment

For production deployment with Ollama:

1. Install Ollama on your server
2. Set up Ollama as a service
3. Update `OLLAMA_BASE_URL` to point to your Ollama server
4. Ensure the model is pulled on the server
5. Deploy your Next.js app as usual

## 📝 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run clean    # Clean Next.js cache
```

### Adding New Features

1. Frontend changes go in `app/` or `components/`
2. API routes go in `app/api/`
3. Utility functions go in `lib/`
4. Update the Ollama service in `lib/ollama.ts` for AI-related changes

## 🐛 Troubleshooting

### Ollama Connection Issues

If you see "Ollama is not running" error:

1. Make sure Ollama is installed: [ollama.com](https://ollama.com)
2. Start Ollama: `ollama serve`
3. Verify it's running: `curl http://localhost:11434/api/tags`
4. Check if the model is pulled: `ollama list`
5. Pull the model if needed: `ollama pull gemma3:1b`

### PDF Extraction Issues

If text extraction fails:
- Ensure the PDF is text-based (not a scanned image)
- Check PDF file size (must be < 5MB)
- Try a different PDF

### Model Performance

If the model is too slow:
- Switch to a smaller model (gemma3:1b is recommended)
- Increase available RAM
- Consider GPU acceleration for Ollama

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Ollama](https://ollama.com)
- Icons by [Lucide](https://lucide.dev)
- Design inspired by modern SaaS applications

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Ollama and Next.js
