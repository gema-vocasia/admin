import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../atoms";

const navigation = [
  { name: "Beranda", to: "/" },
  { name: "User", to: "/user" },
  { name: "Kategori", to: "/category" },
  { name: "Kampanye", to: "/campaign" },
];

const LoginButton = () => (
  <Link
    to="/login"
    className="inline-flex items-center justify-center px-4 py-2 border border-[#5E84C5] text-sm font-medium rounded-md text-[#5E84C5] hover:bg-[#5E84C5] hover:text-white transition-colors duration-200"
  >
    Masuk
  </Link>
);

const Navbar = () => {
  const location = useLocation();
  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: location.pathname === item.to,
  }));

  return (
    <Disclosure as="nav" className="bg-white shadow-md sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center sm:space-x-4">
                {/* Mobile menu button */}
                <div className="sm:hidden flex items-center">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-[#5E84C5] hover:bg-[#5E84C5] hover:text-white">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>

                {/* Logo - now with proper spacing on mobile */}
                <div className="ml-2 sm:ml-0">
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

              {/* Login button */}
              <div className="flex items-center">
                <LoginButton />
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
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
