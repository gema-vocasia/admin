import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";

const userStore = create((set, get) => ({
  user: [],

  // Read
  getUsers: async () => {
    try {
      const res = await api.get("/admin/users/");
      const filteredUsers = res.data.filter((user) => user.role !== "ADMIN");

      set({ user: filteredUsers });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  // Update an existing user
  updateUser: async (userId, updatedUser) => {
    try {
      await api.put(`/admin/update/user/${userId}`, updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },

  // Delete a user
  deleteUser: async (userId) => {
    try {
      const res = await api.patch(`/user/delete/${userId}`);

      console.log(res.data);

      console.log("User deleted:", userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },

  userKYC: async (userId) => {
    try {
      const res = await api.patch(`/user/kyc/${userId}`);
      get().getUsers();

      console.log("User KYC updated:", res.data);
    } catch (error) {
      console.error("Error updating user KYC:", error);
    }
  },
}));

export default userStore;
