import React, { useState } from "react";
import PopUpData from "../organisms/PopUpAccountNumber";

const CampaignDropdown = ({
  campaign,
  navigate,
  handlePublish,
  handleTransfer,
  handleDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleAction = (action) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-2"
      >
        <span>Actions</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 py-1">
            {/* Detail Button */}
            <button
              onClick={() => {
                setShowPopup(true);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 text-blue-600"
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
                  d="M12 3l8 4v6c0 5-4 9-8 9s-8-4-8-9V7l8-4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12c1.657 0 3-1.343 3-3S13.657 6 12 6 9 7.343 9 9s1.343 3 3 3z"
                />
              </svg>
              <span>Nomor Rekening</span>
            </button>

            {/* Update Button */}
            <button
              onClick={() =>
                handleAction(() =>
                  navigate(`/campaigns/update/${campaign._id}`)
                )
              }
              className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 text-blue-600"
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
              <span>Update</span>
            </button>

            {/* Publish Button */}
            <button
              onClick={() => handleAction(() => handlePublish(campaign._id))}
              className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 text-yellow-500"
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
                  d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                />
              </svg>
              <span>Publish</span>
            </button>

            {/* Done Button */}
            <button
              onClick={() => handleAction(() => handleTransfer(campaign._id))}
              className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 text-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10l4-4m0 0l4 4m-4-4v12m14-6l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>Transfer</span>
            </button>

            {/* Delete Button */}
            <button
              onClick={() => handleAction(() => handleDelete(campaign._id))}
              className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 text-red-500"
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
              <span>Delete</span>
            </button>
          </div>
        </>
      )}

      {showPopup && (
        <PopUpData
          user={campaign} // Kirim data campaign ke popup
          onClose={() => setShowPopup(false)} // Tutup popup
        />
      )}
    </div>
  );
};

export default CampaignDropdown;
