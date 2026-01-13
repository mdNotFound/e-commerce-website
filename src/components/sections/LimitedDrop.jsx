import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Clock, Flame } from 'lucide-react'
import Button from '../ui/Button'
import ScrollReveal from '../common/ScrollReveal'
import { products } from '../../data/products'

const LimitedDrop = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  
  const limitedProduct = products.find(p => p.badge === 'Limited')
  
  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-ink overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-ember/10 via-transparent to-transparent"
          style={{ scale }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-ember/5 via-transparent to-transparent" />
      </div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border border-ember/20 rounded-full"
        style={{ y }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-20 h-20 border border-cream/10 rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            {/* Badge */}
            <ScrollReveal>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ember/10 border border-ember/30"
                animate={{ 
                  boxShadow: ['0 0 20px rgba(232, 90, 43, 0)', '0 0 20px rgba(232, 90, 43, 0.3)', '0 0 20px rgba(232, 90, 43, 0)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="w-4 h-4 text-ember" />
                <span className="text-sm font-body font-medium text-ember">Limited Drop</span>
              </motion.div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h2 className="text-display-lg font-display font-bold text-cream leading-tight">
                The Ember{' '}
                <span className="relative">
                  Collection
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-ember rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-lg font-body text-cream/60 leading-relaxed max-w-lg">
                Heat-reactive prints that evolve with every wear. Each piece develops its own 
                unique patina over time, making your tee truly one of a kind. Limited to 500 pieces.
              </p>
            </ScrollReveal>
            
            {/* Countdown */}
            <ScrollReveal delay={0.3}>
              <div className="flex items-center gap-2 text-cream/40 font-body">
                <Clock className="w-4 h-4" />
                <span>Drop ends in: </span>
                <span className="font-mono text-ember">47:23:59</span>
              </div>
            </ScrollReveal>
            
            {/* Price & CTA */}
            <ScrollReveal delay={0.4}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-display font-bold text-cream">₹2,999</span>
                    <span className="text-lg font-body text-cream/40 line-through">₹3,999</span>
                  </div>
                  <p className="text-sm font-body text-ember">Save 25% - Early Access</p>
                </div>
                
                <Button 
                  size="lg" 
                  variant="ember"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Shop the Drop
                </Button>
              </div>
            </ScrollReveal>
            
            {/* Stock Indicator */}
            <ScrollReveal delay={0.5}>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-cream/40">127 / 500 claimed</span>
                  <span className="text-ember">25% sold</span>
                </div>
                <div className="h-2 bg-ink-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-ember to-ember-400 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '25%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
          
          {/* Image Side */}
          <ScrollReveal direction="right" className="relative">
            <div className="relative aspect-square">
              {/* Main Image */}
              <motion.div
                className="relative z-10 rounded-3xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={limitedProduct?.images[0] || 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'}
                  alt="Limited Edition"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                
                {/* Badge */}
                <motion.div
                  className="absolute top-6 left-6 px-4 py-2 bg-ember text-cream text-sm font-body font-medium rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Limited Edition
                </motion.div>
              </motion.div>
              
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-32 h-32 bg-ember/20 rounded-3xl blur-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <motion.div
                className="absolute -bottom-8 -left-8 z-20 p-4 bg-ink-900 border border-ink-800 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-ember/10 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-ember" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-cream">Heat-Reactive</p>
                    <p className="text-sm text-cream/50">Evolves with wear</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default LimitedDrop
