import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Eye } from 'lucide-react'
import { cn, formatPrice } from '../../lib/utils'

const ProductCard = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  
  const handleMouseEnter = () => {
    setIsHovered(true)
    if (product.images.length > 1) {
      setCurrentImage(1)
    }
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    setCurrentImage(0)
  }
  
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink-900 mb-4">
        {/* Product Image */}
        <motion.img
          src={product.images[currentImage]}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ 
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Overlay Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && (
            <motion.span
              className={cn(
                'px-3 py-1 text-xs font-body font-medium rounded-full',
                product.badge === 'New' && 'bg-ember text-cream',
                product.badge === 'Limited' && 'bg-cream text-ink',
                product.badge === 'Premium' && 'bg-ink-800 text-cream border border-cream/20',
                product.badge === 'Collab' && 'bg-gradient-to-r from-ember to-ember-400 text-cream',
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {product.badge}
            </motion.span>
          )}
          
          {product.soldOut && (
            <span className="px-3 py-1 text-xs font-body font-medium rounded-full bg-ink-800/90 text-cream/60 backdrop-blur-sm">
              Sold Out
            </span>
          )}
        </div>
        
        {/* Wishlist Button */}
        <motion.button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-ink-900/80 backdrop-blur-sm text-cream/70 hover:text-ember transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
        >
          <Heart className={cn('w-4 h-4', isLiked && 'fill-ember text-ember')} />
        </motion.button>
        
        {/* Quick Actions */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20 
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-cream text-ink font-body font-medium text-sm hover:bg-cream-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={product.soldOut}
          >
            <ShoppingBag className="w-4 h-4" />
            {product.soldOut ? 'Notify Me' : 'Add to Bag'}
          </motion.button>
          
          <motion.button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-ink-800/90 backdrop-blur-sm text-cream hover:bg-ink-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-4 h-4" />
          </motion.button>
        </motion.div>
        
        {/* Color Dots (image switcher) */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {product.images.map((_, i) => (
              <motion.button
                key={i}
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-colors duration-300',
                  currentImage === i ? 'bg-cream' : 'bg-cream/30'
                )}
                animate={{ opacity: isHovered ? 0 : 1 }}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentImage(i)
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="space-y-2">
        {/* Category */}
        <p className="text-xs font-body text-cream/40 uppercase tracking-wider">
          {product.category}
        </p>
        
        {/* Name */}
        <h3 className="font-body font-medium text-cream group-hover:text-ember transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-body font-semibold text-cream">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-body text-sm text-cream/40 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* Colors */}
        <div className="flex items-center gap-1 pt-1">
          {product.colors.slice(0, 4).map((color, i) => (
            <motion.div
              key={color}
              className="w-4 h-4 rounded-full border border-ink-700 cursor-pointer"
              style={{
                backgroundColor: 
                  color.toLowerCase().includes('black') ? '#1a1a1a' :
                  color.toLowerCase().includes('white') ? '#f5f0e8' :
                  color.toLowerCase().includes('grey') || color.toLowerCase().includes('gray') ? '#666666' :
                  color.toLowerCase().includes('navy') ? '#1e3a5f' :
                  color.toLowerCase().includes('ember') ? '#E85A2B' :
                  color.toLowerCase().includes('bone') || color.toLowerCase().includes('cream') ? '#e8e0d4' :
                  color.toLowerCase().includes('slate') ? '#434343' :
                  color.toLowerCase().includes('desert') || color.toLowerCase().includes('ash') ? '#a4a4a4' :
                  color.toLowerCase().includes('storm') ? '#515151' :
                  color.toLowerCase().includes('charcoal') ? '#383838' :
                  '#666666'
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-cream/40 ml-1">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
