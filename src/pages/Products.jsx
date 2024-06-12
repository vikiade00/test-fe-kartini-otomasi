import axios from "axios";
import React, { useEffect, useState } from "react";

function Products() {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
  });
  const [editProduct, setEditProduct] = useState({
    id: null,
    title: "",
    price: "",
  });
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan nilai pencarian

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL_API}/products`).then((response) => {
      setData(response.data.products);
    });
  }, []);

  const handleEdit = (id) => {
    const productToEdit = data.find((product) => product.id === id);
    setEditProduct(productToEdit);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = () => {
    setData(data.filter((product) => product.id !== deleteProductId));
    setShowDeleteModal(false);
  };

  const handleAddProduct = () => {
    setData([...data, { id: data.length + 1, ...newProduct }]);
    setShowAddModal(false);
    setNewProduct({ title: "", price: "" });
  };

  const handleUpdateProduct = () => {
    setData(
      data.map((product) =>
        product.id === editProduct.id ? editProduct : product
      )
    );
    setShowEditModal(false);
    setEditProduct({ id: null, title: "", price: "" });
  };

  // Filter data berdasarkan nilai pencarian
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-5 pl-10 w-full">
      <div className="text-xl font-semibold mb-5 flex justify-between">
        Products
      </div>
      <div>
        <div className="flex justify-between items-center">
          <input
            placeholder="search"
            value={searchTerm} // Bind nilai input dengan state searchTerm
            onChange={(e) => setSearchTerm(e.target.value)} // Update nilai state saat input berubah
            className="border rounded-lg pl-2 mb-5"
          />
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded mb-5"
          >
            Add Product
          </button>
        </div>
        <div className="bg-white border p-4 rounded-lg shadow-md max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead
              className={`h-10 ${
                showAddModal || showEditModal || showDeleteModal
                  ? "bg-gray-600"
                  : ""
              }`}
              style={{
                position: "sticky",
                top: -16,
                zIndex: 0,
                background: "white",
              }}
            >
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(
                (
                  item // Gunakan filteredData untuk menampilkan data
                ) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td className="float float-end">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-xs text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-xs text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl mb-4">Add New Product</h2>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
            <label className="block mb-4">
              Price:
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
            <button
              onClick={handleAddProduct}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl mb-4">Edit Product</h2>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                value={editProduct.title}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, title: e.target.value })
                }
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
            <label className="block mb-4">
              Price:
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
            <button
              onClick={handleUpdateProduct}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Update
            </button>
            <button
              onClick={() => setShowEditModal(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={confirmDeleteProduct}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
