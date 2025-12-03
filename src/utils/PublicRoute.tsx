import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import * as React from "react";

export default function PublicRoute({ children }: { children: React.JSX.Element }) {
  const user = useSelector((state: RootState) => state.auth.currentUser);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children; // allow access
}
