
import { useState } from 'react';
import FarmerSidebar from './FarmerTab/FarmerSideBar';


import BuyProducts from './FarmerTab/BuyProducts';
import ProductsTab from './VendorTab/Product';
import AddProduct from './VendorTab/AddProduct';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const renderContent = () => {
    switch (activeTab) {
      case 'crops':
        return <ProductsTab />;
      case 'addcrops':
        return <AddProduct />;
      case 'buyproduct':
        return <BuyProducts/>;

    //   case 'resources':
    //     return <div className="p-8 text-center text-gray-500">Agricultural resources section coming soon...</div>;
    //   case 'community':
    //     return <div className="p-8 text-center text-gray-500">Community section coming soon...</div>;
    //   case 'notifications':
    //     return <div className="p-8 text-center text-gray-500">Notifications section coming soon...</div>;
    //   case 'settings':
    //     return <div className="p-8 text-center text-gray-500">Settings section coming soon...</div>;
      default:
        return <ProductsTab/>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <FarmerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;