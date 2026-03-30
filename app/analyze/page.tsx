"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud, FileText, Loader2, CheckCircle2, AlertCircle, Copy, ArrowLeft, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

type AnalysisResult = {
  overallFeedback: string;
  bulletImprovements: { original: string; improved: string }[];
  atsOptimizationTips: string[];
  rewrittenSummary: string;
};

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        setFile(null);
        return;
      }
      if (selected.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit.");
        setFile(null);
        return;
      }
      setFile(selected);
      setError(null);
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      if (dropped.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        setFile(null);
        return;
      }
      if (dropped.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit.");
        setFile(null);
        return;
      }
      setFile(dropped);
      setError(null);
      setResult(null);
    }
  };

  const extractTextFromPDF = async (pdfFile: File): Promise<string> => {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`;

    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(" ");
      fullText += pageText + "\n";
    }

    return fullText.trim();
  };

  const handleAnalyze = async () => {
    if (!file) return;

    try {
      setIsExtracting(true);
      setError(null);
      const text = await extractTextFromPDF(file);

      if (!text) {
        throw new Error("Could not extract any text from the PDF. It might be an image-based PDF.");
      }

      setIsExtracting(false);
      setIsAnalyzing(true);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to analyze resume.");
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsExtracting(false);
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      <div className="absolute top-0 left-0 w-full h-96 bg-sky-900/10 blur-[100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 -ml-4 text-sky-400">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-sky-50">Resume Analyzer</h1>
          <p className="text-slate-400 mt-2">Upload your resume to get AI-powered feedback.</p>
        </div>

        {!result ? (
          <GlassCard className="p-8 md:p-12 text-center">
            <div
              className={`border-2 border-dashed rounded-xl p-12 transition-colors ${
                file ? "border-sky-400/50 bg-sky-400/5" : "border-slate-700 hover:border-sky-400/30 hover:bg-sky-400/5"
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="application/pdf"
                className="hidden"
              />
              
              {file ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-sky-100">{file.name}</p>
                    <p className="text-sm text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="mt-2"
                  >
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-slate-200">Click or drag PDF here</p>
                    <p className="text-sm text-slate-400 mt-1">Maximum file size 5MB</p>
                  </div>
                </div>
              )}
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3 text-left"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8">
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={!file || isExtracting || isAnalyzing}
                className="w-full md:w-auto min-w-[200px]"
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Extracting Text...
                  </>
                ) : isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          </GlassCard>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-sky-100 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                Analysis Complete
              </h2>
              <Button variant="outline" onClick={() => setResult(null)}>
                Analyze Another
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h3 className="text-lg font-medium text-sky-300 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Overall Feedback
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {result.overallFeedback}
                </p>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-sky-300 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Professional Summary
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(result.rewrittenSummary)}
                    className="h-8 px-2 text-xs"
                  >
                    {copied ? "Copied!" : <><Copy className="w-3 h-3 mr-1" /> Copy</>}
                  </Button>
                </div>
                <p className="text-slate-300 leading-relaxed text-sm italic border-l-2 border-sky-500/30 pl-4">
                  {result.rewrittenSummary}
                </p>
              </GlassCard>

              <GlassCard className="p-6 md:col-span-2">
                <h3 className="text-lg font-medium text-sky-300 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Bullet Point Improvements
                </h3>
                <div className="space-y-4">
                  {result.bulletImprovements.map((bullet, idx) => (
                    <div key={idx} className="grid md:grid-cols-2 gap-4 p-4 rounded-lg bg-sky-950/20 border border-sky-900/30">
                      <div>
                        <span className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 block">Original</span>
                        <p className="text-sm text-slate-400">{bullet.original}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 block">Improved</span>
                        <p className="text-sm text-slate-200">{bullet.improved}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6 md:col-span-2">
                <h3 className="text-lg font-medium text-sky-300 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  ATS Optimization Tips
                </h3>
                <ul className="space-y-3">
                  {result.atsOptimizationTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
