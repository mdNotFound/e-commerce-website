import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ProductCard from '../product/ProductCard'
import Button from '../ui/Button'
import ScrollReveal from '../common/ScrollReveal'
import { products } from '../../data/products'
import { staggerContainer, fadeUp } from '../../lib/animations'
import { useInView } from '../../lib/hooks'

const FeaturedProducts = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4)
  const { ref, isInView } = useInView({ threshold: 0.1 })
  
  return (
    <section className="relative py-24 md:py-32 bg-ink overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ember/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cream/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.p 
              variants={fadeUp}
              className="text-sm font-body text-ember uppercase tracking-widest mb-4"
            >
              Featured Collection
            </motion.p>
            <motion.h2 
              variants={fadeUp}
              className="text-display-md font-display font-bold text-cream"
            >
              Curated for You
            </motion.h2>
          </motion.div>
          
          <ScrollReveal direction="up" delay={0.2}>
            <Button 
              variant="secondary"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View All Products
            </Button>
          </ScrollReveal>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <ScrollReveal className="mt-16 text-center" delay={0.4}>
          <p className="text-cream/50 font-body mb-4">
            Can't decide? Let us help.
          </p>
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-cream font-body hover:text-ember transition-colors duration-300 group"
            whileHover={{ x: 5 }}
          >
            Take the Style Quiz
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default FeaturedProducts
