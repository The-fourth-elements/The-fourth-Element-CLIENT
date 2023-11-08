import { Input } from '@nextui-org/react';

const FilterBetweenDates = ({ className }) => {
    let values = null;
    let values2 = null
    const handleChangeDate = (event)=>{
        const {value, name} = event.target;
        console.log(new Date(value), 'soy el valor de : ', name);
    }
	return (
		<div className='flex justify-start flex-col sm:flex-row gap-3 w-auto min-w-[90%] max-w-[90%] m-5'>
			<Input
				type='date'
                label='Desde'
                name='from'
                classNames={{label: 'text-[#ee7f0f]'}}
                placeholder='Desde'
                value={values}
                onChange={handleChangeDate}
				className={`w-full ${className}`}
			/>
            <Input
				type='date'
                label='Hasta'
                name='to'
                value={values2}
                onChange={handleChangeDate}
                classNames={{label: 'text-[#ee7f0f]'}}
                placeholder='Hasta'
				className={`w-full ${className}`}
			/>
		</div>
	);
};

export default FilterBetweenDates;
