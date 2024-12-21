import { useState } from "react";
import Swal from "sweetalert2";
import campaignStore from "../../store/campaignStore";

const PopUpUpdateCampaign = ({ campaign, updateCampaign }) => {
  const { getCampaigns } = campaignStore();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    title: campaign.title,
    description: campaign.description,
    goal: campaign.goal,
    isActive: campaign.isActive,
    bannerImage: campaign.bannerImage,
  });

  const closePopup = () => setShowPopup(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    Swal.fire({
      title: "Konfirmasi Perubahan",
      text: "Apakah Anda yakin ingin mengupdate data campaign ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Update!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        updateCampaign(campaign._id, formData);
        closePopup();
        Swal.fire("Berhasil!", "Data campaign berhasil diperbarui.", "success");
      }
    });
    getCampaigns();
  };

  const handleDeleteImage = () => {
    Swal.fire({
      title: "Apa Kau Yakin?",
      text: "Anda yakin ingin menghapus banner image!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData((prevData) => ({
          ...prevData,
          bannerImage: null,
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
            <h2 className="text-2xl font-bold mb-4">
              Update Campaign Information
            </h2>

            {/* Form untuk mengedit data */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Goal</label>
              <input
                type="number"
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Status Active */}
            <div className="mb-4 flex items-center">
              <label className="text-sm font-semibold mr-4">
                Active Status
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span
                  className={
                    formData.isActive ? "text-green-500" : "text-red-500"
                  }
                >
                  {formData.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Gambar Banner */}
            {formData.bannerImage ? (
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">
                  Banner Image
                </label>
                <div className="flex items-center">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/files/${
                      formData.bannerImage
                    }`}
                    alt="Banner Image"
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
              <p className="text-red-500 mt-4">Campaign Belum Upload Banner.</p>
            )}

            {/* Tombol Submit */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
              >
                Update Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpUpdateCampaign;