import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectPath: string;
  children: JSX.Element;
}
export const ProtectedRoute = ({
  isAuthenticated,
  redirectPath = "/",
  children,
}: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};
