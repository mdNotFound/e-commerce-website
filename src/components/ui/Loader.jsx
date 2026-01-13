import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  
  useEffect(() => {
    const duration = 2000
    const interval = 20
    const increment = 100 / (duration / interval)
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsExiting(true), 300)
          setTimeout(() => onComplete?.(), 1000)
          return 100
        }
        return next
      })
    }, interval)
    
    return () => clearInterval(timer)
  }, [onComplete])
  
  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245, 240, 232, 0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          {/* Logo */}
          <motion.div
            className="relative mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1 
              className="font-display font-bold text-5xl md:text-7xl text-cream tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              VOID<span className="text-ember">WEAR</span>
            </motion.h1>
            
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-ember to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%' }}
            />
          </motion.div>
          
          {/* Progress Bar */}
          <div className="w-48 md:w-64">
            <div className="h-px bg-ink-800 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-ember via-cream to-ember"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            
            {/* Percentage */}
            <motion.p
              className="text-center mt-4 font-body text-sm text-cream/40 tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
          
          {/* Tagline */}
          <motion.p
            className="absolute bottom-12 text-sm font-body text-cream/30 tracking-widest uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Elevate Your Everyday
          </motion.p>
          
          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-8 h-8 border-l border-t border-ink-800"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-8 h-8 border-r border-t border-ink-800"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-ink-800"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-ink-800"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader
