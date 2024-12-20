import { RouterProvider } from "react-router-dom"; // Import RouterProvider
import routes from "./config/routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <RouterProvider router={routes} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;

