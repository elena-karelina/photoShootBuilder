import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/main/main";
import Register from "./pages/register/register";
import Layout from "./components/layout/layout";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ],
  {
    basename: "/photoShootBuilder",
  }
);

export default router;
