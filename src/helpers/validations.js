import * as Yup from 'yup';

export const validationSchemaLogin = Yup.object({
    email: Yup.string()
        .email('Ingresa un correo electrónico válido')
        .required('El correo electrónico es obligatorio'),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Z])(?=.*\d).{6,}$/,
            'La contraseña debe contener al menos una letra mayúscula, un número y tener al menos 6 caracteres'
        )
        .required('La contraseña es obligatoria'),
});

export const registerSchema = (country, region) => {
    return Yup.object({
        username: Yup.string()
            .required("Este campo es requerido")
            .min(2)
            .max(20)
            .matches(
                /^[A-Za-z0-9_-]+$/,
                'El nombre de usuario solo puede contener letras, números, guiones bajos (_) y guiones (-).'
            ),
        email: Yup.string().email("El email debe ser valido").required("Este campo es requerido"),
        password: Yup.string().required("Este campo es requerido").min(6, "Debe tener 6 caracteres como minimo").max(25, "No debe tener mas de 25 caracteres"),
        repeatPassword: Yup.string()
            .required("Este campo es requerido")
            .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
        country: validarcountryYregion(country, region),
        region: validarcountryYregion(country, region),
    });
};

const validarcountryYregion = (country, region) => {
    if (!country) {
        return Yup.string().required('El país es obligatorio');
    }
    if (!region) {
        return Yup.string().required('La region/estado es obligatoria');
    }
    return Yup.string();
};

export const validationSchemaRecovery = Yup.object({
    email: Yup.string()
        .email('Debe ingresar un correo electrónico válido.')
        .required('Este campo es obligatorio'),
});

export const validationSchema = Yup.object({
    newPassword: Yup.string()
        .matches(
            /^(?=.*[A-Z])(?=.*\d).{6,}$/,
            'La nueva contraseña debe tener al menos 6 caracteres, una letra mayúscula y un número'
        )
        .required('La nueva contraseña es requerida'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas deben coincidir')
        .required('Confirmar la nueva contraseña es requerido'),
});

export const validationSchemaModule = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
})

export const validationSchemaCreateClass = Yup.object().shape({
    module: Yup.string().required('Este campo es requerido'),
    name: Yup.string().required('Este campo es requerido'),
    description: Yup.string().required('Este campo es requerido'),
    
    PowerPointUrl: Yup.string().url('Ingresa una URL válida').required('Este campo es requerido'),
  });


export const initialValues = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
};

export const initialValuesLogin = {
    email: '',
    password: '',
};

export const initialValuesRecovery = {
    newPassword: '',
    confirmPassword: '',
};
