import { createBrowserRouter } from "react-router-dom";
import { Dashboard, User, Category, Campaign } from "../pages";
import { Navbar } from "../components/templates";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />, // Halaman utama dashboard
  },
  {
    path: "/Navbar",
    element: <Navbar />,
  },
  {
    path: "/user",
    element: <User />, // Halaman untuk manajemen pengguna
  },
  {
    path: "/category",
    element: <Category />, // Halaman kategori
  },
  {
    path: "/campaign",
    element: <Campaign />, // Halaman kampanye
  },
]);

export default routes;