import { Link } from 'react-router-dom';
import { Search, User, Leaf } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  return (
    <>
      <header className="fixed top-0 w-full z-50 backdrop-blur bg-white/40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-green-500 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">KrishiBazaar</span>
          </div>

          
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className={`font-medium transition-colors ${
                activeSection === 'home' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Home
            </a>
            <a
              href="#about"
              className={`font-medium transition-colors ${
                activeSection === 'about' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              About
            </a>
            <a
              href="#market"
              className={`font-medium transition-colors ${
                activeSection === 'market' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Marketplace
            </a>
            <a
              href="#contact"
              className={`font-medium transition-colors ${
                activeSection === 'contact' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
              }`}>
              Contact
            </a>
          </nav>

          
          <div className="flex items-center space-x-4">
              {/* 🟢 Search icon as link to #market */}
              <a
                href="#market"
                className="p-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                <Search className="h-5 w-5" />
              </a>
            
              <Link to='/login'>
            <div className="flex items-center space-x-2 h-[3rem] w-[6.5rem] rounded-2xl hover:bg-green-200  justify-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm cursor-pointer font-medium text-gray-700">Login</span>
            </div>
              </Link>

            <Link to='/signup'>
            <div className="flex items-center hover:bg-green-500 bg-green-300 space-x-2 h-[3rem] w-[6.5rem] rounded-2xl shadow-2xs justify-center">
              <span className="text-sm cursor-pointer font-medium text-gray-700">Register</span>
            </div>
            </Link>

          </div>
        </div>
      </div>
    </header>
      
    </>
  )
}