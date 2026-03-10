'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth-layout';
import { AuthInput } from '@/components/auth-input';
import { Github, Mail, Loader2, Check } from 'lucide-react';
import { Linkedin } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { authService } from '@/app/services/api/auth';


function SocialButton({
                        icon: Icon,
                        label,
                        provider,
                        delay,
                      }: {
  icon: LucideIcon;
  label: string;
  provider: "google" | "github" | "linkedin";
  delay: number;
}) {
  const [clicked, setClicked] = useState(false);

  const handleOAuthLogin = () => {
    setClicked(true);
    window.location.href = `http://localhost:3001/auth/${provider}`;
  };

  return (
      <button
          onClick={handleOAuthLogin}
          className="w-full neu-card rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-200 group animate-fadeIn"
          style={{ animationDelay: `${delay}ms` }}
      >
        <Icon
            className={`w-5 h-5 transition-all duration-500 ${
                clicked ? "animate-spin" : "group-hover:scale-110"
            }`}
        />
        <span>{label}</span>
      </button>
  );
}
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setApiError('');

    // Validate
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // Call backend API
      const response = await authService.login({
        email,
        password,
      });

      console.log('Login successful:', response);

      // Show success state briefly
      setSuccess(true);

      // Redirect to dashboard after short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 800);

    } catch (error: any) {
      console.error('Login error:', error);

      // Handle API errors
      if (error.errors && Array.isArray(error.errors)) {
        // Validation errors from backend
        const backendErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          backendErrors[err.field] = err.message;
        });
        setErrors(backendErrors);
      } else {
        // General error
        setApiError(error.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <AuthLayout>
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 animate-fadeIn">
            <h1 className="text-4xl font-bold gradient-text mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Continue building amazing portfolios</p>
          </div>

          {/* Social buttons */}
          <div className="space-y-3 mb-6 animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <SocialButton
                icon={Github}
                label="Continue with GitHub"
                provider="github"
                delay={100}
            />

            <SocialButton
                icon={Mail}
                label="Continue with Google"
                provider="google"
                delay={180}
            />

            <SocialButton
                icon={Linkedin}
                label="Continue with LinkedIn"
                provider="linkedin"
                delay={260}
            />
          </div>

          {/* Divider */}
          <div className="relative mb-6 animate-fadeIn" style={{ animationDelay: '200ms' }}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">OR</span>
            </div>
          </div>

          {/* API Error Message */}
          {apiError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg animate-slideDown">
                <p className="text-red-400 text-sm text-center">{apiError}</p>
              </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn" style={{ animationDelay: '300ms' }}>
            <AuthInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  setErrors({});
                  setApiError('');
                }}
                error={errors.email}
                icon="email"
            />

            <AuthInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(value) => {
                  setPassword(value);
                  setErrors({});
                  setApiError('');
                }}
                error={errors.password}
                icon="lock"
            />

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-border bg-deep-card cursor-pointer"
                />
                <span className="text-foreground">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-cyan-DEFAULT hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <button
                type="submit"
                disabled={loading || success}
                className="w-full neu-card rounded-lg py-3 px-4 font-semibold text-foreground hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 mt-6 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-DEFAULT/0 via-cyan-DEFAULT/20 to-cyan-DEFAULT/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
              {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
              ) : success ? (
                  <>
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">Success!</span>
                  </>
              ) : (
                  'Sign In'
              )}
            </span>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-muted-foreground mt-6 animate-fadeIn" style={{ animationDelay: '400ms' }}>
            Don't have an account?{' '}
            <Link href="/signup" className="gradient-text hover:opacity-80 transition-opacity">
              Sign up
            </Link>
          </p>
        </div>
      </AuthLayout>
  );
}