const backendApiUrl = 'http://10.10.12.45:5000/api';

const routes = {
  AUTHOR: 'author',
  AUTH: 'auth',
  BOOK: 'books',
  BORROWAL: 'borrowal',
  GENRE: 'genre',
  USER: 'users',
  IMAGES: 'images',
};

const methods = {
  GET: 'get',
  GET_ALL: 'getAll',
  POST: 'add',
  PUT: 'update',
  DELETE: 'delete',
};

const apiUrl = (route, id = '') => `${backendApiUrl}/${route}${id && `/${id}`}`;

module.exports = { routes, methods, apiUrl };
