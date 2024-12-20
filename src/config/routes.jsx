import { createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  User,
  Category,
  Campaign,
  EditCategory,
  AddCategory,
  EditCampaign,
} from "../pages";
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
    path: "/category/edit/:id",
    element: <EditCategory />,
  },
  {
    path: "/add-category",
    element: <AddCategory />,
  },
  {
    path: "/campaign",
    element: <Campaign />,
  },
  {
    path: "/edit-campaign",
    element: <EditCampaign />,
  },
]);

export default routes;
