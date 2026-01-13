import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils'

const ParallaxImage = ({ 
  src, 
  alt, 
  className,
  speed = 0.5,
  scale = true,
  overlay = true 
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed])
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
  
  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="w-full h-full"
        style={{ 
          y,
          scale: scale ? scaleValue : 1,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  )
}

export default ParallaxImage
