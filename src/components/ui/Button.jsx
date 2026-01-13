import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useMagnetic } from '../../lib/hooks'
import { smoothEasing } from '../../lib/animations'

const buttonVariants = {
  primary: 'bg-cream text-ink hover:bg-cream-300',
  secondary: 'bg-transparent text-cream border border-cream/30 hover:border-cream hover:bg-cream/5',
  ghost: 'bg-transparent text-cream hover:bg-cream/10',
  ember: 'bg-ember text-cream hover:bg-ember-600',
  outline: 'bg-transparent text-cream border border-ink-700 hover:border-cream/50',
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
}

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  className,
  disabled,
  loading,
  icon,
  iconPosition = 'right',
  ...props
}, ref) => {
  const { ref: magneticRef, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.3)
  
  const combinedRef = (node) => {
    magneticRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }
  
  return (
    <motion.button
      ref={combinedRef}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 font-body font-medium rounded-full',
        'transition-colors duration-300 ease-smooth',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      disabled={disabled || loading}
      onMouseMove={magnetic ? handleMouseMove : undefined}
      onMouseLeave={magnetic ? handleMouseLeave : undefined}
      animate={magnetic ? { x: position.x, y: position.y } : undefined}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {loading && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </motion.span>
      )}
      
      <span className={cn('inline-flex items-center gap-2', loading && 'invisible')}>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </span>
      
      {/* Hover glow effect for primary */}
      {variant === 'primary' && (
        <motion.span
          className="absolute inset-0 rounded-full bg-cream/20 blur-xl -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.4, ease: smoothEasing }}
        />
      )}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button
