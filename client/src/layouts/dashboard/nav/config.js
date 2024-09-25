import { FiBookOpen, FiCheckCircle, FiUsers, FiDownloadCloud, FiChevronDown } from 'react-icons/fi';

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
    title: 'Backup',
    path: '/backup',
    icon: <FiDownloadCloud />,
  },
];

export const innerConfig = [
  {
    title: 'Computer Science',
    path: '/books/cs',
    icon: <FiBookOpen />,
  },
  {
    title: 'Medical',
    path: '/books/md',
    icon: <FiChevronDown />,
  },
  {
    title: 'Engineering',
    path: '/books/eng',
    icon: <FiCheckCircle />,
  },
  {
    title: 'Public Administration',
    path: '/books/pb',
    icon: <FiUsers />,
  },
  {
    title: 'Journalism',
    path: '/books/jrm',
    icon: <FiDownloadCloud />,
  },
];

export default navConfig;
