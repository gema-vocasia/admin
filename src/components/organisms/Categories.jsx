import React, { useEffect, useState } from "react";
import { axiosInstance as api } from "../../config/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Anda harus login terlebih dahulu!");
      navigate("/admin-login");
    }
  }, [navigate]);

  async function fetchCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.categories);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/category/${id}`);
      toast.success("Kategori berhasil dihapus!");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Gagal menghapus kategori. Silakan coba lagi.");
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-6">Categories Dashboard</h1>

      <div className="mb-4 mx-12 space-y-3">
        {/* Add Button */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-[#5E84C5] text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            onClick={() => navigate("/add-category")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Tambah
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 items-center text-white text-lg font-semibold p-2 bg-[#5E84C5] rounded">
          <div className="col-span-2">Nama</div>
          <div className="col-span-3">Deskripsi</div>
          <div className="text-center">Actions</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="space-y-2 mx-12">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="grid grid-cols-6 gap-4 items-center p-3 rounded-lg hover:bg-gray-50 border border-gray-200"
            >
              <div className="col-span-2">{category.title}</div>
              <div className="col-span-3">{category.description}</div>
              <div className="flex justify-center space-x-2">
                {/* Edit Button */}
                <button
                  onClick={() => navigate(`/category/edit/${category._id}`)}
                  className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  title="Edit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(category._id)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  title="Delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-gray-500">
            No categories found
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
