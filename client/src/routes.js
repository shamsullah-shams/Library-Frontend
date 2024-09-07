import { Navigate, useRoutes } from 'react-router-dom';
import LibraryApp from './layouts/dashboard';
import LoginPage from './sections/auth/login/LoginPage';
import Page404 from './pages/Page404';
import BorrowalPage from './sections/@dashboard/borrowal/BorrowalPage';
import BookPage from './sections/@dashboard/book/BookPage';
import UsersPage from './sections/@dashboard/user/UserPage';
import { useAuth } from './hooks/useAuth';
import BookPage2 from './sections/@dashboard/gBooks';

// ----------------------------------------------------------------------

export default function Router() {
  const { user } = useAuth();
  const adminRoutes = useRoutes([
    {
      path: '/',
      element: <LibraryApp />,
      children: [
        { path: 'books', element: <BookPage /> },
        { path: 'borrowals', element: <BorrowalPage /> },
        { path: 'users', element: <UsersPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  const memberRoutes = useRoutes([
    {
      path: '/',
      element: <LibraryApp />,
      children: [
        { element: <Navigate to="/books" />, index: true },
        { path: 'books', element: <BookPage /> },
        { path: 'borrowals', element: <BorrowalPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  const guestRoutes = useRoutes([
    {
      path: 'student/books',
      element: <BookPage2 />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/student/books" replace />,
    },
  ]);

  if (user) {
    if (user.isAdmin) {
      return adminRoutes;
    }
    return memberRoutes;
  }
  return guestRoutes;
}
