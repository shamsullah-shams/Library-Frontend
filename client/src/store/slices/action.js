import axios from 'axios';
import { apiUrl, routes } from '../../constants';
import { categoryActions } from './categories';

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(apiUrl(routes.CATEGORY), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(categoryActions.setCategories(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
