import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance as api } from "../../config/axiosInstance.js";
import { toast } from "react-toastify";

const AddCategory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data yang dikirim:", formData);
    try {
      await api.post(`/category`, formData);

      toast.success("Kategori berhasil ditambah!");
      navigate("/category");
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      toast.error("Gagal menambahkan kategori, silakan coba lagi.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-6">Tambah Kategori</h1>

      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Nama Kategori
          </label>
          <input
            type="text" // Perbaikan di sini
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            Deskripsi
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
            required
          ></textarea>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate("/category")}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
