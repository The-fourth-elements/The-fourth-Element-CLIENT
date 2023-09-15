"use client"
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";import * as Yup from "yup"
import "./styles.scss"

const Register = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const registerSchema = Yup.object({
    username: Yup.string().required().min(5).max(20).matches(/^[A-Za-z0-9_-]+$/, "The user name can only contain letters, numbers, underscores (_) and hyphens (-)."),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8).max(25),
    repeatPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords must match')

  });

  return (
    <div className="Div">
  <Formik
    initialValues={initialValues}
    validationSchema={registerSchema}
    onSubmit={() => {
      alert("registro exitoso");
    }}
  >
    {({ errors }) => (
      <Form>
        <h1 className="Main__Form--title">SignUp</h1>
        <div className="Main__Form--group">
          <label htmlFor="username" className="Main__Form--label">
            Username: 
          </label>
          <Field
            type="text"
            placeholder="Enter your username"
            name="username"
            className="Main__Form--input"
          />
          <ErrorMessage name="username" component="p" className="Main__Form--error" />
        </div>

        <div className="Main__Form--group">
          <label htmlFor="email" className="Main__Form--label">
            Email: 
          </label>
          <Field
            type="email"
            placeholder="Enter your email"
            name="email"
            className="Main__Form--input"
          />
          <ErrorMessage name="email" component="p" className="Main__Form--error" />
        </div>

        <div className="Main__Form--group">
          <label htmlFor="password" className="Main__Form--label">
            Password: 
          </label>
          <Field
            type="password"
            placeholder="Enter your password"
            name="password"
            className="Main__Form--input"
          />
          <ErrorMessage name="password" component="p" className="Main__Form--error" />
        </div>

        <div className="Main__Form--group">
          <label htmlFor="repeatPassword" className="Main__Form--label">
            Repeat Password: 
          </label>
          <Field
            type="password"
            placeholder="Repeat the password"
            name="repeatPassword"
            error={errors.repeatPassword}
            className="Main__Form--input"
          />
          <ErrorMessage
            name="repeatPassword"
            component="p"
            className="Main__Form--error"
          />
        </div>

        <button type="submit" className="Main__Form--button">
          Register
        </button>
      </Form>
    )}
  </Formik>
</div>
  );
};

export default Register;