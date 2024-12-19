import { RouterProvider } from "react-router-dom"; // Import RouterProvider
import routes from "./config/routes";

function App() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
