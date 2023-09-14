"use client"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

const Register = () => {
  const [message, setMessage] = useState(false);

  return (
    <Formik
      initialValues={{
        username: "ChuchuElMalditoFuckboy",
        email: "elCogePerros@Henry.com",
        password: "**************",
      }}
      validate={(valores) => {
        let errores = {};
        if (valores.username === "") {
          errores.username = "Username no puede estar vacío";
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)) {
          errores.username = "El nombre de usuario no puede contener números";
        }

        if (valores.email === "") {
          errores.email = "Email no puede estar vacío";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
            valores.email
          )
        ) {
          errores.email = "Por favor, escribe un correo válido";
        }

        if (valores.password === "") {
          errores.password = "Password no puede estar vacío";
        }
        return errores;
      }}
      onSubmit={({ resetForm }) => {
        resetForm();
        setMessage(true);
        setTimeout(() => setMessage(false), 5000);
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="username">Username: </label>
            <Field
              type="text"
              placeholder="Enter your username"
              name="username"
            />
            <ErrorMessage name="username" component={() => <p>{errors.username}</p>} />
          </div>

          <div>
            <label htmlFor="email">Email: </label>
            <Field
              type="email"
              placeholder="Enter your email"
              name="email"
            />
            <ErrorMessage name="email" component={() => <p>{errors.email}</p>} />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <Field
              type="password"
              placeholder="Enter your password"
              name="password"
            />
            <ErrorMessage name="password" component={() => <p>{errors.password}</p>} />
          </div>

          <button type="submit">Registrarse</button>
          {message && <p>El formulario ha sido enviado con éxito!</p>}
        </Form>
      )}
    </Formik>
  );
};
    // const Register = () => {

    //     let [message, setMessage] = useState (false)
    //     return (
    //         <Formik
    //             initialValues={{
    //                 username: "ChuchuElMalditoFuckboy",
    //                 email: "elCogePerros@Henry.com",
    //                 password: "**************"
                    
    //             }}
    //             validate={(valores) => {
    //                 let errores = {}
    //                 if(valores.username === "") {errores.username =  "username no puede estar vacio" }
    
    //                 else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)){errores.username = "el nombre de usuario no puede contener numeros"}
                    
    //                 if(valores.email === ""){errores.email = "email no puede estar vacio"}
    
    //                 else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)){errores.email = "pro favor escribe un correo valido"}
    
    //                 if(valores.password === ""){errores.password = "pasword no puede estar vacio"}
    //                 return errores;
    //             }}
    //             onSubmit={(valores, {resetForm}) => {
    //                 resetForm()
    //                 setMessage(true)
    //                 setTimeout(() => setMessage(false), 5000)
    //             }}
    //         > 
    //         {({ values, handleChange, handleBlur, errors, touched }) => (
    //             <Form >
                    
    //             <div>
    //                 <label htmlFor="username">Username: </label>
    //                 <input 
    //                 type="text" 
    //                 placeholder="Enter your username" 
    //                 name="username" 
    //                 value={values.username}
    //                 onChange = {handleChange}
    //                 onBlur={handleBlur}
    //                 />
    //                 {touched.username && errors.username && <p>{errors.username}</p>}
    //             </div>
    
    //             <div>
    //                 <label htmlFor="email">Email: </label>
    //                 <input 
    //                 type="email" 
    //                 placeholder="Enter your email" 
    //                 name="email" 
    //                 value={values.email}
    //                 onChange = {handleChange}
    //                 onBlur={handleBlur}
    
    //                 />
    //                 {touched.email && errors.email && <p>{errors.email}</p>}
    
    //             </div>
    
    //             <div>
    //                 <label htmlFor="password">Password: </label>
    //                 <input 
    //                 type="password" 
    //                 placeholder="Enter your password" 
    //                 name="password" 
    //                 value={values.password}
    //                 onChange = {handleChange}
    //                 onBlur={handleBlur}
    
    //                 />
    //                 {touched.password && errors.password && <p>{errors.password}</p>}
    //             </div>
    
    //             <button type="submit">Registrarse</button>
    //             {message && <p>el formulario ha sido enviado con exito ! !</p>}
    //             </Form>
    //         )}
    //         </Formik>
    //     );
    //     };

export default Register;