// import { Input } from "@nextui-org/react"
// import * as Yup from "yup";
// import { useState } from "react";
// import "./input.scss"
// import { ageExpSchema } from "./validations";
// const InputAge = ({ getNewExp, newExp  }) => {

//     const [errors, setErrors] = useState({});
  
//     const validateName = async () => {
//         try {
//           await ageExpSchema.validate(newExp);
//           setErrors({});
//         //   handleValidationErrors(false); 
//         } catch (error) {
//           setErrors({ newExp: error.message });
//         //   handleValidationErrors(true); 
//         }
//       };
  
  
//     return (
//       <div className="flex flex-col gap-2">
//         <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
//           <Input
//             key="outside"
//             type="text"
//             label="Name"
//             labelPlacement="outside"
//             onChange={getNewExp}
//             onBlur={validateName}
//           />
//         </div>
//         {errors.newExp && <p className="error-text">{errors.newExp}</p>}
//       </div>
//     );
//   };

// export default InputAge;