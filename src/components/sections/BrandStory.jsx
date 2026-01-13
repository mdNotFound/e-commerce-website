import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../common/ScrollReveal'
import ParallaxImage from '../common/ParallaxImage'
import { useInView } from '../../lib/hooks'

const BrandStory = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  return (
    <section ref={containerRef} className="relative py-24 md:py-40 bg-ink overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03]">
        <motion.div
          className="whitespace-nowrap font-display font-bold text-[20vw] text-cream"
          style={{ x: x1 }}
        >
          VOID · WEAR · VOID · WEAR · VOID · WEAR
        </motion.div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <ScrollReveal direction="left" className="order-2 lg:order-1">
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                  alt="Brand story - craftsmanship"
                  className="w-full h-full"
                  speed={0.3}
                />
              </div>
              
              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-8 -right-8 lg:-right-12 p-6 bg-ink-900 border border-ink-800 rounded-2xl shadow-2xl max-w-[200px]"
                initial={{ opacity: 0, y: 20, rotate: 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-4xl font-display font-bold text-ember mb-2">5+</div>
                <p className="text-sm font-body text-cream/60">Years perfecting our craft</p>
              </motion.div>
              
              {/* Decorative Element */}
              <motion.div
                className="absolute -top-4 -left-4 w-24 h-24 border border-ember/20 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              />
            </div>
          </ScrollReveal>
          
          {/* Content Side */}
          <div className="order-1 lg:order-2 space-y-8">
            <ScrollReveal>
              <p className="text-sm font-body text-ember uppercase tracking-widest">
                Our Story
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h2 className="text-display-md font-display font-bold text-cream leading-tight">
                Born from a rejection of{' '}
                <span className="text-ember">fast fashion</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-lg font-body text-cream/60 leading-relaxed">
                We started VOIDWEAR in a small studio with one mission: create the perfect t-shirt. 
                Not the cheapest. Not the trendiest. The one you'll reach for every single day.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <p className="text-lg font-body text-cream/60 leading-relaxed">
                Every piece is designed in Los Angeles and crafted from premium organic cotton. 
                We obsess over every detail—the weight of the fabric, the drop of the shoulder, 
                the way it moves with your body.
              </p>
            </ScrollReveal>
            
            {/* Values */}
            <ScrollReveal delay={0.4}>
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-ink-800">
                {[
                  { label: 'Organic Cotton', value: '100%' },
                  { label: 'Water Saved', value: '2,847L' },
                  { label: 'Carbon Neutral', value: 'Yes' },
                  { label: 'Fair Wages', value: 'Always' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                  >
                    <div className="text-2xl font-display font-bold text-cream mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-body text-cream/40">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      
      {/* Marquee Text */}
      <div className="mt-24 md:mt-32 overflow-hidden border-y border-ink-800/50 py-6">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 mx-8">
              <span className="text-2xl md:text-4xl font-display font-bold text-cream/10">PREMIUM QUALITY</span>
              <span className="text-ember">✦</span>
              <span className="text-2xl md:text-4xl font-display font-bold text-cream/10">SUSTAINABLE</span>
              <span className="text-ember">✦</span>
              <span className="text-2xl md:text-4xl font-display font-bold text-cream/10">TIMELESS DESIGN</span>
              <span className="text-ember">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default BrandStory
