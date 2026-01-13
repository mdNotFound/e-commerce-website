import { motion } from 'framer-motion'
import Hero from '../components/sections/Hero'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import BrandStory from '../components/sections/BrandStory'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import Testimonials from '../components/sections/Testimonials'
import LimitedDrop from '../components/sections/LimitedDrop'
import Newsletter from '../components/sections/Newsletter'

const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <FeaturedProducts />
      <BrandStory />
      <WhyChooseUs />
      <LimitedDrop />
      <Testimonials />
      <Newsletter />
    </motion.main>
  )
}

export default Home
