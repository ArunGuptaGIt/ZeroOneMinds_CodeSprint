import { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit, Trash2 } from 'lucide-react';

export default function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    item: '',
    category: '',
    price: '',
    count: '',
    weightOfEachPacket: '',
    description: '',
    item_photo: null,
  });

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

  const handleEditClick = (product) => {
    setEditingItem(product);
    setEditFormData({
      item: product.item,
      category: product.category,
      price: product.price,
      count: product.count,
      weightOfEachPacket: product.weightOfEachPacket,
      description: product.description || '',
      item_photo: null,
    });
  };

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setEditFormData({
      ...editFormData,
      item_photo: e.target.files[0] || null,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('item', editFormData.item);
    formData.append('category', editFormData.category);
    formData.append('price', editFormData.price);
    formData.append('count', editFormData.count);
    formData.append('weightOfEachPacket', editFormData.weightOfEachPacket);
    formData.append('description', editFormData.description);

    if (editFormData.item_photo) {
      formData.append('item_photo', editFormData.item_photo);
    }

    try {
      const res = await axios.put(
        `http://localhost:8000/api/storage/update_delete_item/${editingItem.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      setProducts(products.map(p => (p.id === editingItem.id ? res.data : p)));
      setEditingItem(null);
    } catch (err) {
      alert('Failed to update item');
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`http://localhost:8000/api/storage/update_delete_item/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

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
                {editingItem && editingItem.id === product.id ? (
                  <form onSubmit={handleEditSubmit} className="space-y-3" encType="multipart/form-data">
                    <input
                      type="text"
                      name="item"
                      value={editFormData.item}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      placeholder="Item name"
                      required
                    />
                    <input
                      type="text"
                      name="category"
                      value={editFormData.category}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      placeholder="Category"
                      required
                    />
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      placeholder="Price"
                      required
                    />
                    <input
                      type="number"
                      name="count"
                      value={editFormData.count}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      placeholder="Stock count"
                      required
                    />
                    <input
                      type="number"
                      name="weightOfEachPacket"
                      value={editFormData.weightOfEachPacket}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      placeholder="Weight per packet (g)"
                      required
                    />
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      placeholder="Description"
                      rows={3}
                    />
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Product Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border p-2 rounded"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Save</button>
                      <button type="button" onClick={handleCancelEdit} className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
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
                      <button
                        onClick={() => handleEditClick(product)}
                        className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-200 flex items-center justify-center space-x-1"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="text-sm">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-100 text-red-700 py-2 px-3 rounded-lg hover:bg-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
