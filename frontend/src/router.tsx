
import { createBrowserRouter } from "react-router-dom";
import AncestorsList from "./AncestorsList";
import AncestorView from "./AncestorView";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ancestors",
    element: <AncestorsList />,
  },
  {
    path: "/ancestors/:id",
    element: <AncestorView />,
  }
]);

export default router;
