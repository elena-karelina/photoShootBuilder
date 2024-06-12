import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/main/main";
import Register from "./pages/register/register";
import Layout from "./components/layout/layout";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Menu from "./pages/menu/menu";

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
        {
          path: "/menu",
          element: <Menu />,
        },
      ],
    },
  ],
  {
    basename: "/photoShootBuilder",
  }
);

export default router;