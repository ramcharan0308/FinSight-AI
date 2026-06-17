'use client';

import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import {
  AlertCircle,
  ArrowRight,
  Mail,
  Lock,
  Loader2,
  LayoutDashboard,
  Copy,
  Check,
  PlayCircle,
} from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const DEMO_EMAIL = 'test@finsight.ai';
const DEMO_PASSWORD = 'Test@123456';

export default function LoginPage() {
  const { login, isLoggingIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [demoPrefilled, setDemoPrefilled] = useState(false);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMessage(null);
    try {
      await login({ email: data.email, password: data.password });
    } catch (err) {
      const apiError = err as { response?: { data?: { error?: { message?: string } } } };
      setErrorMessage(
        apiError.response?.data?.error?.message || 'Invalid email or password credentials.',
      );
    }
  };

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(DEMO_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPassword = async () => {
    await navigator.clipboard.writeText(DEMO_PASSWORD);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  const handleExplorDemo = () => {
    setValue('email', DEMO_EMAIL);
    setValue('password', DEMO_PASSWORD);
    setErrorMessage(null);
    setDemoPrefilled(true);
    setTimeout(() => {
      document.getElementById('email')?.focus();
    }, 50);
  };

  const { ref: emailRegisterRef, ...emailRegisterRest } = register('email');

  return (
    <div className="w-full animate-scaleIn">
      {/* ── Page heading ───────────────────────────────────────── */}
      <div className="mb-7 space-y-2">
        <h2 className="font-sans text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Welcome back
        </h2>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Sign in to your account, or explore the platform with a demo account.
        </p>
      </div>

      {/* ── Demo Card ──────────────────────────────────────────── */}
      <div className="relative mb-5 overflow-hidden rounded-2xl border border-[#22D3A6]/20 bg-gradient-to-br from-[#22D3A6]/[0.07] via-transparent to-emerald-500/[0.03] p-5">
        {/* Decorative watermark */}
        <div className="pointer-events-none absolute right-4 top-4 opacity-[0.055]">
          <LayoutDashboard className="h-14 w-14 text-[#22D3A6]" />
        </div>

        {/* Header row: icon + label + tags */}
        <div className="mb-3 flex items-start gap-3">
          <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-[#22D3A6]/15 text-[#22D3A6]">
            <PlayCircle className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#22D3A6]">
                Explore Demo Data
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Transactions', 'Budgets', 'Analytics', 'AI Insights', 'AI Chat'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#22D3A6]/20 bg-[#22D3A6]/10 px-2 py-0.5 text-[9.5px] font-semibold text-[#22D3A6]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-1.5 text-[12px] font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Pre-configured with realistic transactions, budgets, analytics, and AI-generated
              financial insights.
            </p>
          </div>
        </div>

        {/* Credentials row + CTA — horizontal */}
        <div className="flex items-center gap-2.5">
          {/* Email chip */}
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 dark:border-slate-700/40 dark:bg-slate-900/60">
            <Mail className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
            <span className="min-w-0 flex-1 select-all truncate font-mono text-[11.5px] font-semibold text-slate-700 dark:text-slate-200">
              {DEMO_EMAIL}
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              title="Copy email"
              className="flex flex-shrink-0 cursor-pointer items-center gap-1 rounded-lg px-1.5 py-0.5 text-[10px] font-bold transition-all duration-200"
              style={{
                color: copiedEmail ? '#22D3A6' : '#94a3b8',
                background: copiedEmail ? 'rgba(34,211,166,0.1)' : 'transparent',
              }}
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3 w-3" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copy
                </>
              )}
            </button>
          </div>

          {/* Password chip */}
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 dark:border-slate-700/40 dark:bg-slate-900/60">
            <Lock className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
            <span className="min-w-0 flex-1 select-all truncate font-mono text-[11.5px] font-semibold text-slate-700 dark:text-slate-200">
              {DEMO_PASSWORD}
            </span>
            <button
              type="button"
              onClick={handleCopyPassword}
              title="Copy password"
              className="flex flex-shrink-0 cursor-pointer items-center gap-1 rounded-lg px-1.5 py-0.5 text-[10px] font-bold transition-all duration-200"
              style={{
                color: copiedPassword ? '#22D3A6' : '#94a3b8',
                background: copiedPassword ? 'rgba(34,211,166,0.1)' : 'transparent',
              }}
            >
              {copiedPassword ? (
                <>
                  <Check className="h-3 w-3" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copy
                </>
              )}
            </button>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={handleExplorDemo}
            className="flex flex-shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#22D3A6] to-emerald-400 px-4 py-2.5 text-[10.5px] font-black uppercase tracking-widest text-[#020B2D] shadow-md shadow-[#22D3A6]/15 transition-all duration-200 hover:from-[#1fb896] hover:to-emerald-500 hover:shadow-lg hover:shadow-[#22D3A6]/20 active:scale-[0.97]"
          >
            <PlayCircle className="h-3.5 w-3.5" />
            Explore Demo
          </button>
        </div>
      </div>

      {/* ── Divider ────────────────────────────────────────────── */}
      <div className="relative mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
          or sign in
        </span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* ── Login Form ─────────────────────────────────────────── */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Demo prefilled notice */}
        {demoPrefilled && !errorMessage && (
          <div className="flex items-start gap-3 rounded-2xl border border-[#22D3A6]/25 bg-[#22D3A6]/[0.07] px-4 py-3 animate-fadeIn">
            <PlayCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#22D3A6]" />
            <p className="text-xs font-semibold leading-relaxed text-slate-700 dark:text-slate-300">
              Demo credentials filled in. Click{' '}
              <span className="font-black text-slate-900 dark:text-white">
                &ldquo;Sign In&rdquo;
              </span>{' '}
              below to explore the platform.
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="flex items-start gap-3 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 dark:border-rose-900/30 dark:bg-rose-950/20 animate-fadeIn">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-500" />
            <div className="text-xs font-semibold leading-normal text-rose-800 dark:text-rose-400">
              {errorMessage}
            </div>
          </div>
        )}

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              {...emailRegisterRest}
              ref={(el) => {
                emailRegisterRef(el);
                (emailInputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
              }}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-emerald-500/10"
            />
          </div>
          {errors.email && (
            <p className="text-xs font-semibold text-rose-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register('password')}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-emerald-500/10"
            />
          </div>
          {errors.password && (
            <p className="text-xs font-semibold text-rose-500">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoggingIn}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-500/10 transition-all duration-200 hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg hover:shadow-emerald-500/15 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <p className="mt-7 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
        New to FinSight AI?{' '}
        <Link
          href="/register"
          className="font-bold text-emerald-500 underline decoration-emerald-500/30 underline-offset-4 transition-colors hover:text-emerald-600 hover:decoration-emerald-500"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
