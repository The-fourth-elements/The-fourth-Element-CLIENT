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

    const response = await postData(`https://the-forth-element-production.up.railway.app/user`, form);
    return response
  } catch (error) {
    alert('Ocurrió un error al registrar.', error);
  }
};

//hola 






