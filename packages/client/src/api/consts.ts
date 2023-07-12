export const API_URL = 'http://localhost:5000';
export const CSRF_TOKEN_NAME = '_csrf-token';

export const options: OptionsType = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'X-CSRF-Token': ''
  },
  credentials: 'include'
};



