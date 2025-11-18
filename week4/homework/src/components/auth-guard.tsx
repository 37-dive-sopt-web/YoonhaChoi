import { Navigate, Outlet } from 'react-router';
const AuthGuard = () => {
  const userId = localStorage.getItem('user_id');

  if (!userId) {
    return <Navigate to="/login" replace />; 
  }

  return <Outlet />;

};

export default AuthGuard;