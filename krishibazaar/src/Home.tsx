import { useEffect, useRef, useState } from "react";
import About from "./components/About";
import Navbar from "./components/Navbar";
import MarketPlace from "./components/MarketPlace";
import { CheckCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Contact from "./components/Contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const aboutRef = useRef<HTMLElement | null>(null);
  const marketRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const images = ["/homeimg1.jpg", "/homeimg2.jpg", "/homeimg3.jpg", "/homeimg4.jpg", "/homeimg5.jpg", "/homeimg6.jpg", "/homeimg7.jpg", "/homeimg8.jpg", "/homeimg9.png", "/homeimg10.jpg","/homeimg11.jpg" ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      const aboutTop = aboutRef.current?.offsetTop || 0;
      const marketTop = marketRef.current?.offsetTop || 0;
      const contactTop = contactRef.current?.offsetTop || 0;

      if (scrollY >= contactTop) {
        setActiveSection("contact");
      } else if (scrollY >= marketTop) {
        setActiveSection("market");
      } else if (scrollY >= aboutTop) {
        setActiveSection("about");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Variants for sliding images with no gap
  const variants = {
  enter: {
    opacity: 0,
    scale: 1.02,
    position: "absolute" as const,
  },
  center: {
    opacity: 1,
    scale: 1,
    position: "relative" as const,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    position: "absolute" as const,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

  return (
    <div id="home">
      <Navbar activeSection={activeSection} />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16 lg:py-24 h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 pt-[4rem]">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Grow Your{" "}
                  <motion.span
                    initial={{ color: "#000000" }}
                    animate={{ color: "#16a34a" }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="inline-block"
                  >
                    Agricultural
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ color: "#000000" }}
                    animate={{ color: "#16a34a" }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="inline-block"
                  >
                    Dreams
                  </motion.span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  with{" "}
                  <span className="font-semibold text-green-600">KrishiBazaar</span>
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.66 }}
                  className="flex items-center space-x-2 text-green-600"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Verified Sellers</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.88 }}
                  className="flex items-center space-x-2 text-green-600"
                >
                  <Clock className="h-5 w-5" />
                  <span className="text-sm font-medium">Fast Delivery</span>
                </motion.div>
              </div>
            </div>

            {/* UPDATED IMAGE SLIDER */}
            <div className="relative w-full max-w-md h-100 rounded-lg overflow-hidden shadow-lg">
             <div className="relative w-full max-w-md h-100 rounded-lg overflow-hidden shadow-lg">
  <AnimatePresence mode="wait">
    <motion.img
      key={images[currentImageIndex]}
      src={images[currentImageIndex]}
      alt={`Home image ${currentImageIndex + 1}`}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="object-cover w-full h-full rounded-lg"
    />
  </AnimatePresence>
</div>
            </div>
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
        <Contact />
      </section>
    </div>
  );
}