import { Input } from "@nextui-org/react"
import * as Yup from "yup";
import { useState } from "react";
import "./input.scss"


 const ageExpSchema = Yup.object({
  edad: Yup.number()
    .typeError("La edad debe ser un número válido")
    .positive("La edad debe ser un número positivo")
    .integer("La edad debe ser un número entero")
    .min(0, "La edad no puede ser menor a cero")
    .min(Yup.ref('experiencia'), "La edad no puede ser menor que la experiencia")
    .max(120, "La edad no puede ser mayor a 120 años")
    .required("La edad no puede estar vacía"),
  experiencia: Yup.number()
    .typeError("La experiencia debe ser un número válido")
    .positive("La experiencia debe ser un número positivo")
    .integer("La experiencia debe ser un número entero")
    .min(0, "La experiencia puede ser mayor o igual a cero")
    .max(100, "La experiencia no puede ser mayor a 100")
    .required("La experiencia no puede estar vacía"),
});

 export const InputAge = ({ getNewAge, newAge }) => {
  const [errors, setErrors] = useState({});

  const validateName = async () => {
    try {
      await ageExpSchema.validate({ edad: newAge, experiencia: 0 }, { abortEarly: false });
      setErrors({});
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          key="outside"
          type="text"
          label="Edad"
          // labelPlacement="outside"
          onChange={getNewAge}
          onBlur={validateName}
        />
      </div>
      {errors.edad && <p className="error-text">{errors.edad}</p>}
    </div>
  );
};

export const InputExp = ({ getNewExp, newExp }) => {
  const [errors, setErrors] = useState({});

  const validateName = async () => {
    try {
      await ageExpSchema.validate({ edad: 0, experiencia: newExp }, { abortEarly: false });
      setErrors({});
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          key="outside"
          type="text"
          label="Experiencia"
          // labelPlacement="outside"
          onChange={getNewExp}
          onBlur={validateName}
        />
      </div>
      {errors.experiencia && <p className="error-text">{errors.experiencia}</p>}
    </div>
  );
};