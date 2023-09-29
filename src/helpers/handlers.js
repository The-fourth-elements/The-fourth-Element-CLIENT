import { postData } from '../hooks/postData';

export const handleSubmitRegister = async (
  { username, email, password, edad, deporte },
  country,
  region
) => {
  try {
    const form = {
      username,
      email,
      city: region,
      password,
      nationality: country,
      edad,
      deporte
    };

    const response = await postData(`${process.env.API_BACKEND}auth`, form);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleSubmitLogin = async form => {
  try {
    const response = await postData(`/login`, form);
    if (!response?.error)
      return response;
    throw new Error(response.error)
  } catch (error) {
    throw new Error(error)
  }
};
