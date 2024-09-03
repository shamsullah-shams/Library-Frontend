import { FiBookOpen, FiCheckCircle, FiUsers, FiBarChart2 } from 'react-icons/fi';

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
];

export default navConfig;
