import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react'
import { fadeUp, staggerContainer } from '../../lib/animations'
import { useInView } from '../../lib/hooks'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'New Arrivals', href: '/shop?filter=new' },
    { name: 'Best Sellers', href: '/shop?filter=best' },
    { name: 'Limited Edition', href: '/shop?filter=limited' },
  ],
  company: [
    { name: 'Our Story', href: '/about' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
  ],
}

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
]

const Footer = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  
  return (
    <footer ref={ref} className="relative bg-ink border-t border-ink-800/50">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Brand Column */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display font-bold text-3xl text-cream tracking-tight">
                VOID<span className="text-ember">WEAR</span>
              </span>
            </Link>
            <p className="text-cream/60 font-body text-sm leading-relaxed mb-8 max-w-sm">
              Premium streetwear for those who move different. Elevated essentials, crafted with intention, designed to last.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-ink-900 text-cream/60 hover:text-cream hover:bg-ink-800 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Links Columns */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <h4 className="font-body font-semibold text-sm text-cream mb-6 uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <h4 className="font-body font-semibold text-sm text-cream mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <h4 className="font-body font-semibold text-sm text-cream mb-6 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Newsletter Mini */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <h4 className="font-body font-semibold text-sm text-cream mb-6 uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="text-sm text-cream/60 mb-4">
              Get early access to drops and exclusive offers.
            </p>
            <Link
              to="/newsletter"
              className="inline-flex items-center gap-2 text-sm text-ember hover:text-ember-400 transition-colors duration-300"
            >
              Subscribe
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-ink-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-cream/40 font-body">
              © {new Date().getFullYear()} VOIDWEAR. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-xs text-cream/40 hover:text-cream/60 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-cream/40 hover:text-cream/60 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-xs text-cream/40 hover:text-cream/60 transition-colors">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Large Logo Watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none overflow-hidden">
        <motion.div
          className="font-display font-bold text-[20vw] leading-none text-ink-900/30 select-none whitespace-nowrap"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          VOIDWEAR
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
