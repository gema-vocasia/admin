import { createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  User,
  Category,
  Campaign, Login,
  EditCategory,
  AddCategory,
  EditCampaign,
  AddCampaign,
} from "../pages";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />, // Halaman utama dashboard
  },
  {
    path: "/login",
    element: <Login />,
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
    path: "/add-campaign",
    element: <AddCampaign />,
  },
  {
    path: "/edit-campaign",
    element: <EditCampaign />,
  },
]);

export default routes;
