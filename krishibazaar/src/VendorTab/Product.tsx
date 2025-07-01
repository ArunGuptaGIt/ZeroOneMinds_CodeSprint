// ProductsTab.jsx
import { Eye, Edit, Trash2 } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    category: 'Vegetables',
    price: 120,
    stock: 45,
    unit: 'kg',
    status: 'Active',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Fresh Spinach',
    category: 'Leafy Greens',
    price: 80,
    stock: 12,
    unit: 'bundles',
    status: 'Low Stock',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Bell Peppers',
    category: 'Vegetables',
    price: 200,
    stock: 28,
    unit: 'kg',
    status: 'Active',
    image: 'https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: 4,
    name: 'Organic Carrots',
    category: 'Root Vegetables',
    price: 90,
    stock: 0,
    unit: 'kg',
    status: 'Out of Stock',
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

export default function ProductsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <p className="text-gray-600">Your current product inventory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-[5rem]">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.status === 'Active' ? 'bg-green-100 text-green-700' :
                  product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {product.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-bold text-green-600">NPR {product.price}</p>
                  <p className="text-sm text-gray-500">per {product.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{product.stock} {product.unit}</p>
                  <p className="text-xs text-gray-500">in stock</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">View</span>
                </button>
                <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-200 flex items-center justify-center space-x-1">
                  <Edit className="h-4 w-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button className="bg-red-100 text-red-700 py-2 px-3 rounded-lg hover:bg-red-200">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
