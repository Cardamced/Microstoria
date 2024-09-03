import { createBrowserRouter } from "react-router-dom";
import AncestorsList from "./AncestorsList";
import AncestorView from "./AncestorView";
import AncestorNewForm from "./ancestors/AddAncestor/AncestorNewForm";
import Search from "./components/Search/Search";
import App from "./App";
import SingleFileUploader from "./components/SingleFileUploader/SingleFileUploader";

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
  {
    path: "/search",
    element: <Search searchValues={{ firstname: "", lastname: "", birthdate: "", deathDate: "" }} />,
  },
]);

export default router;
