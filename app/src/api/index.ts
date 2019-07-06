import axios from 'axios';
//process.env.REACT_APP_API_URL
const BASE_URL: string = process.env.REACT_APP_API_URL || '';
const urlBuilder = (path: string): string => {
  if (path.charAt(0) === '/') {
    return BASE_URL + path;
  }
  return BASE_URL + '/' + path;
};

const getAllMissing = async (): Promise<any> => {
  const endpoint = '/';
  const response = await axios.get(urlBuilder(endpoint));

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

const api = {
  registerUser,
  getAllMissing
};
export default api;
