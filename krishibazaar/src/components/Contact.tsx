
import { Leaf, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-500 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">KrishiBazaar</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering Nepal's agricultural community through technology, 
              fair trade, and sustainable practices.
            </p>
            <div className="flex space-x-4">
              <button className="bg-gray-800 hover:bg-green-600 p-2 rounded-lg transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="bg-gray-800 hover:bg-green-600 p-2 rounded-lg transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="bg-gray-800 hover:bg-green-600 p-2 rounded-lg transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="#home" className="block text-gray-400 hover:text-green-400 transition-colors">Home</a>
              <a href="#about" className="block text-gray-400 hover:text-green-400 transition-colors">About Us</a>
              <a href="#market" className="block text-gray-400 hover:text-green-400 transition-colors">Marketplace</a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2">
              <a href="#market" className="block text-gray-400 hover:text-green-400 transition-colors">Buy Seeds</a>
              <a href="#market" className="block text-gray-400 hover:text-green-400 transition-colors">Sell Crops</a>
              
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <span className="text-gray-400">info@krishibazaar.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <span className="text-gray-400">+977 1234567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-400" />
                <span className="text-gray-400">Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 KrishiBazaar. All rights reserved. Made with ❤️ for Nepal's farmers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;