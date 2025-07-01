import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BuyProduct() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [products, setProducts] = useState([]);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addAmount, setAddAmount] = useState('');

  const userEmail = sessionStorage.getItem('userEmail');

  useEffect(() => {
    if (!userEmail) {
      alert('No user logged in!');
      return;
    }

    fetchWalletBalance();
    fetchProducts();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/userdashboard/', {
        email: userEmail,
      });
      setWalletBalance(response.data.revenue || 0);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/availableproducts/', {
        email: userEmail,
      });
      const items = response.data.map((item, index) => ({
        id: index + 1,
        name: item.item,
        category: item.description || 'General',
        price: item.price,
        stock: item.count,
        unit: item.weightOfEachPacket || 'unit',
        status: item.count === 0 ? 'Out of Stock' : item.count < 20 ? 'Low Stock' : 'Active',
        image: item.item_photo || 'https://via.placeholder.com/300x200?text=No+Image',
        seller_email: item.email,  // <-- seller email added here
      }));
      setProducts(items);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddMoney = async () => {
  const amount = parseInt(addAmount, 10);
  if (!isNaN(amount) && amount > 0) {
    try {
      const response = await axios.post('http://localhost:8000/api/addmoney/', {
        email: userEmail,
        amount,
      });
      setWalletBalance(response.data.new_balance);
      setShowAddMoneyModal(false);
      setAddAmount('');
      alert(`Successfully added NPR ${amount} to your wallet!`);
    } catch (error) {
      alert('Failed to add money. Please try again.');
      console.error(error);
    }
  } else {
    alert('Please enter a valid amount');
  }
};


  const handleBuy = async (product) => {
    const count = 1;

    try {
      const response = await axios.post('http://localhost:8000/api/storage/BuyProduct/', {
        buyer_email: userEmail,
        seller_email: product.seller_email,  // <-- use dynamic seller email here
        item: product.name,
        count,
      });

      const { total_price, buyer_remaining_balance } = response.data;

      setWalletBalance(buyer_remaining_balance);

      setProducts(prev =>
        prev.map(p =>
          p.id === product.id
            ? {
                ...p,
                stock: p.stock - count,
                status: p.stock - count <= 0
                  ? 'Out of Stock'
                  : p.stock - count < 20
                  ? 'Low Stock'
                  : 'Active'
              }
            : p
        )
      );

      alert(`Purchase successful! Total: NPR ${total_price}`);
    } catch (error) {
      const message = error.response?.data?.error || 'Something went wrong.';
      alert(`Purchase failed: ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
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
              <div className="relative aspect-square">
                <img
                  src={`http://localhost:8000/${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : product.status === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xl font-bold text-green-700">NPR {product.price}</p>
                    <p className="text-xs text-gray-500">per {product.unit}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        product.stock > 20
                          ? 'text-gray-900'
                          : product.stock > 0
                          ? 'text-yellow-700'
                          : 'text-red-700'
                      }`}
                    >
                      {product.stock}
                    </p>
                    <p className="text-xs text-gray-500">available</p>
                  </div>
                </div>

                <button
                  disabled={product.status === 'Out of Stock'}
                  onClick={() => handleBuy(product)}
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
