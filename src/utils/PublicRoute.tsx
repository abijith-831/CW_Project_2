import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const user = useSelector((state: RootState) => state.auth.currentUser);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children; // allow access
}
