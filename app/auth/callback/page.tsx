'use client';

import { Suspense } from 'react';
import OAuthCallbackContent from './OAuthCallbackContent';
import { Loader2 } from 'lucide-react';

function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />
        </div>
    );
}

export default function OAuthCallbackPage() {
    return (
        <Suspense fallback={<Loading />}>
            <OAuthCallbackContent />
        </Suspense>
    );
}