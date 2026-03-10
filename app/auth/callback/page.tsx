'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function OAuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const error = searchParams.get('error');

        if (error) {
            // OAuth failed
            router.push(`/login?error=${error}`);
            return;
        }

        if (accessToken) {
            // Store tokens
            localStorage.setItem('accessToken', accessToken);

            // Fetch user data
            fetch('http://localhost:3001/auth/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        localStorage.setItem('user', JSON.stringify(data.data.user));
                        router.push('/dashboard');
                    } else {
                        router.push('/login?error=auth_failed');
                    }
                })
                .catch(() => {
                    router.push('/login?error=server_error');
                });
        } else {
            router.push('/login');
        }
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-cyan-500 mx-auto mb-4" />
                <p className="text-slate-400">Completing authentication...</p>
            </div>
        </div>
    );
}