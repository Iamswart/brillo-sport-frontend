import { createBrowserRouter } from "react-router-dom";
import AddSportsPage from "./pages/AddSportsPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ErrorPage from "./pages/ErrorPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Layout from "./pages/Layout";
import LoggedOutRoute from "./pages/LoggedOutRoute";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import RegistrationSuccess from "./pages/RegistrationSuccessPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SettingsPage from "./pages/SettingsPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import VerifyPhoneOtpPage from "./pages/VerifyPhoneOtpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <LoggedOutRoute>
            <RegisterPage />
          </LoggedOutRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <LoggedOutRoute>
            <LoginPage />
          </LoggedOutRoute>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <LoggedOutRoute>
            <ForgotPasswordPage />
          </LoggedOutRoute>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <LoggedOutRoute>
            <ResetPasswordPage />
          </LoggedOutRoute>
        ),
      },
      {
        path: "/profile/dashboard",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/update-profile",
        element: (
          <ProtectedRoute>
            <UpdateProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/verify-email",
        element: (
          <ProtectedRoute>
            <VerifyEmailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/verify-phone",
        element: (
          <ProtectedRoute>
            <VerifyPhoneOtpPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/change-password",
        element: (
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/welcome",
        element: (
          <ProtectedRoute>
            <RegistrationSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/selects-sport",
        element: (
          <ProtectedRoute>
            <AddSportsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/settings",
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
