import axios from 'axios';
import { LINK_TO_REDIRECT } from '../../../../apiConfig';

// Get status options
const options = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/status`
  );
  return response.data.data;
};

// Register user
const register = async (userData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/establishment/register`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

// Login user
const login = async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
    data.data
  );
  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
    if (data.isChecked) {
      localStorage.setItem('email', JSON.stringify(data.data.email));
    } else {
      localStorage.removeItem('email');
    }
  }
  if (response.data) {
    return response.data;
  }
};

// Forget password
const resetPass = async (user) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/resetmdp`,
    {
      email: user.email,
      lien_redirect: `${LINK_TO_REDIRECT}`,
    }
  );
  if (response.data) {
    localStorage.setItem(
      'tokenToUpdatePassword',
      JSON.stringify(response.data.token_email)
    );
  }

  return response.data;
};

// Update password
const setNewPass = async (data) => {
  const config = {
    headers: {
      'X-AUTH-TOKEN': JSON.parse(localStorage.getItem('tokenToUpdatePassword')),
    },
  };

  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/updatemdp`,
    data,
    config
  );
  console.log('response.status', response.status);
  if (response.status === 200) {
    localStorage.removeItem('tokenToUpdatePassword');
  }
  return response.data;
};

const authService = {
  options,
  register,
  login,
  resetPass,
  setNewPass,
};

export default authService;
