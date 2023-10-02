import { postData } from '../hooks/postData';

export const handleSubmitRegister = async (
  { username, email, password, edad, deporte, experiencia },
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
      age: Number(edad),
      sport: deporte,
      yearsOfExperience: Number(experiencia),
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
    if (!response?.error) return response;
    throw new Error(response.error);
  } catch (error) {
    throw new Error(error);
  }
};

export const handleSubmitEditClass = async (form, video) => {
  try {
    //dejar para hacer la peticion;
    console.log(form, video);
    const body = { ...form };
    if (video.hasOwnProperty('url')) {
      body.video = video;
    }
    console.log(video);
    console.log(body);

    // const response = await fetch(process.env.API_BACKEND, {
    //   method: 'PUT',
    //   cache: 'no-cache',
    //   credentials: 'include',
    //   mode: 'cors',
    //   body,
    // });
    alert('sois la ostia')

  } catch (error) { }
};
