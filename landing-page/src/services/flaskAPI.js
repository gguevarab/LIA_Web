// Api default file for books
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getBooks = () => axios.get(`${API_URL}/books`);
export const deleteBook = (name) => axios.delete(`${API_URL}/books/${name}`);

export const getMaterials = (name) => axios.get(`${API_URL}/books/${name}`);
export const addMaterial = (name) => axios.post(`${API_URL}/books/${name}`);

export const getGeneration = (name, title) => axios.get(`${API_URL}/books/${name}/gen/${title}`);
export const addGeneration = (name) => axios.post(`${API_URL}/books/${name}/gen`);
export const deleteGeneration = (name, title) => axios.delete(`${API_URL}/books/${name}/gen/${title}`);
