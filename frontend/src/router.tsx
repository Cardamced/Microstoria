
import { createBrowserRouter } from "react-router-dom";
import AncestorsList from "./AncestorsList";
import AncestorView from "./AncestorView";
import AncestorNewForm from "./AncestorNewForm";
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
  },
  {
    path: "/ancestors/new",
    element: <AncestorNewForm />,
  }
]);

export default router;
