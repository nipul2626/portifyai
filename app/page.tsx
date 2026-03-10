'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { authService } from "@/app/services/api/auth"

import { ParticleBackground } from "@/components/particle-background"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TemplatesSection } from "@/components/templates-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {

    const router = useRouter()
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)

    useEffect(() => {
        checkAuthentication()
    }, [])

    const checkAuthentication = async () => {
        try {

            if (authService.isAuthenticated()) {

                await authService.getCurrentUser()

                router.push("/dashboard")

            } else {

                setIsCheckingAuth(false)

            }

        } catch (error) {

            authService.logout()
            setIsCheckingAuth(false)

        }
    }

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050510]">
                <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />
            </div>
        )
    }

    return (
        <main className="relative min-h-screen overflow-x-hidden bg-[#050510]">
            <ParticleBackground />

            <HeroSection />

            <div id="features">
                <FeaturesSection />
            </div>

            <div id="templates">
                <TemplatesSection />
            </div>

            <HowItWorksSection />

            <StatsSection />

            <TestimonialsSection />

            <CTASection />

            <Footer />
        </main>
    )
}