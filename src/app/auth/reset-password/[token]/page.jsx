'use client'
import { postData } from '../../../../hooks/postData'
import {useFormik} from 'formik';
import * as Yup from 'yup'
import { toast } from 'react-toastify';


const ResetPass = ({params})=>{
    const formik = useFormik({
        initialValues: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
        validationSchema: Yup.object({
          newPassword: Yup.string()
            .matches(
              /^(?=.*[A-Z])(?=.*\d).{6,}$/,
              'La nueva contraseña debe tener al menos 6 caracteres, una letra mayúscula y un número'
            )
            .required('La nueva contraseña es requerida'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas deben coincidir')
            .required('Confirmar la nueva contraseña es requerido'),
        }),
        onSubmit: async (values) => {
            const {newPassword} = values
            console.log(params);
            const form = {
                newPassword,
                token: params.token
            }
            try {
              const response = await postData(`${process.env.API_BACKEND}reset-password`, form);
              toast.success('Se ha cambiado su contraseña', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            } catch (error) {
              toast.error('Algo salio mal', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            }
          
        },
      });
    
      return (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="newPassword">Nueva contraseña:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div>{formik.errors.newPassword}</div>
            ) : null}
          </div>
    
          <div>
            <label htmlFor="confirmPassword">Confirmar nueva contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div>{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
    
          <button type="submit">Cambiar contraseña</button>
        </form>
      );
}

export default ResetPass; 