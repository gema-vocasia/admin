import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import campaignStore from "../../store/campaignStore";

const PopUpUpdateCampaign = ({ campaign }) => {
  const { getCampaigns, updateCampaign } = campaignStore();
  const [showPopup, setShowPopup] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: campaign.title,
    description: campaign.description,
    targetAmount: campaign.targetAmount,
    statusCampaign: campaign.statusCampaign,
    isUrgent: campaign.isUrgent,
    photo: campaign.photo,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
  });

  // Efek untuk memperbarui preview thumbnail saat thumbnail berubah
  useEffect(() => {
    if (thumbnail) {
      setThumbnailPreview(URL.createObjectURL(thumbnail));
    } else if (formData.photo) {
      setThumbnailPreview(
        `${import.meta.env.VITE_BASE_URL}/files/${formData.photo}`
      );
    }
  }, [thumbnail, formData.photo]); // Akan dijalankan setiap kali `thumbnail` atau `formData.photo` berubah

  const closePopup = () => setShowPopup(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    // Log data yang akan dikirim
    console.log("Data yang akan dikirim:", formData, thumbnail);

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
        updateCampaign(campaign._id, formData, thumbnail);
        closePopup();
        Swal.fire("Berhasil!", "Data campaign berhasil diperbarui.", "success");
      }
    });
    getCampaigns();
  };

  const handleDeleteImage = () => {
    Swal.fire({
      title: "Apa Kau Yakin?",
      text: "Anda yakin ingin menghapus foto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData((prevData) => ({
          ...prevData,
          photo: "", // Hapus foto dengan set photo ke kosong
        }));
        setThumbnail(null); // Reset thumbnail yang diunggah
        setThumbnailPreview(null); // Reset preview thumbnail
        Swal.fire("Deleted!", "Foto berhasil dihapus.", "success");
      }
    });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "Ukuran File Terlalu Besar",
          text: "Ukuran maksimum file adalah 5MB.",
          confirmButtonText: "OK",
        });
        e.target.value = ""; // Reset input
        return;
      }
      setThumbnail(file); // Simpan file
      setFormData((prevData) => ({
        ...prevData,
        photo: file.name, // Simpan nama file pada formData
      }));
    }
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
          <div className="text-left relative bg-white p-6 rounded-lg shadow-lg w-1/3">
            {/* Tombol Close */}
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4">Update Campaign</h2>

            {/* Form */}
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-2">Judul</label>
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
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Target</label>
              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4 flex justify-between items-center">
              <label className="block text-sm font-semibold mb-2">Urgent</label>
              <input
                type="checkbox"
                name="isUrgent"
                checked={formData.isUrgent}
                onChange={handleInputChange}
                className="mr-2"
              />
            </div>

            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-2">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-2">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Foto</label>
              {formData.photo || thumbnailPreview ? (
                <div className="flex-col items-center space-y-2 w-full">
                  <img
                    src={thumbnailPreview}
                    alt="Foto Campaign"
                    className="max-w-full max-h-48 rounded border"
                  />
                  <button
                    onClick={handleDeleteImage}
                    className="px-3 py-1 ml-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <div className="mt-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="mt-2"
                  />
                </div>
              )}
            </div>

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