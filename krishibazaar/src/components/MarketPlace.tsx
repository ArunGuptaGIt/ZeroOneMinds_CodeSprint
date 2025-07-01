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
  },]

export default function MarketPlace() {
  return (
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
             
            </div>
          </div>
        ))}
      </div>
  )
}
