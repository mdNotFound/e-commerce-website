import { motion } from 'framer-motion'
import { Sparkles, Ruler, Leaf, Shield } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'
import { features } from '../../data/products'
import { useInView } from '../../lib/hooks'

const iconMap = {
  fabric: Sparkles,
  ruler: Ruler,
  leaf: Leaf,
  shield: Shield,
}

const WhyChooseUs = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  
  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-ink-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245, 240, 232, 0.05) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ember/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <p className="text-sm font-body text-ember uppercase tracking-widest mb-4">
              Why VOIDWEAR
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-display-md font-display font-bold text-cream mb-6">
              Quality is Not Negotiable
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="max-w-2xl mx-auto text-lg font-body text-cream/50">
              We believe premium shouldn't cost the earth—literally. Here's what makes 
              every VOIDWEAR piece worth it.
            </p>
          </ScrollReveal>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Sparkles
            
            return (
              <motion.div
                key={feature.id}
                className="group relative p-8 rounded-3xl bg-gradient-to-b from-ink-900/80 to-ink-900/40 border border-ink-800/50 hover:border-ember/30 transition-colors duration-500"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -8 }}
              >
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 mb-6 rounded-2xl bg-ink-800 flex items-center justify-center group-hover:bg-ember/10 transition-colors duration-500"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-6 h-6 text-ember" />
                </motion.div>
                
                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-cream mb-3 group-hover:text-ember transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="font-body text-cream/50 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-ember/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-ember/30 group-hover:bg-ember transition-colors duration-500" />
              </motion.div>
            )
          })}
        </div>
        
        {/* Bottom Stats Bar */}
        <motion.div
          className="mt-16 md:mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-ink-900 via-ink-800/50 to-ink-900 border border-ink-800/50"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '300gsm', label: 'Fabric Weight' },
              { value: '50+', label: 'Pattern Iterations' },
              { value: '0', label: 'Synthetic Materials' },
              { value: '∞', label: 'Washes Guaranteed' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-cream mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-body text-cream/40">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs
