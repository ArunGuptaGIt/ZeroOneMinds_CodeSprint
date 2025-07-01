import React from 'react';
import { 
  
  Sprout, 
  ShoppingCart, 
  LogOut,
  Leaf
} from 'lucide-react';

interface FarmerSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FarmerSidebar: React.FC<FarmerSidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'crops', label: 'My Crops', icon: Sprout },
    { id: 'addcrops', label: 'Add Crops', icon: Sprout },
    { id: 'buyproduct', label: 'Buy Product', icon: ShoppingCart },
   
  ];

  return (
    <div className="bg-white h-screen w-64 shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-green-500 p-2 rounded-lg">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">KrishiBazaar</h1>
            <p className="text-sm text-gray-500">Farmer Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default FarmerSidebar;