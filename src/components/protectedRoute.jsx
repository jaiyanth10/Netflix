import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
export default function protectedRoute({ children }) {
  const { user } = UserAuth();

  {
    if (user) {
      if (user.email) {
        return children;
      } else {
        return <Navigate to="/" />;
      }
    } else {
      alert("please Login!");
      return <Navigate to="/"/>
    }
  }
}
