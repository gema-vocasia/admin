import { createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  User,
  Category,
  Campaign, Login,
  EditCategory,
  AddCategory,
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
    element: <Campaign />, // Halaman kampanye
  },
]);

export default routes;
