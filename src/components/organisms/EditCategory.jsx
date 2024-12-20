import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance as api } from "../../config/axiosInstance.js";
import { toast } from "react-toastify";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch kategori berdasarkan ID
  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await api.get(`/category/${id}`);
        setFormData({
          title: response.data.title,
          description: response.data.description,
        });
        setIsLoading(false);
      } catch (error) {
        setError("Gagal memuat data kategori. Silakan coba lagi.");
        setIsLoading(false);
      }
    }

    fetchCategory();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data yang dikirim:", formData);
    try {
      await api.put(`/category/edit/${id}`, formData);

      toast.success("Kategori berhasil diedit!");
      navigate("/category");
    } catch (error) {
      toast.error("Gagal memperbarui kategori, silakan coba lagi.");
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">Memuat data kategori...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-6">Edit Kategori</h1>

      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Nama Kategori
          </label>
          <input
            type="text"
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

export default EditCategory;
