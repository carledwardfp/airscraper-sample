import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  headers: {
    'x-rapidapi-key': process.env.EXPO_PUBLIC_API_KEY,
  },
});
