// Smooth easing curve (Apple-style)
export const smoothEasing = [0.16, 1, 0.3, 1]
export const bounceEasing = [0.34, 1.56, 0.64, 1]
export const gentleEasing = [0.4, 0, 0.2, 1]

// Fade animations
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: smoothEasing }
  }
}

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: smoothEasing }
  }
}

export const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: smoothEasing }
  }
}

export const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: smoothEasing }
  }
}

export const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: smoothEasing }
  }
}

// Scale animations
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: smoothEasing }
  }
}

export const scaleUp = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 1, ease: smoothEasing }
  }
}

// Stagger container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
}

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    }
  }
}

export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
}

// Character reveal for headlines
export const charReveal = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: smoothEasing }
  }
}

// Word reveal
export const wordReveal = {
  hidden: { y: '100%', opacity: 0, rotateX: -90 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.8, ease: smoothEasing }
  }
}

// Slide animations
export const slideUp = {
  hidden: { y: '100%' },
  visible: { 
    y: 0,
    transition: { duration: 0.8, ease: smoothEasing }
  }
}

export const slideDown = {
  hidden: { y: '-100%' },
  visible: { 
    y: 0,
    transition: { duration: 0.8, ease: smoothEasing }
  }
}

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: smoothEasing }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.4, ease: gentleEasing }
  }
}

// Blur animations
export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: smoothEasing }
  }
}

// Card hover
export const cardHover = {
  rest: { 
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: smoothEasing }
  },
  hover: { 
    scale: 1.02,
    y: -8,
    transition: { duration: 0.4, ease: smoothEasing }
  }
}

// Image reveal (clip-path)
export const imageReveal = {
  hidden: { 
    clipPath: 'inset(100% 0 0 0)',
    scale: 1.2
  },
  visible: { 
    clipPath: 'inset(0% 0 0 0)',
    scale: 1,
    transition: { duration: 1.2, ease: smoothEasing }
  }
}

// Line draw
export const lineDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { duration: 1.5, ease: smoothEasing }
  }
}

// Magnetic effect helper
export const magneticSpring = {
  type: 'spring',
  stiffness: 150,
  damping: 15,
  mass: 0.1
}

// Navbar animation
export const navbarVariants = {
  top: {
    backgroundColor: 'rgba(10, 10, 10, 0)',
    backdropFilter: 'blur(0px)',
    borderBottomColor: 'rgba(56, 56, 56, 0)',
  },
  scrolled: {
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    backdropFilter: 'blur(20px)',
    borderBottomColor: 'rgba(56, 56, 56, 0.3)',
  }
}

// Menu item hover
export const menuItemVariants = {
  rest: { x: 0 },
  hover: { 
    x: 10,
    transition: { duration: 0.3, ease: smoothEasing }
  }
}

// Product card overlay
export const overlayVariants = {
  rest: { opacity: 0, y: 20 },
  hover: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: smoothEasing }
  }
}

// Loader animation
export const loaderVariants = {
  initial: { scaleY: 1 },
  animate: {
    scaleY: 0,
    transition: { duration: 0.8, ease: smoothEasing, delay: 2 }
  }
}

export const loaderTextVariants = {
  initial: { opacity: 1, y: 0 },
  animate: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: smoothEasing, delay: 1.6 }
  }
}
