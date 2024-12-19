import { MenuItem } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const ActionButton = ({ text, icon, to }) => {
  const navigate = useNavigate();
  return (
    <MenuItem>
      <button
        onClick={() => navigate(to)}
        className="flex items-center w-full px-4 py-2 text-sm text-black hover:bg-gray-100"
      >
        {icon}
        <span className="ml-2">{text}</span>
      </button>
    </MenuItem>
  );
};

export default ActionButton;