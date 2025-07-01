import { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const email = sessionStorage.getItem('userEmail');
      if (!email) {
        setError("User email not found in session.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post('http://localhost:8000/api/storage/items', { email });
        setProducts(res.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <p className="text-gray-600">Your current product inventory</p>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-10">Loading products...</p>
      ) : error ? (
        <p className="text-red-500 mt-10">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 mt-10">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-[5rem]">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="relative">
<img
  src={
    product.item_photo.startsWith('http')
      ? product.item_photo
      : `http://localhost:8000${product.item_photo}`
  }
  alt={product.item}
  className="w-full h-48 object-cover"
/>

                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.count === 0 ? 'bg-red-100 text-red-700'
                    : product.count < 10 ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                  }`}>
                    {product.count === 0
                      ? 'Out of Stock'
                      : product.count < 10
                      ? 'Low Stock'
                      : 'Active'}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{product.item}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg font-bold text-green-600">NPR {product.price}</p>
                    <p className="text-sm text-gray-500">per {product.weightOfEachPacket}g</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{product.count} units</p>
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
      )}
    </div>
  );
}
