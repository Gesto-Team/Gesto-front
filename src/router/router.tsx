import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import LoginPage from "../components/Login/Login";
import { AuthLayout } from "./AuthLayout";
import { AdminRoute, ProtectedRoute } from "./ProtectedRoutes";
import DashboardPage from "../components/DashboardPage/DashboardPage";
import RegisterPage from "../components/Register/Register";
import { Products } from "@/components/ProductsList/Products";
import { SettingPage } from "@/components/Setting/SettingPage";
import { Navbar } from "@/components/Navbar/Navbar";
import Charts from "@/components/charts/Charts";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <App />,
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
                <Navbar />
              </ProtectedRoute>
            ),
            children: [
              {
                path: "/dashboard",
                element: <DashboardPage />,
              },
              {
                path: "products",
                element: <Products />,
              },
              {
                path: "charts",
                element: <Charts />,
              },
              {
                path: "setting",
                element: (
                  <AdminRoute>
                    <SettingPage />
                  </AdminRoute>
                ),
              },
              {
                path: "*",
                element: <Navigate to="/dashboard" />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
