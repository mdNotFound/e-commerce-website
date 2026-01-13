import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const AnimatedText = ({ 
  text, 
  className, 
  delay = 0, 
  gradient = false,
  staggerDelay = 0.03,
  as: Component = 'h1' 
}) => {
  const words = text.split(' ')
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay * 10,
        delayChildren: delay,
      }
    }
  }
  
  const wordVariants = {
    hidden: { 
      y: '100%',
      opacity: 0,
      rotateX: -45,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  }
  
  return (
    <Component className={cn('flex flex-wrap justify-center gap-x-[0.25em]', className)}>
      <motion.span
        className="flex flex-wrap justify-center gap-x-[0.25em]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block perspective-1000">
            <motion.span
              className={cn(
                'inline-block',
                gradient && 'bg-gradient-to-r from-cream via-ember to-cream bg-clip-text text-transparent bg-[length:200%_100%]'
              )}
              variants={wordVariants}
              style={gradient ? {
                backgroundSize: '200% 100%',
                animation: 'gradient-shift 3s ease infinite',
              } : undefined}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
      
      {gradient && (
        <style>{`
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
      )}
    </Component>
  )
}

export default AnimatedText
