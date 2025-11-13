import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "../pages/login";
import MemberPage from "../pages/member";
import MyPage from "../pages/mypage";
import SignupPage from "../pages/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/mypage/members",
    Component: MemberPage,
  },
  {
    path: "/mypage",
    Component: MyPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
]);

export default router;
