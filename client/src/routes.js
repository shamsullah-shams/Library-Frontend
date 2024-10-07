import { Navigate, useRoutes } from 'react-router-dom';
import LibraryApp from './layouts/dashboard';
import LoginPage from './sections/auth/login/LoginPage';
import Page404 from './pages/Page404';
import BorrowalPage from './sections/@dashboard/borrowal/BorrowalPage';
import BookPage from './sections/@dashboard/book/BookPage';
import UsersPage from './sections/@dashboard/user/UserPage';
import { useAuth } from './hooks/useAuth';
import BookPage2 from './sections/@dashboard/gBooks';
import Backup from './sections/@dashboard/backup/BackupPage';
import CategoryPage from './sections/@dashboard/category/CategoryPage';

// ----------------------------------------------------------------------

export default function Router() {
  const { user } = useAuth();

  const memberRoutes = useRoutes([
    {
      path: '/',
      element: <LibraryApp />,
      children: [
        { element: <Navigate to="/books" />, index: true },
        { path: 'books', element: <BookPage /> },
        { path: 'borrowals', element: <BorrowalPage /> },
        { path: 'category/:categoryId', element: <BookPage /> },
        { path: 'borrowals', element: <BorrowalPage /> },
        { path: 'users', element: <UsersPage /> },
        { path: 'backup', element: <Backup /> },
        { path: 'manageCategory', element: <CategoryPage /> },
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
      path: 'category/:categoryId',
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
    return memberRoutes;
  }
  return guestRoutes;
}
