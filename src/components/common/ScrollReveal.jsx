import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useInView } from '../../lib/hooks'

const ScrollReveal = ({ 
  children, 
  className,
  delay = 0,
  duration = 0.8,
  direction = 'up', // up, down, left, right, none
  distance = 40,
  scale = false,
  blur = false,
  once = true,
  threshold = 0.1,
}) => {
  const { ref, isInView } = useInView({ threshold, repeat: !once })
  
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance }
      case 'down': return { y: -distance }
      case 'left': return { x: distance }
      case 'right': return { x: -distance }
      default: return {}
    }
  }
  
  const variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
      scale: scale ? 0.95 : 1,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
