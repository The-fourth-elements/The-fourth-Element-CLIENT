import * as Yup from 'yup';

export const validationSchemaLogin = Yup.object({
    email: Yup.string()
        .email('Ingresa un email válido')
        .required('El email es requerido'),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Z])(?=.*\d).{6,}$/,
            'The password must have a character Capitalizate, a number and a min of 6 characters'
        )
        .required('La contraseña es requerida'),
});

export const registerSchema = (country, region) => {
    return Yup.object({
        username: Yup.string()
            .required()
            .min(5)
            .max(20)
            .matches(
                /^[A-Za-z0-9_-]+$/,
                'The user name can only contain letters, numbers, underscores (_) and hyphens (-).'
            ),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8).max(25),
        repeatPassword: Yup.string()
            .required()
            .oneOf([Yup.ref('password')], 'Passwords must match'),
        country: validateCountryAndRegion(country, region),
        region: validateCountryAndRegion(country, region),
    });
};

const validateCountryAndRegion = (country, region) => {
    if (!country) {
        return Yup.string().required('Country is required');
    }
    if (!region) {
        return Yup.string().required('Region/State is required');
    }
    return Yup.string();
};

export const validationSchemaRecovery = Yup.object({
    email: Yup.string()
        .email('Debe ingresar un correo valido.')
        .required('Este campo es requerido.'),
})


export const initialValues = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
};

export const initialValuesLogin = {
    email: "",
    password: "",
};
