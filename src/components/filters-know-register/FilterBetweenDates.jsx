import { Input } from '@nextui-org/react';

const FilterBetweenDates = ({ className }) => {
    let values = null;
    let values2 = null
    const handleChangeDate = (event)=>{
        const {value, name} = event.target;
        console.log(new Date(value), 'soy el valor de : ', name);
    }
	return (
		<div className='flex justify-start bg-red-50 w-auto min-w-[80%] max-w-[90%]'>
			<Input
				type='date'
                label='Desde'
                name='from'
                classNames={{label: 'text-[#ee7f0f]'}}
                placeholder='Desde'
                value={values}
                onChange={handleChangeDate}
				className={`w-full p-5 bg-slate-900 ${className}`}
			/>
            <Input
				type='date'
                label='Hasta'
                name='to'
                value={values2}
                onChange={handleChangeDate}
                classNames={{label: 'text-[#ee7f0f]'}}
                placeholder='Hasta'
				className={`w-full p-5 bg-slate-900 ${className}`}
			/>
		</div>
	);
};

export default FilterBetweenDates;
