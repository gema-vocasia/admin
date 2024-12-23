import React, { useEffect, useState } from "react";
import { Users, FileText, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import userStore from "../../store/userStore";
import campaignStore from "../../store/campaignStore";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCampaigns: 0,
    totalDonations: 0,
    monthlyDonations: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Get store actions and state
  const { user, getUsers } = userStore();
  const { campaign, getCampaigns } = campaignStore();

  // Format currency to Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        await getUsers();
        await getCampaigns();

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [getUsers, getCampaigns]);

  useEffect(() => {
    if (user) {
      const nonAdminUsers = user.filter((user) => user.role !== "ADMIN");
      setStats((prevStats) => ({
        ...prevStats,
        totalUsers: nonAdminUsers.length,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (campaign) {
      const totalDonationsSum = campaign.reduce(
        (sum, camp) => sum + (camp.totalDonation || 0),
        0
      );
      setStats((prevStats) => ({
        ...prevStats,
        totalCampaigns: campaign.length,
        totalDonations: totalDonationsSum,
      }));
    }
  }, [campaign]);

  const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
    <div
      className={`p-6 bg-white rounded-lg shadow-md flex items-center space-x-4`}
    >
      <div className={`p-4 rounded-full ${bgColor}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">
          {title === "Total Donasi"
            ? formatRupiah(value)
            : value.toLocaleString()}
        </h3>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5E84C5]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard Admin</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total User"
          value={stats.totalUsers}
          icon={Users}
          color="text-white"
          bgColor="bg-blue-500"
        />
        <StatCard
          title="Total Kampanye"
          value={stats.totalCampaigns}
          icon={FileText}
          color="text-white"
          bgColor="bg-green-500"
        />
        <StatCard
          title="Total Donasi"
          value={stats.totalDonations}
          icon={DollarSign}
          color="text-white"
          bgColor="bg-purple-500"
        />
      </div>

      {/* Monthly Donations Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Grafik Donasi Bulanan</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.monthlyDonations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) =>
                  new Intl.NumberFormat("id-ID", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)
                }
              />
              <Tooltip
                formatter={(value) => [formatRupiah(value), "Jumlah Donasi"]}
                labelFormatter={(label) => `Bulan ${label}`}
              />
              <Bar dataKey="amount" fill="#5E84C5" name="Jumlah Donasi" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
