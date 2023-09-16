
import * as Yup from "yup"

const validateCountryAndRegion = (country, region) => {
  if (!country) {
    return Yup.string().required('Country is required');
  }
  if (!region) {
    return Yup.string().required('Region/State is required');
  }
  return Yup.string();
};

export const registerSchema = (country, region) => {
  return Yup.object({
    username: Yup.string().required().min(5).max(20).matches(/^[A-Za-z0-9_-]+$/, "The user name can only contain letters, numbers, underscores (_) and hyphens (-)."),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8).max(25),
    repeatPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    country: validateCountryAndRegion(country, region), // Pass country and region as arguments
    region: validateCountryAndRegion(country, region), // Pass country and region as arguments
  });
};

  export const initialValues = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };