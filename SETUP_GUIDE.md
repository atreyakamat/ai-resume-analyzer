# AI Resume Analyzer - Ollama Setup Guide

This guide will help you set up and run the AI Resume Analyzer with Ollama and the gemma3:1b model.

## Prerequisites

Before you begin, make sure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Ollama** - [Install from ollama.com](https://ollama.com)

## Step-by-Step Setup

### 1. Install Ollama

#### On macOS:
```bash
brew install ollama
```

#### On Linux:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

#### On Windows:
Download and run the installer from [ollama.com](https://ollama.com/download)

### 2. Start Ollama Service

```bash
# Start Ollama (it will run on http://localhost:11434)
ollama serve
```

Keep this terminal window open. Ollama needs to be running for the app to work.

### 3. Pull the gemma3:1b Model

In a new terminal window:

```bash
# Pull the gemma3:1b model (this will download ~1GB of data)
ollama pull gemma3:1b
```

**Alternative models you can use:**
- `gemma3:1b` - 1 billion parameters (fastest, lightweight)
- `phi3` - 3.8 billion parameters (good balance)
- `llama3` - 8 billion parameters (more powerful)
- `mistral` - 7 billion parameters (alternative to llama3)

### 4. Verify Installation

```bash
# List all available models
ollama list

# Test the model
ollama run gemma3:1b "Hello, how are you?"
```

### 5. Clone and Setup the Project

```bash
# Clone the repository
git clone https://github.com/atreyakamat/ai-resume-analyzer.git
cd ai-resume-analyzer

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### 6. Configure Environment Variables (Optional)

Edit `.env.local` if you need custom settings:

```env
# Default values (you can leave these as-is)
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_MODEL="gemma3:1b"
APP_URL="http://localhost:3000"
```

**When to modify:**
- Change `OLLAMA_BASE_URL` if Ollama is running on a different server
- Change `OLLAMA_MODEL` if you want to use a different model (e.g., "llama3")

### 7. Run the Application

```bash
# Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### 8. Build for Production (Optional)

```bash
# Build the production bundle
npm run build

# Start the production server
npm start
```

## Testing the Application

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. Click "Get Started" or "Analyze Your Resume"
3. Upload a PDF resume (max 5MB)
4. Click "Analyze Resume"
5. Wait for the AI to analyze your resume (usually 10-30 seconds)
6. Review the results:
   - Overall Feedback
   - Bullet Point Improvements
   - ATS Optimization Tips
   - Rewritten Summary

## Troubleshooting

### Problem: "Ollama is not running" error

**Solution:**
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# If not running, start it
ollama serve
```

### Problem: "Model not found" error

**Solution:**
```bash
# Pull the model
ollama pull gemma3:1b

# Verify it's installed
ollama list
```

### Problem: Analysis is very slow

**Solutions:**
1. Use a smaller model (gemma3:1b is already the smallest)
2. Ensure you have enough RAM (4GB minimum, 8GB recommended)
3. Close other applications to free up resources
4. Consider GPU acceleration:
   ```bash
   # Check GPU support
   ollama run gemma3:1b --gpu
   ```

### Problem: PDF text extraction fails

**Solutions:**
1. Make sure the PDF is text-based (not a scanned image)
2. Try a different PDF
3. Check the PDF file size (must be < 5MB)
4. Ensure the PDF is not password-protected

### Problem: Port 11434 already in use

**Solution:**
```bash
# Find the process using port 11434
lsof -i :11434

# Kill the process (replace PID with actual process ID)
kill -9 <PID>

# Or use a different port for Ollama
OLLAMA_HOST=0.0.0.0:11435 ollama serve
```

Then update `.env.local`:
```env
OLLAMA_BASE_URL="http://localhost:11435"
```

## Performance Optimization

### Hardware Recommendations

**Minimum:**
- 4GB RAM
- 2 CPU cores
- 5GB disk space

**Recommended:**
- 8GB+ RAM
- 4+ CPU cores
- 10GB disk space
- GPU (optional, but significantly faster)

### Speed Optimization Tips

1. **Use GPU acceleration** (if available):
   ```bash
   # NVIDIA GPU
   ollama run gemma3:1b --gpu
   ```

2. **Reduce model context window**:
   Modify `lib/ollama.ts` to add:
   ```typescript
   options: {
     num_ctx: 2048, // Smaller context = faster
     temperature: 0.7,
   }
   ```

3. **Use quantized models**:
   Some models have quantized versions that are faster

## Deployment to Production

### Option 1: Deploy with Ollama on the Same Server

1. Set up a VPS (e.g., DigitalOcean, AWS, GCP)
2. Install Ollama on the server
3. Pull the model: `ollama pull gemma3:1b`
4. Set up Ollama as a systemd service
5. Deploy the Next.js app
6. Configure environment variables to point to the server

### Option 2: Deploy with Remote Ollama

1. Deploy Ollama on a dedicated AI server
2. Deploy Next.js app on a separate server (e.g., Vercel, Netlify)
3. Update `OLLAMA_BASE_URL` to point to the Ollama server
4. Ensure network connectivity between servers

### Docker Deployment

Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama-data:/root/.ollama

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
      - OLLAMA_MODEL=gemma3:1b
    depends_on:
      - ollama

volumes:
  ollama-data:
```

## Model Comparison

| Model | Size | Speed | Quality | RAM Required |
|-------|------|-------|---------|--------------|
| gemma3:1b | 1B params | Fast | Good | 4GB |
| phi3 | 3.8B params | Medium | Better | 6GB |
| llama3 | 8B params | Slower | Best | 8GB |
| mistral | 7B params | Slower | Best | 8GB |

## Architecture Overview

```
User Browser
    ↓
Next.js Frontend (React + Tailwind)
    ↓
Next.js API Route (/api/analyze)
    ↓
Ollama Service (lib/ollama.ts)
    ↓
Ollama Server (localhost:11434)
    ↓
gemma3:1b Model
```

## Security Considerations

- All data stays local (privacy-first)
- No data is sent to external APIs
- Resume text is processed in memory only
- No persistent storage of resumes
- Ollama runs locally on your machine

## Getting Help

- **Documentation**: See [README.md](./README.md)
- **Issues**: [GitHub Issues](https://github.com/atreyakamat/ai-resume-analyzer/issues)
- **Ollama Docs**: [ollama.com/docs](https://ollama.com/docs)

## Next Steps

After successful setup:

1. Try analyzing a sample resume
2. Experiment with different models
3. Customize the prompt in `app/api/analyze/route.ts`
4. Modify the UI in `app/analyze/page.tsx`
5. Add new features from the PRD

Happy coding! 🚀
