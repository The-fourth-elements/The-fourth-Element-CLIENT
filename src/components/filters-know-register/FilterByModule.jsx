import React from 'react';
import { RadioGroup, Radio } from "@nextui-org/react";

const FilterByModule = ({ className, modules }) => {
    return (
        <RadioGroup
            classNames={{base: 'bg-[#fff] w-[90%] p-'}}
            label={"Seleccione su módulo"}
        >
            {modules?.map(({name, id})=>{
                return (
                    <>
                        <React.Fragment>
                            <Radio value={id} children={name} />
                        </React.Fragment>
                    </>
                )
            })}
        </RadioGroup>
    )
};

export default FilterByModule