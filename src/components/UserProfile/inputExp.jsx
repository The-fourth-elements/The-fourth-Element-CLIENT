import { Input } from "@nextui-org/react"
import * as Yup from "yup";
import { useState } from "react";
import "./input.scss"
const InputExp = ({ getNewAge, newAge  }) => {

    const nameSchema = Yup.string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(20, "El nombre no puede tener más de 20 caracteres")
        .matches(/^[a-zA-Z0-9_-]+$/, "El nombre solo puede contener letras, números, guiones bajos (_) y guiones (-)");

    const [errors, setErrors] = useState({});
  
    const validateName = async () => {
        try {
          await nameSchema.validate(newAge);
          setErrors({});
        //   handleValidationErrors(false); 
        } catch (error) {
          setErrors({ newAge: error.message });
        //   handleValidationErrors(true); 
        }
      };
  
  
    return (
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            key="outside"
            type="text"
            label="Name"
            labelPlacement="outside"
            onChange={getNewAge}
            onBlur={validateName}
          />
        </div>
        {errors.newAge && <p className="error-text">{errors.newAge}</p>}
      </div>
    );
  };

export default InputExp;