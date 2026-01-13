import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { testimonials } from '../../data/products'
import ScrollReveal from '../common/ScrollReveal'
import { useInView } from '../../lib/hooks'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const { ref, isInView } = useInView({ threshold: 0.2 })
  
  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev === testimonials.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1
    })
  }
  
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
  }
  
  const currentTestimonial = testimonials[currentIndex]
  
  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-ink overflow-hidden">
      {/* Background Quote */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02]">
        <Quote className="w-[40vw] h-[40vw] text-cream" strokeWidth={0.5} />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-sm font-body text-ember uppercase tracking-widest mb-4">
              Testimonials
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-display-md font-display font-bold text-cream mb-6">
              Loved by Thousands
            </h2>
          </ScrollReveal>
          
          {/* Sample Reviews Badge */}
          <ScrollReveal delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink-900/80 border border-ink-700/50 backdrop-blur-sm">
              <svg className="w-4 h-4 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-body text-cream/60">Sample Reviews · Real testimonials coming soon</span>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Main Testimonial */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 }
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-16"
              >
                {/* Avatar */}
                <motion.div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-ember/30 mb-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Stars */}
                <motion.div
                  className="flex gap-1 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-ember text-ember" />
                  ))}
                </motion.div>
                
                {/* Quote */}
                <motion.blockquote
                  className="text-xl md:text-2xl lg:text-3xl font-display text-cream leading-relaxed mb-8 max-w-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  "{currentTestimonial.content}"
                </motion.blockquote>
                
                {/* Author */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="font-body font-semibold text-cream">
                    {currentTestimonial.name}
                  </p>
                  <p className="font-body text-sm text-cream/50">
                    {currentTestimonial.role} · {currentTestimonial.location}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              className="w-12 h-12 rounded-full border border-ink-700 flex items-center justify-center text-cream/50 hover:text-cream hover:border-cream/30 transition-colors"
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            {/* Dots */}
            <div className="flex gap-2 px-4">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i === currentIndex ? 'bg-ember' : 'bg-ink-700 hover:bg-ink-600'
                  }`}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1)
                    setCurrentIndex(i)
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            
            <motion.button
              className="w-12 h-12 rounded-full border border-ink-700 flex items-center justify-center text-cream/50 hover:text-cream hover:border-cream/30 transition-colors"
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        
        {/* Trust Badges */}
        <motion.div
          className="mt-20 pt-12 border-t border-ink-800/50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-center text-sm font-body text-cream/30 mb-8">
            As featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {['HYPEBEAST', 'GQ', 'HIGHSNOBIETY', 'COMPLEX', 'SSENSE'].map((brand, i) => (
              <motion.span
                key={brand}
                className="text-xl md:text-2xl font-display font-bold text-cream/20 hover:text-cream/40 transition-colors cursor-default"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
