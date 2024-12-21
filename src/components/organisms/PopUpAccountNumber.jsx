const PopUpData = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Popup Container */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          &#x2715;
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Nomor Rekening Kampanye
        </h2>

        {/* Content */}
        <div className="space-y-4 text-gray-700">
          <p className="flex items-center">
            <span className="font-semibold w-40 mr-2">Nomor Rekening :</span>
            <span>{user.accountNumber || "N/A"}</span>
          </p>
          <p className="flex items-center">
            <span className="font-semibold w-40 mr-2">Nama Bank : </span>
            <span>{user.bankName || "N/A"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopUpData;
