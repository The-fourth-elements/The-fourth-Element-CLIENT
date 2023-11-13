import { Input, Button } from '@nextui-org/react';
import { useState } from 'react';
import { toastError, toastInfo } from '@/helpers/toast';
import { useFilterKnowRegister } from '@/zustand/store/filterKnowRegister';
const FilterBetweenDates = ({ className }) => {
	const { setDatesRange, dates } = useFilterKnowRegister();
	const [buttonAvailable, setButtonAvailable] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const handleChangeDate = event => {
		const { value, name } = event.target;
		const selectedDate = new Date(value);
		if (!isNaN(selectedDate.getTime())) {
			const today = new Date();
			if (selectedDate <= today) {
				name === 'start' ? setStartDate(value) : setEndDate(value);
				setButtonAvailable(true);
			} else {
				toastError(`${value} la fecha seleccionada es mayor que hoy`);
			}
		} else {
			toastError(`${value}, no es una fecha valida`);
		}
	};

	const handleFilterDates = () => {
		if (!startDate || !endDate) {
			toastError('Ingrese las fechas entre las que quire filtrar');
			return;
		}
		if (new Date(startDate) > new Date(endDate)) {
			toastError('La fecha de inicio no puede ser posterior a la fecha de fin');
			return;
		}
		setDatesRange('start', startDate);
		setDatesRange('end', endDate);
		toastInfo('Filtrando por fechas', 3000);
		setButtonAvailable(false);
	};
	return (
		<div className='flex justify-center flex-col min-w-[90%] max-w-[90%] my-5 gap-2 items-end'>
			<div className='min-w-full flex-col flex gap-5 sm:flex-row '>
				<Input
					type='date'
					label='Comienzo'
					name='start'
					classNames={{}}
					placeholder='Comienzo'
					value={startDate}
					onChange={handleChangeDate}
					className={`w-full ${className}`}
				/>
				<Input
					type='date'
					label='Fin'
					name='end'
					value={endDate}
					onChange={handleChangeDate}
					classNames={{}}
					placeholder='Fin'
					className={`w-full ${className}`}
				/>
			</div>
			{buttonAvailable && (
				<>
					<div>
						<Button className='flex' onClick={handleFilterDates}>
							Aplicar fechas
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default FilterBetweenDates;
