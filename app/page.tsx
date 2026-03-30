import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl border-b border-sky-400/10 shadow-[0_0_30px_rgba(125,211,252,0.05)]">
        <div className="flex justify-between items-center px-8 h-16 max-w-7xl mx-auto font-['Inter'] antialiased text-sm font-medium tracking-tight">
          <div className="text-xl font-semibold tracking-tighter text-sky-300">Glacier AI</div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-sky-300 border-b-2 border-sky-300 pb-1" href="#">How it Works</a>
            <a className="text-slate-400 hover:text-sky-200 transition-colors" href="#">Features</a>
            <a className="text-slate-400 hover:text-sky-200 transition-colors" href="#">Security</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/analyze" className="bg-primary-container text-sky-300 px-5 py-2 rounded-full hover:bg-sky-400/10 hover:backdrop-blur-lg transition-all duration-300 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-[900px] mx-auto px-6 text-center mb-32">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent leading-tight">
            Fix Your Resume Before Recruiters Reject It
          </h1>
          <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed">
            Get instant AI-powered feedback, ATS optimization tips, and rewritten bullet points in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Link href="/analyze" className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-bold shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(125,211,252,0.4)] transition-all duration-300 hover:scale-105 active:scale-95">
              Analyze Your Resume
            </Link>
            <button className="px-8 py-4 rounded-full text-on-surface font-medium hover:bg-white/5 transition-colors duration-200">
              No signup required
            </button>
          </div>
          {/* Visual Mockup */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-tertiary rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative glass-elevated rounded-xl p-8 aspect-video flex flex-col items-start overflow-hidden">
              <div className="flex items-center gap-4 mb-8 w-full border-b border-white/5 pb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white uppercase tracking-widest">Analysis Report</div>
                  <div className="text-xs text-on-surface-variant">Resume_John_Doe_2024.pdf</div>
                </div>
                <div className="ml-auto flex gap-2">
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">ATS OPTIMIZED</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 w-full text-left">
                <div className="space-y-4">
                  <div className="h-2 w-2/3 bg-white/10 rounded"></div>
                  <div className="h-32 glass-card rounded-lg p-4 flex flex-col justify-between">
                    <span className="text-3xl font-bold text-primary">84%</span>
                    <span className="text-[10px] text-on-surface-variant">Overall Strength Score</span>
                  </div>
                </div>
                <div className="col-span-2 space-y-4">
                  <div className="h-2 w-1/2 bg-white/10 rounded"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-white/5 rounded-full w-full relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-primary w-3/4"></div>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full w-full relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-tertiary w-1/2"></div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-sky-400/5 border border-sky-400/10 text-xs text-sky-200">
                    <span className="font-bold">Suggestion:</span> Quantify your impact in the "Product Manager" role.
                  </div>
                </div>
              </div>
            </div>
            <img className="hidden" alt="high-tech glassmorphic dashboard interface for resume analysis with neon light accents and deep navy background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD-rrAF0D9cSt7u-3SrlswWfOVEWT7qMBErlgmvO2_Lyd3yZm-moHW4UHObe4jCGGtvPF8Pn9jgQNr_sfpXNeur85HVspG3qN2SPlxz80KDG-WRsJ_605iAZTHGThNLZ6H11lIRBDKu0J161R4MjwAVzeDFzoveidUyffcJ7rg65wIpGauQi0woYYFgwQrv-8X8QX4OKcViVRtceoEml9hZO4XpouonQgcqmE_iy4qiq9LI8_lzToi3BdlqFFJEkzTYCYK7byWL2Kj"/>
          </div>
        </section>

        {/* Problem Section */}
        <section className="max-w-[900px] mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6 space-y-4">
              <div className="text-4xl font-extrabold text-primary tracking-tighter">95%</div>
              <p className="text-on-surface-variant text-sm font-medium leading-relaxed">of resumes get rejected before a human reads them</p>
            </div>
            <div className="text-center p-6 space-y-4">
              <div className="text-4xl font-extrabold text-tertiary tracking-tighter">Weak</div>
              <p className="text-on-surface-variant text-sm font-medium leading-relaxed">bullet points reduce your interview chances significantly</p>
            </div>
            <div className="text-center p-6 space-y-4">
              <div className="text-4xl font-extrabold text-white tracking-tighter">Messy</div>
              <p className="text-on-surface-variant text-sm font-medium leading-relaxed">inconsistent formatting hurts your professional brand</p>
            </div>
          </div>
        </section>

        {/* Solution Section (How it Works) */}
        <section className="max-w-[900px] mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold text-center mb-16">Three Steps to Excellence</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative p-8 glass-card rounded-xl text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-primary">upload_file</span>
              </div>
              <h3 className="font-bold mb-4">Upload Resume</h3>
              <p className="text-on-surface-variant text-sm">Simply drop your PDF or DOCX file into our secure analyzer.</p>
            </div>
            <div className="relative p-8 glass-card rounded-xl text-center">
              <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-tertiary">psychology</span>
              </div>
              <h3 className="font-bold mb-4">AI Analysis</h3>
              <p className="text-on-surface-variant text-sm">Our neural engine scans for ATS compatibility and clarity.</p>
            </div>
            <div className="relative p-8 glass-card rounded-xl text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-secondary">auto_awesome</span>
              </div>
              <h3 className="font-bold mb-4">Get Improvements</h3>
              <p className="text-on-surface-variant text-sm">Download a tailored list of edits to land the interview.</p>
            </div>
          </div>
        </section>

        {/* Features Section (Bento) */}
        <section className="max-w-[900px] mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-10 rounded-xl space-y-4 hover:border-primary/30 transition-colors">
              <span className="material-symbols-outlined text-primary text-3xl">query_stats</span>
              <h4 className="text-xl font-bold">Instant Overall Feedback</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Receive a comprehensive score based on real hiring criteria used by Fortune 500 companies.</p>
            </div>
            <div className="glass-card p-10 rounded-xl space-y-4 hover:border-tertiary/30 transition-colors">
              <span className="material-symbols-outlined text-tertiary text-3xl">edit_note</span>
              <h4 className="text-xl font-bold">Bullet Point Rewrites</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Turn passive duties into impact-driven achievements using the Google XYZ formula automatically.</p>
            </div>
            <div className="glass-card p-10 rounded-xl space-y-4 hover:border-secondary/30 transition-colors">
              <span className="material-symbols-outlined text-secondary text-3xl">robot_2</span>
              <h4 className="text-xl font-bold">ATS Optimization</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Identify missing keywords and formatting errors that prevent systems from reading your data.</p>
            </div>
            <div className="glass-card p-10 rounded-xl space-y-4 hover:border-white/30 transition-colors">
              <span className="material-symbols-outlined text-white text-3xl">badge</span>
              <h4 className="text-xl font-bold">Summary Enhancement</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Craft a compelling hook that keeps recruiters reading beyond the first six seconds.</p>
            </div>
          </div>
        </section>

        {/* Demo Preview (Before vs After) */}
        <section className="max-w-[900px] mx-auto px-6 py-24">
          <div className="glass-elevated rounded-2xl overflow-hidden border border-white/5">
            <div className="grid md:grid-cols-2">
              <div className="p-12 border-b md:border-b-0 md:border-r border-white/5 bg-black/20">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Before</div>
                <p className="text-slate-400 italic text-lg leading-relaxed">
                  "Responsible for managing the social media accounts and growing the following."
                </p>
              </div>
              <div className="p-12 bg-sky-400/5">
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-6">After (Glacier AI)</div>
                <p className="text-white text-lg font-medium leading-relaxed">
                  "Engineered a <span className="text-primary font-bold">data-driven content strategy</span> that scaled social following by <span className="text-primary font-bold">140% in 6 months</span>, resulting in <span className="text-primary font-bold">$50k extra revenue</span>."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="max-w-[900px] mx-auto px-6 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
            <span className="text-xs text-on-surface-variant font-medium">Built for students and professionals. No data stored, privacy-first.</span>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-[900px] mx-auto px-6 py-32">
          <div className="relative glass-elevated rounded-3xl p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
            <h2 className="text-4xl font-bold mb-8 relative z-10">Start improving your resume in seconds</h2>
            <Link href="/analyze" className="inline-block relative z-10 px-12 py-5 rounded-full bg-primary text-slate-950 font-extrabold text-lg shadow-[0_0_50px_rgba(125,211,252,0.4)] hover:shadow-[0_0_70px_rgba(125,211,252,0.6)] transition-all duration-300 hover:scale-105 active:scale-95">
              Analyze Your Resume Now
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 w-full py-12 border-t border-sky-400/5 font-['Inter'] text-xs text-slate-500">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-4">
          <div className="text-slate-500">© 2024 Glacier AI Resume Analyzer. All rights reserved.</div>
          <div className="flex gap-8">
            <a className="text-slate-500 hover:text-sky-300 transition-colors duration-200 cursor-pointer" href="#">Privacy Policy</a>
            <a className="text-slate-500 hover:text-sky-300 transition-colors duration-200 cursor-pointer" href="#">Terms of Service</a>
            <a className="text-slate-500 hover:text-sky-300 transition-colors duration-200 cursor-pointer" href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </>
  );
}
