import { FiBookOpen, FiCheckCircle, FiUsers, FiDownloadCloud, FiChevronDown, FiCheck } from 'react-icons/fi';

const navConfig = [
  {
    title: 'Books',
    path: '/books',
    icon: <FiBookOpen />,
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: <FiChevronDown />,
  },
  {
    title: 'Borrowals',
    path: '/borrowals',
    icon: <FiCheckCircle />,
  },
  {
    title: 'Users',
    path: '/users',
    icon: <FiUsers />,
  },
  {
    title: 'Manage Categories',
    path: '/manageCategory',
    icon: <FiCheck />,
  },
  {
    title: 'Backup',
    path: '/backup',
    icon: <FiDownloadCloud />,
  },
];

export default navConfig;
