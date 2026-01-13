import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Button from '../ui/Button'
import AnimatedText from '../common/AnimatedText'

const Hero = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink"
    >
      {/* Background Video/Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink z-10" />
        <motion.img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1920&q=80"
          alt="Hero background"
          className="w-full h-full object-cover"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Grain overlay */}
        <div className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
      </motion.div>
      
      {/* Main Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y, opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/5 border border-cream/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
            <span className="text-sm font-body text-cream/70">New Collection Available</span>
          </span>
        </motion.div>
        
        {/* Main Headline */}
        <div className="mb-6 md:mb-8 overflow-hidden">
          <AnimatedText
            text="ELEVATE YOUR"
            className="text-display-xl font-display font-bold text-cream"
            delay={0.7}
          />
        </div>
        <div className="mb-8 md:mb-10 overflow-hidden">
          <AnimatedText
            text="EVERYDAY"
            className="text-display-xl font-display font-bold"
            gradient
            delay={0.9}
          />
        </div>
        
        {/* Subheadline */}
        <motion.p
          className="max-w-xl mx-auto text-lg md:text-xl font-body text-cream/60 mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Premium streetwear for those who move different. 
          Crafted with intention, designed to last.
        </motion.p>
        
        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button 
            size="lg" 
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Shop Collection
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
          >
            Our Story
          </Button>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          className="mt-16 md:mt-24 grid grid-cols-3 gap-8 md:gap-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { value: '10K+', label: 'Happy Customers' },
            { value: '100%', label: 'Organic Cotton' },
            { value: '48hr', label: 'Fast Shipping' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <motion.div
                className="text-2xl md:text-3xl font-display font-bold text-cream mb-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs md:text-sm font-body text-cream/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/40 hover:text-cream/60 transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={scrollToContent}
      >
        <span className="text-xs font-body uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
      
      {/* Side Text */}
      <motion.div
        className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-cream/30 to-transparent" />
          <span className="text-xs font-body text-cream/40 tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
            Est. 2024
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-cream/30 to-transparent" />
        </div>
      </motion.div>
      
      {/* Right Side Text */}
      <motion.div
        className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-cream/30 to-transparent" />
          <span className="text-xs font-body text-cream/40 tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
            Premium Quality
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-cream/30 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
