import { Input } from "@nextui-org/react"

const InputName = ({getNewName}) => {
    return(
        <div className="flex flex-col gap-2">
            <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                key="outside"
                type="text"
                label="Name"
                labelPlacement="outside"
                onChange={getNewName}
                />
            
            </div>
        </div>  
    )
}

export default InputName;