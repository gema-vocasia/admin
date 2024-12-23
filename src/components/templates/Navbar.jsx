import { Disclosure, DisclosurePanel } from "@headlessui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../atoms";
import { useAuth } from "../../config/auth.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navigation = [
  { name: "Beranda", to: "/" },
  { name: "User", to: "/user" },
  { name: "Kategori", to: "/category" },
  { name: "Kampanye", to: "/campaign" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: location.pathname === item.to,
  }));

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Berhasil logout!", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/admin-login");
    } catch (error) {
      toast.error("Gagal logout. Silakan coba lagi.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-md sticky top-0 z-20">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center">
                {/* Logo */}
                <div>
                  <Logo />
                </div>
              </div>

              {/* Desktop navigation */}
              <div className="hidden sm:flex flex-1 items-center justify-center">
                <div className="flex space-x-4">
                  {updatedNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={`${
                        item.current
                          ? "text-[#5E84C5] font-medium"
                          : "text-gray-600 hover:text-[#5E84C5]"
                      } px-3 py-2 text-sm rounded-md`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Logout Button - Desktop */}
              <div className="hidden sm:block">
                <button
                  onClick={handleLogout}
                  className="bg-[#5E84C5] hover:bg-[#4A6F98] text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 ease-in-out"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {updatedNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`${
                    item.current
                      ? "text-[#5E84C5] font-medium"
                      : "text-gray-600 hover:text-[#5E84C5]"
                  } block px-3 py-2 text-base rounded-md`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Logout Button - Mobile */}
              <button
                onClick={handleLogout}
                className="w-full text-left bg-[#5E84C5] hover:bg-[#4A6F98] text-white px-3 py-2 rounded-md text-base mt-2 transition-all duration-300 ease-in-out"
              >
                Logout
              </button>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
