import { postData } from '../hooks/fetchData';
import axios from 'axios';

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
      expYearsSports: Number(experiencia),
    };

    const response = await postData(`${process.env.API_BACKEND}auth`, form);
    if (response?.error) {
      throw response?.error
    }
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

// export const handleSubmitLogin = async form => {
//   try {
//     const response = await postData(`/login`, form);
//     if (!response?.error) return response;
//     throw new Error(response.error);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const handleSubmitEditClass = async (form, video, id) => {
  try {
    const body = {
      name: form.editedName,
      description: form.editedDescription,
      powerPoint: form.editedPowerPoint,
      video,
    };
    if (video.hasOwnProperty('url')) {
      body.video = video;
    }

    const response = await fetch(`${process.env.API_BACKEND}class/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const responseParsed = await response.json();
    return responseParsed;
  } catch (error) {
    console.log(error);
  }
};
