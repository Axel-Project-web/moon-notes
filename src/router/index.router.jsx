//react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//components
import App from "../App";
import FormLogin from "../components/Login/FormLogin";
import FormSingin from "../components/Singin/FormSingin";
import WrapperForm from "../components/WrapperForm/WrapperForm";
import Dashboard, { handleRequest } from "../components/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Some error</h1>,
    children: [
      {
        path: "/",
        element: <WrapperForm />,
        children: [
          {
            path: "/",
            element: <FormLogin />,
          },
          {
            path: "/singin",
            element: <FormSingin />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        action: handleRequest,
      },
    ],
  },
]);

export default function RouterApp() {
  return <RouterProvider router={router} />;
}
