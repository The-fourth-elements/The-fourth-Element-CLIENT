import { postData } from "../utilsFetch/postData";

export const handleSubmit = async ({ username, email, password }, country, region) => {
  try {
    const form = {
      name: username,
      email,
      city: region,
      password,
      nationality: country,
    }

    const response = await postData('http://localhost:3001/user', form);
    return response
  } catch (error) {
    alert('Ocurrió un error al registrar.', error);
  }
};






