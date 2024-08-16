import { createBrowserRouter } from "react-router-dom";
import AncestorsList from "./AncestorsList";
import AncestorView from "./AncestorView";
import AncestorNewForm from "./AncestorNewForm";
import App from "./App";
import SingleFileUploader from "./components/SingleFileUploader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ancestors",
    element: <AncestorsList id={0} />,
  },
  {
    path: "/ancestors/:id",
    element: <AncestorView ancestorId={0} />,
  },
  {
    path: "/ancestors/new",
    element: <AncestorNewForm />,
  },
]);

export default router;
