import { FiBookOpen, FiCheckCircle, FiUsers, FiDownloadCloud } from 'react-icons/fi';

const navConfig = [
  {
    title: 'Books',
    path: '/books',
    icon: <FiBookOpen />,
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

export default navConfig;
