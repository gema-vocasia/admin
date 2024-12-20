import { useEffect } from "react";
import userStore from "../store/userStore";
import { PopUpData, PopUpUpdate } from "../components/organisms";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Navbar}  from "../components/templates"; // Import NavBar

const User = () => {
  const { user, getUsers, deleteUser, updateUser } = userStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleDelete = (userId) => {
    // Menampilkan konfirmasi sebelum menghapus user
    Swal.fire({
      title: "Apakah Yakin?",
      text: "Anda yakin ingin menghapus user ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Tidak, Batalkan!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika dikonfirmasi, panggil deleteUser dari store
        deleteUser(userId);
        getUsers();
        Swal.fire("Berhasil!", "User berhasil dihapus.", "success");
      } else {
        Swal.fire("Batal", "User tidak jadi dihapus.", "error");
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Tambahkan NavBar di sini */}
      <Navbar />


      {/* Header */}
      <div className="my-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold bg-[#5E84C5] text-white p-2 rounded">
              Users
            </h2>
          </div>
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 pl-10 w-full border border-gray-300 rounded"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="text-white grid grid-cols-6 gap-4 text-lg font-semibold p-2 bg-[#5E84C5] rounded">
          <div>Name</div>
          <div>Email</div>
          <div>Phone Number</div>
          <div>Status</div>
          <div>KYC</div>
          <div className="text-center">Actions</div>
        </div>
        <hr />
      </div>

      {/* List of users */}
      <div className="space-y-1">
        {user.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-6 gap-4 items-center p-3 rounded-lg hover:bg-gray-50 border border-gray-200"
          >
            <div>{item.name}</div>
            <div>{item.email}</div>
            <div>{item.phoneNumber}</div>
            {item.verified ? (
              <div className="text-white">
                <p className="bg-green-500 text-center p-1 rounded w-36">
                  Verified
                </p>
              </div>
            ) : (
              <div className="text-white">
                <p className="bg-red-500 text-center p-1 rounded w-36">
                  Not Verified
                </p>
              </div>
            )}
            <div className="text-white">
              {item.isKYC ? (
                <p className="bg-green-500 text-center p-1 rounded w-36">
                  Verified
                </p>
              ) : (
                <p className="bg-red-500 text-center p-1 rounded w-36">
                  Not Verified
                </p>
              )}
            </div>
            <div className="flex justify-center space-x-2">
              {/* Tombol untuk memunculkan tombol dan Pop-Up */}
              <PopUpData user={item} />

              

              {/* Tombol untuk update user */}
              <PopUpUpdate user={item} updateUser={updateUser} />

              <button
                onClick={() => handleDelete(item._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
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
        ))}
      </div>
    </div>
  );
};

export default User;
