import React from 'react';
import { TrendingUp, Sparkles, ShieldCheck, Zap, BarChart3, Brain } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950/40 selection:bg-indigo-500/25 selection:text-indigo-900 transition-colors duration-300 lg:grid lg:grid-cols-[44%_56%]">
      {/* ── Left: Auth Form Panel ──────────────────────────────── */}
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 xl:px-16 bg-white dark:bg-slate-900 border-r border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-slate-200/10 dark:shadow-none animate-fadeIn">
        <div className="w-full">
          {/* Logo */}
          <div className="mb-9 flex items-center gap-3 group select-none">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-650 via-indigo-500 to-indigo-400 bg-indigo-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all duration-300">
              <TrendingUp className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent tracking-tight">
                FinSight AI
              </span>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest leading-none text-indigo-600 dark:text-indigo-400">
                WEALTH ENGINE
              </p>
            </div>
          </div>

          {children}
        </div>
      </div>

      {/* ── Right: Hero / Marketing Panel ─────────────────────── */}
      <div className="hidden lg:flex relative bg-slate-950 overflow-hidden flex-col">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950 to-indigo-950/40" />

        {/* Ambient glows */}
        <div className="absolute top-1/3 right-1/3 w-[420px] h-[420px] rounded-full bg-indigo-500/6 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[320px] h-[320px] rounded-full bg-indigo-500/4 blur-[80px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12 xl:p-16">
          {/* Top badge */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-400 backdrop-blur-sm select-none">
              <Sparkles className="h-3.5 w-3.5" />
              Next-gen Intelligence Platform
            </span>
          </div>

          {/* Main hero copy */}
          <div className="space-y-5">
            <h2 className="font-sans text-4xl font-extrabold leading-[1.12] tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.2)] xl:text-[2.6rem]">
              Intelligent wealth
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
                intelligence.
              </span>
            </h2>
            <p className="max-w-sm text-base font-medium leading-relaxed text-slate-400">
              Consolidate ledger entries, track categories dynamically, and chat with your
              personalized AI wealth advisor in one streamlined cockpit.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                {
                  icon: ShieldCheck,
                  color: 'text-indigo-400',
                  title: 'Bank-grade Security',
                  desc: 'Encrypted transaction streams.',
                },
                {
                  icon: Zap,
                  color: 'text-indigo-400',
                  title: 'Real-time Budgeting',
                  desc: 'Automated warning thresholds.',
                },
                {
                  icon: BarChart3,
                  color: 'text-indigo-400',
                  title: 'Smart Analytics',
                  desc: 'Category breakdown & trends.',
                },
                {
                  icon: Brain,
                  color: 'text-indigo-400',
                  title: 'AI Financial Advisor',
                  desc: 'Contextual Groq-powered chat.',
                },
              ].map(({ icon: Icon, color, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-2.5 rounded-2xl border border-white/5 bg-white/4 p-3 backdrop-blur-sm"
                >
                  <Icon className={`mt-0.5 h-4 w-4 flex-shrink-0 ${color}`} />
                  <div>
                    <h4 className="text-sm font-bold leading-snug text-white">{title}</h4>
                    <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/5 pt-6 text-xs font-semibold text-slate-600">
            FinSight AI — Version 1.2.0
          </div>
        </div>
      </div>
    </main>
  );
}
