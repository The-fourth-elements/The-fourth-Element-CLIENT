'use client'
import { postData } from '../../../../hooks/postData'
import '@/components/recoveryPassword/styles.scss'
import {Form, Formik, useFormik} from 'formik';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { Button, Card, CardBody } from '@nextui-org/react';
import { toastError, toastSuccess } from '@/helpers/toast';
import InputField from '@/helpers/InputField';
import { initialValuesRecovery, validationSchema } from '@/helpers/validations'


const ResetPass = ({params})=>{
    
            const handleSubmit = async (values) => {
            const {newPassword} = values
            console.log(params);
            const form = {
                newPassword,
                token: params.token
            }
            try {
              const response = await postData(`${process.env.API_BACKEND}reset-password`, form);
              toastSuccess(response.message)
            } catch (error) {
              toastError(error.message)
            }}
          
      
    
      return (
        <Card className='Main text-3xl text-white'>
            <Formik
              initialValues={initialValuesRecovery}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
          <CardBody className='body'>
          <Form className='Form'>
          <div className='group'>
            <label htmlFor="newPassword">Nueva contraseña:</label>
            <InputField
              type='string'
              name='newPassword'
            />
          </div>
    
          <div className='group'>
            <label htmlFor="confirmPassword">Confirmar nueva contraseña:</label>
            <InputField
              type='string'
              name='confirmPassword'
            />
            
          </div>
    
          <Button type="submit" className='submit'>Cambiar contraseña</Button>
        </Form>
          </CardBody>
        </Formik>

        </Card>
        
      );
}

export default ResetPass; 