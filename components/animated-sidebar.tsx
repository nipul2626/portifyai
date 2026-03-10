'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderOpen,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bell,
  Search
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FolderOpen, label: 'Projects', href: '/dashboard/projects' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

interface AnimatedSidebarProps {
  onCollapse: (collapsed: boolean) => void
  onLogout: () => void
}

export function AnimatedSidebar({ onCollapse, onLogout }: AnimatedSidebarProps) {

  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    const next = !isCollapsed
    setIsCollapsed(next)
    onCollapse(next)
  }

  const sidebarVariants = {
    expanded: {
      width: 280,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    collapsed: {
      width: 80,
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  }

  const contentVariants = {
    expanded: { opacity: 1, x: 0, transition: { delay: 0.1 } },
    collapsed: { opacity: 0, x: -20, transition: { duration: 0.1 } }
  }

  return (

      <motion.aside
          initial="expanded"
          animate={isCollapsed ? 'collapsed' : 'expanded'}
          variants={sidebarVariants}
          className="fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 border-r border-white/10 flex flex-col z-50"
      >

        {/* HEADER */}

        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">

          <AnimatePresence mode="wait">

            {!isCollapsed && (

                <motion.div
                    key="logo-text"
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="flex items-center gap-2"
                >

                  <motion.div
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>

                  <span className="text-xl font-bold text-white">
                Portfolio
              </span>

                </motion.div>

            )}

          </AnimatePresence>

          <motion.button
              onClick={toggleSidebar}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >

            {isCollapsed
                ? <ChevronRight className="w-5 h-5 text-slate-400" />
                : <ChevronLeft className="w-5 h-5 text-slate-400" />
            }

          </motion.button>

        </div>


        {/* SEARCH */}

        {!isCollapsed && (

            <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="px-4 py-4"
            >

              <div className="relative">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />

              </div>

            </motion.div>

        )}


        {/* NAVIGATION */}

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">

          {menuItems.map((item, index) => {

            const Icon = item.icon
            const isActive = pathname === item.href

            return (

                <Link key={item.href} href={item.href}>

                  <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all cursor-pointer relative overflow-hidden ${
                          isActive
                              ? 'bg-blue-500/20 text-white border border-blue-500/30'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                  >

                    {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"/>
                    )}

                    <Icon className="w-5 h-5 flex-shrink-0" />

                    <AnimatePresence mode="wait">

                      {!isCollapsed && (

                          <motion.span
                              variants={contentVariants}
                              initial="collapsed"
                              animate="expanded"
                              exit="collapsed"
                              className="font-medium whitespace-nowrap"
                          >
                            {item.label}
                          </motion.span>

                      )}

                    </AnimatePresence>

                  </motion.div>

                </Link>

            )

          })}

        </nav>


        {/* NOTIFICATIONS */}

        <div className="px-3 py-2">

          <div className={`flex items-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}>

            <div className="relative">

              <Bell className="w-5 h-5"/>

              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"/>

            </div>

            {!isCollapsed && (
                <span className="font-medium">
              Notifications
            </span>
            )}

          </div>

        </div>


        {/* USER PROFILE */}

        <div className="border-t border-white/10 p-3">

          <div className={`flex items-center gap-3 p-2 rounded-lg ${isCollapsed ? 'justify-center' : ''}`}>

            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>

            {!isCollapsed && (

                <div className="flex-1 min-w-0">

                  <div className="text-white font-medium text-sm truncate">
                    John Doe
                  </div>

                  <div className="text-slate-400 text-xs truncate">
                    john@example.com
                  </div>

                </div>

            )}

          </div>


          {/* LOGOUT */}

          <motion.button
              onClick={onLogout}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 transition-all w-full mt-2 ${
                  isCollapsed ? 'justify-center' : ''
              }`}
          >

            <LogOut className="w-5 h-5"/>

            {!isCollapsed && (
                <span className="font-medium">
              Logout
            </span>
            )}

          </motion.button>

        </div>

      </motion.aside>

  )

}