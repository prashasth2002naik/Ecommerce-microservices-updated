import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    userId: 1,
    productId: '',
    quantity: 1
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Fetch products through API Gateway using relative URL
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // ✅ Create order through API Gateway using relative URL
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedProduct = products.find(
      (p) => p.id === parseInt(formData.productId)
    );

    if (!selectedProduct) {
      alert("Please select a product");
      return;
    }

    const totalPrice = selectedProduct.price * formData.quantity;

    const orderData = {
      userId: parseInt(formData.userId),
      productId: parseInt(formData.productId),
      quantity: parseInt(formData.quantity),
      totalPrice: totalPrice
    };

    try {
      await axios.post('/api/orders', orderData);
      alert('Order created successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2>Create New Order</h2>

      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label>User ID:</label>
          <input
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Product:</label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Create Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
