import { Smartphone, HeartHandshake, BarChart, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const features = [
    {
      icon: Smartphone,
      title: 'Easy Mobile Access',
      description: 'Access KrishiBazaar anytime, anywhere with our mobile-friendly platform designed for farmers on the go.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: HeartHandshake,
      title: 'Fair Trade Practices',
      description: 'We ensure fair pricing and transparent transactions that benefit both farmers and buyers.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: BarChart,
      title: 'Market Insights',
      description: 'Access real-time market data and pricing trends to make informed decisions about your crops.',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with fellow farmers, share knowledge, and grow together in our supportive community.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <section id="about" className="py-16 bg-gray-50 scroll-mt-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose KrishiBazaar?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive tools and services to empower Nepal's agricultural community 
            with modern technology and fair trade practices.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ staggerChildren: 0.25 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 group hover:-translate-y-1"
            >
              <div className={`${feature.bgColor} ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
