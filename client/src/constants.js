const backendApiUrl = 'http://localhost:5000/api';

const routes = {
  AUTHOR: 'author',
  AUTH: 'auth',
  BOOK: 'books',
  BORROWAL: 'borrowal',
  GENRE: 'genre',
  USER: 'user',
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
