import { useState } from "react";
import { process } from "vite";
import Swal from "sweetalert2";
import userStore from "../../store/userStore";

const PopUpUpdate = ({ user, updateUser }) => {
  const { getUsers } = userStore();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    isKYC: user.isKYC,
    nationalIdentityCard: user.nationalIdentityCard,
  });

    const closePopup = () => setShowPopup(false);

  const  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = () => {
  Swal.fire({
    title: "Konfirmasi Perubahan",
    text: "Apakah Anda yakin ingin mengupdate data user ini?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Update!",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      // Mengirim data yang sudah diperbarui
      updateUser(user._id, formData);
      closePopup();
      Swal.fire("Berhasil!", "Data user berhasil diperbarui.", "success");
    }
  });
  getUsers();
};


  const handleDeleteImage = () => {
    Swal.fire({
      title: "Apa Kau Yakin?",
      text: "Anda yakin ingin menghapus KTP!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData((prevData) => ({
          ...prevData,
          nationalIdentityCard: null,
        }));
        Swal.fire("Deleted!", "The image has been deleted.", "success");
      }
    });
  };

  return (
    <>
      {/* Tombol untuk memunculkan Pop-Up */}
      <button
        onClick={() => setShowPopup(true)}
        className="px-4 py-2 bg-[#5E84C5] text-white rounded-lg hover:bg-[#3f609b]"
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>

      {/* Pop-Up */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-1/3">
            {/* Tombol Close */}
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            {/* Data yang ditampilkan di dalam Pop-Up */}
            <h2 className="text-2xl font-bold mb-4">Update User Information</h2>

            {/* Form untuk mengedit data */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Status KYC */}
            <div className="mb-4 flex items-center">
              <label className="text-sm font-semibold mr-4">KYC Status</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isKYC"
                  checked={formData.isKYC}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span
                  className={formData.isKYC ? "text-green-500" : "text-red-500"}
                >
                  {formData.isKYC ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>

            {/* Gambar KTP */}
            {formData.nationalIdentityCard ? (
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">
                  National Identity Card
                </label>
                <div className="flex items-center">
                  <img
                    src={`${process.env.VITE_BASE_URL}/files/${formData.nationalIdentityCard}`}
                    alt="National Identity Card"
                    className="max-w-full max-h-48 rounded border"
                  />
                  <button
                    onClick={handleDeleteImage}
                    className="px-3 py-1 ml-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-red-500 mt-4">User Belum Upload KTP.</p>
            )}

            {/* Tombol Submit */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpUpdate;