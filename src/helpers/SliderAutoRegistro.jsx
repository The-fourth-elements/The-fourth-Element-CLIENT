
import { Slider } from "@nextui-org/react";

const SliderAutoRegistro = ({index, responses, handleChangeResponse}) => {
    return (
        <Slider
        onChange={(event) => handleChangeResponse(event, index)}
        color="success"
        size="md"
        step={1}
        defaultValue={3}
        showSteps={true} 
        maxValue={5} 
        minValue={1}
        value={responses && responses[index]}
        marks={[
            {value : 1,
            label : 1},
            {value : 2,
            label : 2},
            {value : 3,
            label : 3},
            {value : 4,
            label : 4},
            {value : 5,
            label : 5}
        ]}
        />
    )
}

export default SliderAutoRegistro;