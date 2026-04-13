import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

interface ProtectedRouteProps {
  adminOnly?: boolean;
}

export default function ProtectedRoute({ adminOnly = false }: ProtectedRouteProps) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAdmin = user?.isAdmin || user?.user?.isAdmin;

  useEffect(() => {
    // Check for admin role if a user is present and the route is admin-only
    if (adminOnly && user && !isAdmin) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized Request',
        text: 'You are not authorized! Admin privileges are required.',
        confirmButtonColor: '#3085d6',
      });
    }
  }, [user, isAdmin, adminOnly]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />; 
  }

  return <Outlet />;
}
