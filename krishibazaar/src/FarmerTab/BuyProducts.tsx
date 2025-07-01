import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    category: 'Vegetables',
    price: 120,
    stock: 45,
    unit: 'kg',
    status: 'Active',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Fresh Spinach',
    category: 'Leafy Greens',
    price: 80,
    stock: 12,
    unit: 'bundle',
    status: 'Low Stock',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Bell Peppers',
    category: 'Vegetables',
    price: 200,
    stock: 0,
    unit: 'kg',
    status: 'Out of Stock',
    image: 'https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Organic Carrots',
    category: 'Root Vegetables',
    price: 90,
    stock: 30,
    unit: 'kg',
    status: 'Active',
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  }
];

export default function BuyProduct() {
  const [walletBalance, setWalletBalance] = useState(500); // Initial wallet balance
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addAmount, setAddAmount] = useState('');

//   const handleBuy = (productId, productPrice) => {
//     if (walletBalance >= productPrice) {
//       setWalletBalance(walletBalance - productPrice);
//       alert(`Successfully purchased! New balance: NPR ${walletBalance - productPrice}`);
//     } else {
//       alert('Insufficient wallet balance. Please add money to your wallet.');
//     }
//   };

  const handleAddMoney = () => {
    const amount = parseFloat(addAmount);
    if (!isNaN(amount) && amount > 0) {
      setWalletBalance(walletBalance + amount);
      setShowAddMoneyModal(false);
      setAddAmount('');
      alert(`Successfully added NPR ${amount} to your wallet!`);
    } else {
      alert('Please enter a valid amount');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Buy Products</h1>
          <p className="text-gray-600 mt-2">Select from our fresh farm products</p>
        </div>
        {/* Wallet Section */}
        <div className="flex justify-end items-center mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-500">Wallet Balance</p>
                <p className="text-2xl font-bold text-green-600">NPR {walletBalance}</p>
              </div>
              <button
                onClick={() => setShowAddMoneyModal(true)}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
              >
                + Add Money
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative aspect-square">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'Active' ? 'bg-green-100 text-green-800' :
                    product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p>Name</p>
                    <p className="text-xl font-bold text-green-700">NPR {product.price}</p>
                    <p className="text-xs text-gray-500">per {product.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      product.stock > 20 ? 'text-gray-900' :
                      product.stock > 0 ? 'text-yellow-700' :
                      'text-red-700'
                    }`}>
                      {product.stock} {product.unit}
                    </p>
                    <p className="text-xs text-gray-500">available</p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  disabled={product.status === 'Out of Stock'}
                //   onClick={() => handleBuy(product.id, product.price)}
                  className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${
                    product.status !== 'Out of Stock' 
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.status !== 'Out of Stock' ? 'Buy Now' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Money to Wallet</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Amount (NPR)</label>
              <input
                type="number"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddMoneyModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMoney}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Money
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}