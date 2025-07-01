import { useState } from 'react';
import axios from 'axios';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    item: '',
    count: '',
    price: '',
    weightOfEachPacket: '',
    description: '',
    category: '',
    item_photo: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = sessionStorage.getItem('userEmail');
    const type = sessionStorage.getItem('userType');

    if (!email || type === null) {
      alert("User session not found. Please log in again.");
      return;
    }

    const data = new FormData();

    data.append('email', email);
    data.append('type', type);

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post('http://localhost:8000/api/storage/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('✅ Product added successfully!');
      // Clear the form after successful submission
      setFormData({
        item: '',
        count: '',
        price: '',
        weightOfEachPacket: '',
        description: '',
        category: '',
        item_photo: null,
      });
    } catch (err) {
      setMessage('❌ Error: ' + (err.response?.data?.detail || 'Something went wrong'));
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="mx-auto bg-white p-6 rounded-xl shadow-md h-[46rem] w-[28rem] flex gap-6 flex-col">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Product</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="item"
              required
              value={formData.item}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
              <option value="Leafy Greens">Leafy Greens</option>
              <option value="Dairy">Dairy</option>
              <option value="Herbs">Herbs</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (NPR)</label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input
                type="number"
                name="count"
                required
                value={formData.count}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight of Each Packet (g)</label>
            <input
              type="number"
              name="weightOfEachPacket"
              required
              value={formData.weightOfEachPacket}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Image</label>
            <input
              type="file"
              name="item_photo"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Product
          </button>
        </form>

        {message && <p className="text-sm text-center text-blue-600 mt-4">{message}</p>}
      </div>
    </div>
  );
}
