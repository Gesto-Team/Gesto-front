import { Outlet, createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../components/Login/Login";
import { AuthLayout } from "./AuthLayout";
import { ProtectedRoute } from "./ProtectedRoutes";
import DashboardPage from "../components/DashboardPage/DashboardPage";
import RegisterPage from "../components/Register/Register";
import { Products } from "@/components/ProductsList/Products";
import { SettingPage } from "@/components/Setting/SettingPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <App />,
        path: "/",
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },

          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            element: (
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            ),
            children: [
              {
                path: "/",
                element: <DashboardPage />,
              },
              {
                path: "products",
                element: <Products />,
              },
              {
                path: "setting",
                element: <SettingPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
