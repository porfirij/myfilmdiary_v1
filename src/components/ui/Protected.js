import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const Protected = (props) => {
  const AuthCtx = useSelector(AuthContext);
  let location = useLocation();

  if (!AuthCtx.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{props.children}</>;
};

export default Protected;
