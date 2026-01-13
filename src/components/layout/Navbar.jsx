import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Search } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useScrolled, useIsMobile } from '../../lib/hooks'
import { navLinks } from '../../data/products'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount] = useState(0)
  const scrolled = useScrolled(50)
  const isMobile = useIsMobile()
  const location = useLocation()
  
  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])
  
  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-500',
          scrolled ? 'bg-ink/80 backdrop-blur-xl border-b border-ink-800/50' : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="relative z-10">
              <motion.div
                className="font-display font-bold text-xl lg:text-2xl text-cream tracking-tight"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                VOID<span className="text-ember">WEAR</span>
              </motion.div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="relative group"
                >
                  <span className="text-sm font-body font-medium text-cream/70 hover:text-cream transition-colors duration-300">
                    {link.name}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-px bg-ember origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </Link>
              ))}
            </div>
            
            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <motion.button
                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full text-cream/70 hover:text-cream hover:bg-cream/5 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>
              
              {/* Cart */}
              <motion.button
                className="relative flex items-center justify-center w-10 h-10 rounded-full text-cream/70 hover:text-cream hover:bg-cream/5 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-ember text-cream text-xs font-medium rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
              
              {/* Mobile Menu Toggle */}
              <motion.button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-cream/70 hover:text-cream hover:bg-cream/5 transition-colors z-50"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-ink/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.nav
              className="relative h-full flex flex-col items-center justify-center gap-8 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.href}
                    className="text-4xl font-display font-semibold text-cream hover:text-ember transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Social Links */}
              <motion.div
                className="absolute bottom-12 flex gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {['Instagram', 'Twitter', 'TikTok'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-sm font-body text-cream/50 hover:text-cream transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
