import React, { useEffect, useState } from 'react';
import { Package, DollarSign, AlertCircle } from 'lucide-react';

const DashboardOverview = () => {
  const [stats, setStats] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const email = sessionStorage.getItem('userEmail');  // get email from session storage
      if (!email) {
        setError('User email not found in session storage.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/userdashboard/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to fetch dashboard info');
        }

        const data = await response.json();

        // Set stats data based on response
        setStats([
          {
            title: 'Total Revenue',
            value: `NPR ${data.revenue.toLocaleString()}`,
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
          },
          {
            title: 'Products Listed',
            value: data.total_products.toString(),
            icon: Package,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
          },
        ]);

        // Map low stock products
        const mappedLowStock = data.low_stock_products.map(prod => ({
          name: prod.product_name || prod.name,  // adjust key based on serializer
          stock: prod.count,
          unit: prod.unit || 'units',  // adjust as per your serializer
        }));
        setLowStockProducts(mappedLowStock);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white h-[10rem] p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-[80%]">
        {/* Low Stock Alert */}
        <div className="bg-white max-h-[40rem] overflow-y-auto rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">Low Stock Alert</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {lowStockProducts.length === 0 ? (
                <p className="text-gray-500">No low stock products</p>
              ) : (
                lowStockProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-orange-600">Only {product.stock} {product.unit} left</p>
                    </div>
                    <button className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors">
                      Restock
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
