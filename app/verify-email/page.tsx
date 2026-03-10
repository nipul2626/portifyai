'use client';

import { Suspense } from "react";
import VerifyEmailContent from "./verify-email-content";
import { Loader2 } from "lucide-react";

function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Loader2 className="w-16 h-16 animate-spin text-cyan-500" />
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<Loading />}>
            <VerifyEmailContent />
        </Suspense>
    );
}