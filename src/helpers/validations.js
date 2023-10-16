import * as Yup from 'yup';

export const validationSchemaLogin = Yup.object({
	Email: Yup.string()
		.email('Ingresa un correo electrónico válido')
		.required('El correo electrónico es obligatorio'),
	Password: Yup.string()
		.matches(
			/^(?=.*[A-Z])(?=.*\d).{6,}$/,
			'La contraseña debe contener al menos una letra mayúscula, un número y tener al menos 6 caracteres'
		)
		.required('La contraseña es obligatoria'),
});

export const registerSchema = (country, region) => {
	return Yup.object({
		username: Yup.string()
			.required('Este campo es requerido')
			.min(2)
			.max(20)
			.matches(
				/^[A-Za-z0-9_-]+$/,
				'El nombre de usuario solo puede contener letras, números, guiones bajos (_) y guiones (-).'
			),
		email: Yup.string()
			.email('El email debe ser valido')
			.required('Este campo es requerido'),
		password: Yup.string()
			.required('Este campo es requerido')
			.min(6, 'Debe tener 6 caracteres como minimo')
			.max(25, 'No debe tener mas de 25 caracteres'),
		repeatPassword: Yup.string()
			.required('Este campo es requerido')
			.oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
		country: validarcountryYregion(country, region),
		region: validarcountryYregion(country, region),
		deporte: Yup.string().required("El campo es requerido"),
		edad: Yup.number("La edad no puede estar vacia").typeError("Debe ser un numero válido").positive("La edad debe ser un número positivo").integer("La edad debe ser un número entero").min("La edad no puede ser menor a cero").min(Yup.ref('experiencia'), "La edad no puede ser menor que la experiencia").max(120, "La edad no puede ser mayor a 120 años").required("La edad no puede estar vacia"),
		experiencia: Yup.number("La experiencia no puede estar vacía").typeError("Debe ser un numero válido").positive("La experiencia debe ser un número positivo").integer("La edad debe ser un número entero").min(0, "La experencia puede ser mayor o igual a cero").max(100, "La experiencia no puede ser mayor a 100").required("La experiencia no puede estar vacia")
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
			'Debe tener al menos 6 caracteres, una letra mayúscula y un número'
		)
		.required('La nueva contraseña es requerida'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('newPassword'), null], 'Las contraseñas deben coincidir')
		.required('Confirmar la nueva contraseña es requerido'),
});

export const validationSchemaModule = Yup.object({
	name: Yup.string().required('Este campo es requerido'),
	description: Yup.string().required('Este campo es requerido'),
	paid: Yup.string().required('Este campo es requerido'),
	// quiz: Yup.number()
	// 	.typeError('Debe ser un número')
	// 	.required('Este campo es requerido'),
});

export const validationSchemaCreateClass = Yup.object({
	module: Yup.string().required('Este campo es requerido'),
	name: Yup.string().required('Este campo es requerido'),
	description: Yup.string().required('Este campo es requerido'),
	powerPointUrl: Yup.string()
		.required('Este campo es requerido')
		.url('Debe ser una URL válida.'),
});

export const validationSchemaEditClass = Yup.object({
	editedName: Yup.string().required('El nombre no puede estar vacío'),
	editedDescription: Yup.string().required('La descripcion no puede estar vacía'),
	editedPowerPoint: Yup.string().url("Debe ser una url valida").required("La url es requerida")
});

export const validationSchemaLanding = Yup.object({
	Titulo: Yup.string().required('El título no puede estar vacío'),
	Contenido: Yup.string().required('El contenido no puede estar vacío')
});


export const initialValues = {
	username: '',
	email: '',
	password: '',
	repeatPassword: '',
	deporte: '',
	edad: '',
	experiencia: '',
};

export const initialValuesLogin = {
	Email: '',
	Password: '',
};

export const initialValuesRecovery = {
	newPassword: '',
	confirmPassword: '',
};

export const initialValuesLanding = {
	Titulo: '',
	Contenido: ''
}