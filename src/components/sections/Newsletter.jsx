import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import Button from '../ui/Button'
import ScrollReveal from '../common/ScrollReveal'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
    }
  }
  
  return (
    <section className="relative py-24 md:py-32 bg-ink-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink-950 to-ink" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(232, 90, 43, 0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-ember/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <ScrollReveal>
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-2xl bg-ember/10 border border-ember/30"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-ember" />
          </motion.div>
        </ScrollReveal>
        
        {/* Headline */}
        <ScrollReveal delay={0.1}>
          <h2 className="text-display-md font-display font-bold text-cream mb-6">
            Join the Inner Circle
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-lg font-body text-cream/50 mb-10 max-w-xl mx-auto">
            Get early access to drops, exclusive discounts, and behind-the-scenes content. 
            No spam, just the good stuff.
          </p>
        </ScrollReveal>
        
        {/* Form */}
        <ScrollReveal delay={0.3}>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="relative max-w-md mx-auto"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className={`relative rounded-full transition-all duration-300 ${
                  isFocused ? 'ring-2 ring-ember/50' : ''
                }`}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full px-6 py-4 pr-36 rounded-full bg-ink-900 border border-ink-800 text-cream placeholder:text-cream/30 font-body focus:outline-none focus:border-ember/50 transition-colors"
                    required
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Button
                      type="submit"
                      size="sm"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
                
                {/* Floating Label Effect */}
                <motion.div
                  className="absolute -top-3 left-6 px-2 bg-ink-950 text-xs font-body text-ember"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isFocused || email ? 1 : 0, y: isFocused || email ? 0 : 10 }}
                >
                  Email Address
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="max-w-md mx-auto"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-sage/10 border border-sage/30">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <Check className="w-5 h-5 text-sage" />
                  </motion.div>
                  <div className="text-left">
                    <p className="font-body font-semibold text-cream">You're in!</p>
                    <p className="text-sm text-cream/50">Check your inbox for a welcome gift.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
        
        {/* Trust Text */}
        <ScrollReveal delay={0.4}>
          <p className="mt-6 text-sm font-body text-cream/30">
            Join 10,000+ members · Unsubscribe anytime
          </p>
        </ScrollReveal>
        
        {/* Perks */}
        <ScrollReveal delay={0.5}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🎁', text: '10% off first order' },
              { icon: '⚡', text: 'Early drop access' },
              { icon: '✨', text: 'Member-only exclusives' },
            ].map((perk, i) => (
              <motion.div
                key={perk.text}
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-ink-900/50 border border-ink-800/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -2, borderColor: 'rgba(232, 90, 43, 0.3)' }}
              >
                <span className="text-2xl">{perk.icon}</span>
                <span className="font-body text-sm text-cream/70">{perk.text}</span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default Newsletter
