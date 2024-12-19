import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ArrowRightStartOnRectangleIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { ActionButton } from "../atoms";

const LoginRegisterButton = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center rounded-lg bg-[#5E84C5] px-4 py-2 text-white shadow-xl hover:bg-[#476BA6] focus:outline-none focus:ring-2 focus:ring-[#5E84C5] focus:ring-offset-2">
        Selamat Datang
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <ActionButton
          text="Masuk"
          icon={
            <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-[#5E84C5]" />
          }
          to="/login"
        />
        <ActionButton
          text="Daftar"
          icon={<UserPlusIcon className="h-5 w-5 text-[#5E84C5]" />}
          to="/register"
        />
      </MenuItems>
    </Menu>
  );
};

export default LoginRegisterButton;
