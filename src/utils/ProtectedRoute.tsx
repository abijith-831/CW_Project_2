import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import * as React from "react";



export default function ProtectedRoute({ children }: { children: React.JSX.Element }) {
  const user = useSelector((state: RootState) => state.auth.currentUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children; 
}
