import React, { useEffect, useState } from "react";
import { axiosInstance as api } from "../../config/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch campaigns data
  const fetchCampaigns = async () => {
    try {
      const response = await api.get("/campaigns");
      setCampaigns(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await api.delete(`/campaign/${id}`);
      toast.success("Kampanye berhasil dihapus!");
      fetchCampaigns();
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast.error("Gagal menghapus kampanye. Silakan coba lagi.");
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "unpublish":
        return "bg-red-500 text-white";
      case "On Going":
        return "bg-yellow-500 text-white";
      case "done":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  // Loading state
  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-6">Campaigns Dashboard</h1>

      {/* Table Header */}
      <div className="hidden md:grid mb-4 mx-12 grid-cols-12 gap-4 items-center text-white text-lg font-semibold p-2 bg-[#5E84C5] rounded">
        <div className="col-span-2 text-center">Judul</div>
        <div className="col-span-2 text-center">Target</div>
        <div className="col-span-2 text-center">Total Donasi</div>
        <div className="col-span-1 text-center">Status</div>
        <div className="col-span-1 text-center">Transfer</div>
        <div className="col-span-2 text-center">Detail</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>

      {/* Table Body */}
      <div className="space-y-4 mx-2 md:mx-12">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-3 rounded-lg hover:bg-gray-50 border border-gray-200"
            >
              {/* Title */}
              <div className="col-span-1 md:col-span-2">
                <span className="font-bold md:hidden">Judul: </span>
                {campaign.title}
              </div>

              {/* Target */}
              <div className="col-span-1 md:col-span-2 text-center">
                <span className="font-bold md:hidden">Target: </span>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(campaign.targetAmount)}
              </div>

              {/* Total Donation */}
              <div className="col-span-1 md:col-span-2 text-center">
                <span className="font-bold md:hidden">Total Donasi: </span>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(campaign.totalDonation)}
              </div>

              {/* Status */}
              <div
                className={`col-span-1 md:col-span-1 text-center py-1 rounded ${getStatusBackgroundColor(
                  campaign.statusCampaign
                )}`}
              >
                <span className="font-bold md:hidden">Status: </span>
                {campaign.statusCampaign}
              </div>

              {/* Transfer Status */}
              <div className="col-span-1 md:col-span-1 text-center">
                <span className="font-bold md:hidden">Transfer: </span>
                {campaign.statusTransfer || "-"}
              </div>

              {/* Detail Button */}
              <div className="col-span-1 md:col-span-2 text-center">
                <button
                  onClick={() => navigate(`/campaign/detail/${campaign._id}`)}
                  className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  title="Detail"
                >
                  Detail
                </button>
              </div>

              {/* Actions */}
              <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:space-x-2 justify-center">
                <button
                  onClick={() => navigate(`/campaign/edit/${campaign._id}`)}
                  className="w-full md:w-auto px-4 py-2 mb-2 md:mb-0 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(campaign._id)}
                  className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  title="Delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-gray-500">
            No Campaigns found
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
