'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ProfileForm } from '@/components/settings/ProfileForm';
import { ThemeToggle } from '@/components/settings/ThemeToggle';
import { User, Palette } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <PageHeader
        title="Settings"
        description="Manage your account preferences, profile credentials, and user interface preferences."
      />

      {/* Main Settings Panel */}
      <div className="grid grid-cols-1 gap-8">
        {/* Profile Card Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-150 dark:border-slate-850 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-850">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-650 dark:text-indigo-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Personal Profile Details
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Update your identity details and primary email address.
              </p>
            </div>
          </div>

          <ProfileForm />
        </section>

        {/* Theme Card Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-150 dark:border-slate-850 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-850">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-650 dark:text-indigo-400">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Aesthetic Interface Customization
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Switch themes to customize your viewing experience.
              </p>
            </div>
          </div>

          <ThemeToggle />
        </section>
      </div>
    </div>
  );
}
