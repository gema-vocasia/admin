import { useState } from "react";

const PopUpData = ({ user }) => {
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => setShowPopup(false);

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
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
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
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            <p>
              <strong>ID:</strong> {user._id}
            </p>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phoneNumber}
            </p>
            <div className="flex">
              <p>
                <strong>Verified:</strong>
              </p>
              {user.verified ? (
                <p className="text-green-500 w-36">Verified</p>
              ) : (
                <p className="text-red-500 w-36">Not Verified</p>
              )}
            </div>
            <div className="flex">
              <p>
                <strong>KYC:</strong>
              </p>
              {user.isKYC ? (
                <p className="text-green-500 w-36">Verified</p>
              ) : (
                <p className="text-red-500 w-36">Not Verified</p>
              )}
            </div>

            {/* Gambar KTP */}
            {user?.nationalIdentityCard && (
              <div className="mt-4 flex justify-center">
                <img
                  src={`http://localhost:8080/api/v1/files/${user.nationalIdentityCard}`}
                  alt="National Identity Card"
                  className="max-w-full max-h-48 rounded border"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpData;
