'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/auth-store';
import { useToastStore } from '@/store/toast-store';
import { Loader2, User, Mail, Shield, AlertCircle } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  role: z.string().readonly().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const user = useAuthStore((state) => state.user);
  const { updateProfile, isUpdatingProfile } = useAuth();
  const { toast } = useToastStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'USER',
    },
  });

  // Sync state if user changes
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        role: user.role,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    setErrorMessage(null);
    try {
      await updateProfile({ name: data.name, email: data.email });
      toast('Profile updated successfully!', 'success');
      reset(data); // reset form dirty state
    } catch (err) {
      const apiError = err as { response?: { data?: { error?: { message?: string } } } };
      const msg =
        apiError.response?.data?.error?.message || 'Failed to update profile. Please try again.';
      setErrorMessage(msg);
      toast(msg, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm font-semibold text-rose-800 dark:text-rose-450">
            {errorMessage}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-1.5"
          >
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register('name')}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
            />
          </div>
          {errors.name && (
            <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email Address field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-1.5"
          >
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.email.message}</p>
          )}
        </div>

        {/* Account Role field (Disabled/Read-only) */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5"
          >
            Account Role
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Shield className="w-4 h-4" />
            </div>
            <input
              id="role"
              type="text"
              disabled
              {...register('role')}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-450 select-none text-sm font-medium"
            />
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
            For security, roles can only be updated by workspace administrators.
          </p>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-850">
        <button
          type="button"
          disabled={!isDirty || isUpdatingProfile}
          onClick={() => reset()}
          className="px-5 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Cancel Changes
        </button>
        <button
          type="submit"
          disabled={!isDirty || isUpdatingProfile}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-650 rounded-xl transition-all shadow-md shadow-emerald-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdatingProfile && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Settings
        </button>
      </div>
    </form>
  );
}
