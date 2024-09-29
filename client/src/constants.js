const backendApiUrl = 'http://localhost:5000/api';

const routes = {
  BACKUP: 'backup',
  AUTH: 'auth',
  BOOK: 'books',
  BORROWAL: 'borrowals',
  USER: 'users',
  IMAGES: 'images',
  CATEGORY: 'categories',
};

const methods = {
  GET: 'get',
  POST: 'add',
  PUT: 'update',
  DELETE: 'delete',
};

const apiUrl = (route, id = '') => `${backendApiUrl}/${route}${id && `/${id}`}`;

module.exports = { routes, methods, apiUrl };
