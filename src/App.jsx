import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import SkeletonLoader from "./components/SkeletonLoader";
import AuthProtectedRoute from "./protectedRoutes/AuthProtectedRoute";
import DashboardProtectedRoute from "./protectedRoutes/dashboardProtectedRoute";

const LoginPage = lazy(() => import("./Pages/LoginPage"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<SkeletonLoader />}>
          <DashboardProtectedRoute>
            <Dashboard />
          </DashboardProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<SkeletonLoader />}>
          <AuthProtectedRoute>
            <LoginPage />
          </AuthProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<SkeletonLoader />}>
          <NotFoundPage />
        </Suspense>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}
