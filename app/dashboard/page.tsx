'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AnimatedSidebar } from '@/components/animated-sidebar'
import { AnimatedStatsCard } from '@/components/animated-stats-card'
import { AnimatedPortfolioGrid } from '@/components/animated-portfolio-grid'
import { AIAssistantChat } from '@/components/ai-assistant-chat'
import { TrendingUp, Users, Eye, Award, Plus, Upload, Zap, Loader2 } from 'lucide-react'
import { authService, type User } from '@/app/services/api/auth'

export default function DashboardPage() {

  const router = useRouter()

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {

    try {

      if (!authService.isAuthenticated()) {
        router.push('/login')
        return
      }

      const response = await authService.getCurrentUser()
      setUser(response.data.user)

    } catch (error) {

      console.error(error)
      authService.logout()
      router.push('/login')

    } finally {

      setIsLoading(false)

    }

  }

  const handleLogout = async () => {

    try {

      await authService.logout()
      router.push('/login')

    } catch {

      authService.logout()
      router.push('/login')

    }

  }

  if (isLoading) {

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">

          <div className="text-center">

            <Loader2 className="w-12 h-12 animate-spin text-cyan-DEFAULT mx-auto mb-4" />

            <p className="text-slate-400">
              Loading dashboard...
            </p>

          </div>

        </div>
    )

  }

  const stats = [

    { title: 'Total Projects', value: 24, icon: Award, color: 'blue' as const, trend: 12 },
    { title: 'Total Views', value: 15420, icon: Eye, color: 'purple' as const, trend: 8 },
    { title: 'Followers', value: 1234, icon: Users, color: 'green' as const, trend: 15 },
    { title: 'Engagement', value: 89, suffix: '%', icon: TrendingUp, color: 'orange' as const, trend: 5 }

  ]

  const activityColors = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500'
  }

  return (

      <div className="relative min-h-screen bg-slate-950">

        <AnimatedSidebar
            onCollapse={setSidebarCollapsed}
            onLogout={() => handleLogout()}
        />

        <motion.main
            animate={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen p-8"
        >

          {/* HEADER */}

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋
            </h1>

            <p className="text-slate-400">
              Here's what's happening with your portfolio
            </p>

            {user && (
                <p className="text-cyan-400 text-sm mt-2">
                  {user.email}
                </p>
            )}

          </div>


          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {stats.map((stat, index) => (

                <AnimatedStatsCard
                    key={stat.title}
                    {...stat}
                    delay={index * 0.1}
                />

            ))}

          </div>


          {/* AI INSIGHTS */}

          <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">

            <div className="flex gap-4 items-start">

              <div className="p-3 bg-blue-600 rounded-lg">
                <Zap className="text-white w-6 h-6" />
              </div>

              <div>

                <h3 className="text-xl font-bold text-white mb-2">
                  AI Insights
                </h3>

                <p className="text-slate-400 mb-4">
                  Your portfolio performance increased by 23% this week.
                </p>

                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white">
                  View Report
                </button>

              </div>

            </div>

          </div>


          {/* PROJECTS */}

          <div className="mb-8">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-white">
                Recent Projects
              </h2>

              <button className="text-blue-400 hover:text-blue-300">
                View All →
              </button>

            </div>

            <AnimatedPortfolioGrid />

          </div>


          {/* ACTIVITY */}

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">

            <h2 className="text-2xl font-bold text-white mb-6">
              Recent Activity
            </h2>

            <div className="space-y-4">

              {[
                { action: 'New follower', user: 'Sarah Johnson', time: '2 minutes ago', color: 'blue' },
                { action: 'Project liked', user: 'Mike Chen', time: '15 minutes ago', color: 'red' },
                { action: 'Comment received', user: 'Emma Davis', time: '1 hour ago', color: 'green' },
                { action: 'Profile viewed', user: 'Alex Thompson', time: '3 hours ago', color: 'purple' }
              ].map((activity, index) => (

                  <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5"
                  >

                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10">

                      <div className={`w-2 h-2 rounded-full ${activityColors[activity.color as keyof typeof activityColors]}`} />

                    </div>

                    <div className="flex-1">

                      <p className="text-white font-medium">
                        {activity.action}
                      </p>

                      <p className="text-slate-400 text-sm">
                        {activity.user}
                      </p>

                    </div>

                    <span className="text-slate-500 text-sm">
                  {activity.time}
                </span>

                  </div>

              ))}

            </div>

          </div>

        </motion.main>

        <AIAssistantChat />

      </div>

  )

}