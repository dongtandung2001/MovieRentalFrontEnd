import { Outlet, Navigate, useLocation } from "react-router-dom";
import auth from "../../services/authService";
import withRouter from "../loginForm";

const PrivateRoutes = (props) => {
  const user = auth.getCurrentUser();
  const location = useLocation();
  console.log("location", location);
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location.pathname }} /> // pass state object throguh Navigate component, access in Component using useLocation
  );
};

export default PrivateRoutes;
