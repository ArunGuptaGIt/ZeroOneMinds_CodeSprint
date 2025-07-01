import { useEffect, useRef, useState } from 'react';
import About from './component/About';
import Navbar from './component/Navbar';
import MarketPlace from './component/MarketPlace';
import { CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Contact from './component/Contact';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const aboutRef = useRef<HTMLElement | null>(null);
  const marketRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null); // 🆕 Added contactRef

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      const aboutTop = aboutRef.current?.offsetTop || 0;
      const marketTop = marketRef.current?.offsetTop || 0;
      const contactTop = contactRef.current?.offsetTop || 0;

      if (scrollY >= contactTop) {
        setActiveSection('contact');
      } else if (scrollY >= marketTop) {
        setActiveSection('market');
      } else if (scrollY >= aboutTop) {
        setActiveSection('about');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div id='home'>
      <Navbar activeSection={activeSection} />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16 lg:py-24 h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 pt-[4rem]">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Grow Your{' '}
                  <span className="text-green-600">Agricultural</span>
                  <br />
                  <span className="text-green-600">Dreams</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  with <span className="font-semibold text-green-600">KrishiBazaar</span>
                </p>
              </div>

              {/* Animated description */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.06,
                    },
                  },
                }}
                className="flex flex-wrap max-w-xl"
              >
                {"Connect directly with farmers and vendors across Nepal. Buy quality seeds, sell fresh crops, and grow together in a transparent marketplace."
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-lg text-gray-600 leading-relaxed mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
              </motion.div>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Verified Sellers</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm font-medium">Fast Delivery</span>
                </div>
              </div>
            </div>

             {/* <div className="relative flex flex-col gap-4">
      {images.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          alt={`Farm ${index + 1}`}
          className="rounded-xl shadow-lg w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.5, duration: 0.6 }}
        />
      ))}
    </div> */}


          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section ref={aboutRef}>
        <About />
      </section>

      {/* MARKET SECTION */}
      <section ref={marketRef}>
        <MarketPlace />
      </section>

      <section ref={contactRef}>
        <Contact/>
      </section>
    </div>
  );
}
