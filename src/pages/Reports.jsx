import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../api/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${AUTH_TOKEN}`,
  },
});

const Reports = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) throw new Error("No user found");
      } catch (error) {
        logout();
        navigate("/login");
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await apiClient.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await apiClient.get("/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchUser();
    fetchOrders();
    fetchCustomers();
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">Reports</h2>

        {/* Orders Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Order #</th>
                  <th className="border border-gray-300 px-4 py-2">Total Price</th>
                  <th className="border border-gray-300 px-4 py-2">Currency</th>
                  <th className="border border-gray-300 px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-center">{order.order_number}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">${order.total_price}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{order.currency}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {new Date(order.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customers Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Recent Customers</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {customer.first_name} {customer.last_name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{customer.email}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {new Date(customer.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Product</th>
                  <th className="border border-gray-300 px-4 py-2">Vendor</th>
                  <th className="border border-gray-300 px-4 py-2">Inventory</th>
                  <th className="border border-gray-300 px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {product.title}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{product.vendor}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{product.inventory_quantity}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {new Date(product.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
