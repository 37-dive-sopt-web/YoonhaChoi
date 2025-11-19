import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "../pages/login/login";
import MemberPage from "../pages/member/member";
import MyPage from "../pages/mypage/mypage";
import SignupPage from "../pages/signup/signup";
import Header from "../components/header/header";
import AuthGuard from "../components/auth-guard";
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
    path: "/signup",
    Component: SignupPage,
  },

   {
    element: <AuthGuard />,
    children: [
        {
            Component: Header, 
            children: [
              {
                path: "mypage",
                Component: MyPage,
              },
              {
                path: "mypage/members",
                Component: MemberPage,
              },
            ],
        },
    ],
  },
]);

export default router;
