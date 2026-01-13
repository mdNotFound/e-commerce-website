import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Loader from './components/ui/Loader'
import Home from './pages/Home'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  
  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <Loader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      {/* Main App */}
      {!isLoading && (
        <div className="relative min-h-screen bg-ink">
          {/* Noise Overlay */}
          <div className="noise-overlay" />
          
          {/* Navigation */}
          <Navbar />
          
          {/* Page Content */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              {/* Add more routes as needed */}
              <Route path="/shop" element={<Home />} />
              <Route path="/collection" element={<Home />} />
              <Route path="/about" element={<Home />} />
              <Route path="/contact" element={<Home />} />
            </Routes>
          </AnimatePresence>
          
          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
