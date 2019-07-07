import axios from 'axios';
//process.env.REACT_APP_API_URL
// axios.defaults.withCredentials = true;

const BASE_URL: string = 'http://angelhackfmb.mybluemix.net';
const urlBuilder = (path: string): string => {
  if (path.charAt(0) === '/') {
    return BASE_URL + path;
  }
  return BASE_URL + '/' + path;
};

const getAllMissing = async (): Promise<any> => {
  const token = document.cookie.replace('token=', '');
  const endpoint = `missingpersons?session_id=${token}`; // /missingpersons

  const response = await axios.get(urlBuilder(endpoint));

  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const updateProfile = async (data: any): Promise<any> => {
  const endpoint = 'updateProfile'; // /updateProfile
  const token = document.cookie.replace('token=', '');
  const payload = token.split(',');
  const response = await axios.post(
    urlBuilder(endpoint),
    { ...data, session_id: payload[0], csrf: payload[1] },
    { withCredentials: true }
  );

  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const addFoundPerson = async (data: any): Promise<any> => {
  const endpoint = 'foundperson'; // /foundperson
  const token = document.cookie.replace('token=', '');
  const payload = token.split(',');
  const response = await axios.post(urlBuilder(endpoint), { ...data, session_id: payload[0], csrf: payload[1] });

  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const registerUser = async (data: any): Promise<any> => {
  const endpoint = 'user/register';
  const response = await axios.post(urlBuilder(endpoint), data);
  console.log(response);
  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const login = async (data: any): Promise<any> => {
  const endpoint = 'login';
  const response = await axios.post(urlBuilder(endpoint), data, {
    withCredentials: true
  });

  if (response.status === 200) {
    document.cookie = `token=${response.data.csrf},${response.data.session_id};`;

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
