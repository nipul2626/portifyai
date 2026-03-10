'use client';

export const dynamic = "force-dynamic";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Check, X } from 'lucide-react';

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link');
            return;
        }

        // Verify email
        fetch(`http://localhost:3001/auth/verify-email/${token}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setStatus('success');
                    setMessage('Email verified successfully!');
                    // Redirect to login after 2 seconds
                    setTimeout(() => {
                        router.push('/login');
                    }, 2000);
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Verification failed');
                }
            })
            .catch(() => {
                setStatus('error');
                setMessage('Failed to verify email. Please try again.');
            });
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-md w-full mx-4 text-center">
                {status === 'loading' && (
                    <>
                        <Loader2 className="w-16 h-16 animate-spin text-cyan-500 mx-auto mb-6" />
                        <h1 className="text-2xl font-bold text-white mb-2">Verifying your email...</h1>
                        <p className="text-slate-400">Please wait a moment</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Check className="w-10 h-10 text-green-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">{message}</h1>
                        <p className="text-slate-400 mb-6">Redirecting to login...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
                            <X className="w-10 h-10 text-red-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Verification Failed</h1>
                        <p className="text-red-400 mb-6">{message}</p>
                        <button
                            onClick={() => router.push('/login')}
                            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium transition-colors"
                        >
                            Go to Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}