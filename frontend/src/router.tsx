import { createBrowserRouter, useSearchParams } from "react-router-dom";
import AncestorsList from "./AncestorsList";
import AncestorView from "./AncestorView";
import AncestorNewForm from "./ancestors/AddAncestor/AncestorNewForm";
import Search from "./components/Search/Search";
import App from "./App";
import SingleFileUploader from "./components/SingleFileUploader/SingleFileUploader";
import Home from "./pages/Home";
import MainLayout from "./components/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
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
        element: (
          <Search
            searchValues={{
              firstname: "",
              lastname: "",
              birthdate: "",
              birthdateStart: "",
              birthdateEnd: "",
              deathDate: "",
            }}
          />
        ),
      },
    ],
  },
]);

export default router;
