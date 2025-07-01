
import Sidebar from './VendorTab/SideBar';
import DashboardOverview from './VendorTab/DashboardOverview';
import { useState } from 'react';
import ProductsTab from './VendorTab/Product';
import AddProduct from './VendorTab/AddProduct';
const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'products':
        return <ProductsTab/>;
         case 'addproducts':
        return <AddProduct/>;
         default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;