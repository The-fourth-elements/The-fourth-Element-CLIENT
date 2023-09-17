"use client"
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage} from "formik";
import "./styles.scss"
import { handleSubmit } from "./handlers";
import { registerSchema, initialValues } from "./validations";
import { useRouter } from "next/navigation";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


const Register = () => {

  const router = useRouter()
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  return (
    <div className="Div">
  <Formik
    initialValues={initialValues}
    validationSchema={registerSchema(country, region)}
    onSubmit={(values) => handleSubmit(values, router, country, region)}
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

        <div className="Main__Form--group">
              <label htmlFor="country" className="Main__Form--label">
                Country:
              </label>
              <CountryDropdown
                name="country"
                value={country}
                onChange={(val) => {
                  setCountry(val);
                  setRegion('');
                }}
                className="Main__Form--input"
              />
            </div>

            {country && (
              <div className="Main__Form--group">
                <label htmlFor="state" className="Main__Form--label">
                  State/Region:
                </label>
                <RegionDropdown
                  country={country}
                  value={region}
                  onChange={(val) => setRegion(val)}
                  className="Main__Form--input"
                />
                <ErrorMessage name="state" component="p" className="Main__Form--error" />
              </div>
            )}

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