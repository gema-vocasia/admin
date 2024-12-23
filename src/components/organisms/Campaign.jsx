import { useEffect, useState } from "react";
import { axiosInstance as api } from "../../config/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CampaignDropdown from "../templates/Button.jsx";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Anda harus login terlebih dahulu!");
      navigate("/admin-login");
    }
  }, [navigate]);

  // Fetch campaigns data
  const fetchCampaigns = async () => {
    try {
      const response = await api.get("/campaigns/admin");
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

  //
  // Handle publish action
  const handlePublish = async (id) => {
    try {
      // Kirimkan PATCH request untuk mengubah status kampanye menjadi "On Going"
      await api.patch(`/campaign/${id}/status/On%20Going`); // Menyesuaikan dengan format controller yang mengharuskan dua parameter di URL
      toast.success("Kampanye berhasil dipublikasikan!");
      fetchCampaigns(); // Memuat ulang data kampanye setelah update
    } catch (error) {
      console.error("Error publishing campaign:", error);
      toast.error("Gagal mempublikasikan kampanye. Silakan coba lagi.");
    }
  };

  const handleTransfer = async (id) => {
    const response = await api.get(`/campaign/${id}`);
    console.log(response.data.accountNumber);
    const accountNumber = response.data.accountNumber;

    if (accountNumber === null) {
      toast.error("User belum meminta pencairan dana.");
      return;
    }
    try {
      await api.patch(`/campaign/${id}/transfer/Success`);
      toast.success("Kampanye berhasil dipublikasikan!");
      fetchCampaigns();
    } catch (error) {
      console.error("Error publishing campaign:", error);
      toast.error("Gagal mempublikasikan kampanye. Silakan coba lagi.");
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "Unpublish":
        return "bg-red-500 text-white";
      case "On Going":
        return "bg-yellow-500 text-white";
      case "Done":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const getStatusTransferBackgroundColor = (status) => {
    switch (status) {
      case "On Progress":
        return "bg-yellow-500 text-white";
      case "Success":
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
      <div className="flex items-center mx-12 mb-4">
        <h2 className="text-2xl font-bold bg-[#5E84C5] text-white p-2 rounded">
          Campaign
        </h2>
        <button
          onClick={() => navigate("/add-campaign")}
          className="ml-auto px-6 flex space-x-2 py-2 bg-[#5E84C5] text-white rounded-lg hover:bg-[#3f609b]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>Tambah Kampanye</span>
        </button>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid mb-4 mx-12 grid-cols-6 gap-4 items-center text-white text-lg font-semibold p-2 bg-[#5E84C5] rounded">
        <div className=" text-center">Judul</div>
        <div className=" text-center">Target</div>
        <div className=" text-center">Total Donasi</div>
        <div className=" text-center">Status</div>
        <div className=" text-center">Transfer</div>
      </div>

      {/* Table Body */}
      <div className="space-y-4 mx-2 md:mx-12">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className=" w-full grid grid-cols-1 md:grid-cols-6 gap-4 items-center p-3 rounded-lg hover:bg-gray-50 border border-blue-200"
            >
              {/* Title */}
              <div className="col-span-1 text-start">
                <span className="font-bold md:hidden">Judul: </span>
                {campaign.title}
              </div>

              {/* Target */}
              <div className="col-span-1 text-center">
                <span className="font-bold md:hidden">Target: </span>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(campaign.targetAmount)}
              </div>

              {/* Total Donation */}
              <div className="col-span-1 text-center">
                <span className="font-bold md:hidden">Total Donasi: </span>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(campaign.totalDonation)}
              </div>

              {/* Status */}
              <div
                className={`col-span-1  text-center py-1 rounded ${getStatusBackgroundColor(
                  campaign.statusCampaign
                )}`}
              >
                <span className="font-bold md:hidden">Status: </span>
                {campaign.statusCampaign}
              </div>

              {/* Transfer Status */}
              <div
                className={`col-span-1  text-center py-1 rounded ${getStatusTransferBackgroundColor(
                  campaign.statusTransfer
                )}`}
              >
                <span className="font-bold md:hidden">Transfer: </span>
                {campaign.statusTransfer || "-"}
              </div>

              <div className="col-span-1  text-end">
                <CampaignDropdown
                  campaign={campaign}
                  navigate={navigate}
                  handlePublish={handlePublish}
                  handleTransfer={handleTransfer}
                  handleDelete={handleDelete}
                />
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
