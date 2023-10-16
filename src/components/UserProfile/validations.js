

// export const ageExpSchema = () => {
// 	return Yup.object({
// 		edad: Yup.number("La edad no puede estar vacia").typeError("Debe ser un numero válido").positive("La edad debe ser un número positivo").integer("La edad debe ser un número entero").min("La edad no puede ser menor a cero").min(Yup.ref('experiencia'), "La edad no puede ser menor que la experiencia").max(120, "La edad no puede ser mayor a 120 años").required("La edad no puede estar vacia"),
// 		experiencia: Yup.number("La experiencia no puede estar vacía").typeError("Debe ser un numero válido").positive("La experiencia debe ser un número positivo").integer("La edad debe ser un número entero").min(0, "La experencia puede ser mayor o igual a cero").max(100, "La experiencia no puede ser mayor a 100").required("La experiencia no puede estar vacia")
// 	});
// };