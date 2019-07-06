import axios from 'axios';
//process.env.REACT_APP_API_URL
const BASE_URL: string = 'https://jsonplaceholder.typicode.com';
const urlBuilder = (path: string): string => {
  if (path.charAt(0) === '/') {
    return BASE_URL + path;
  }
  return BASE_URL + '/' + path;
};

const getAllMissing = async (): Promise<any> => {
  const endpoint = '/posts'; // /missingpersons
  const response = await axios.get(urlBuilder(endpoint));

  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const updateProfile = async (data: any): Promise<any> => {
  const endpoint = '/posts'; // /updateProfile
  const response = await axios.post(urlBuilder(endpoint), data);

  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const addFoundPerson = async (): Promise<any> => {
  const endpoint = '/posts'; // /foundperson
  const response = await axios.post(urlBuilder(endpoint));

  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const registerUser = async (data: any): Promise<any> => {
  const endpoint = '/user/register';
  const response = await axios.post(urlBuilder(endpoint), data);
  console.log(response);
  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const login = async (data: any): Promise<any> => {
  const endpoint = '/posts'; // /login
  const response = await axios.post(urlBuilder(endpoint), data);

  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const api = {
  login,
  registerUser,
  getAllMissing,
  updateProfile,
  addFoundPerson
};
export default api;
