import { postData } from '../hooks/postData';

export const handleSubmitRegister = async (
  { username, email, password },
  country,
  region
) => {
  try {
    const form = {
      name: username,
      email,
      city: region,
      password,
      nationality: country,
    };

    const response = await postData(`${process.env.API_BACKEND}user`, form);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleSubmitLogin = async form => {
  try {
    const response = await postData(`${process.env.API_BACKEND}login`, form);
    return response;
  } catch (error) {
    throw new Error(error)
  }
};
