import { Card, CardBody, CardHeader } from '@nextui-org/react';
import FormCreator from './FormCreator';

const ModalSelf = () => {
	return (
		<div className='flex justify-center mt-8'>
			<Card shadow='none' className='w-3/4 flex justify-center items-center'>
				<CardHeader className='bg-primary-500'>
					<h1 className={`w-full text-center text-2xl`}>Autoconocimiento</h1>
				</CardHeader>
				<CardBody className='h-full relative'>
					<FormCreator />
				</CardBody>
			</Card>
		</div>
	);
};

export default ModalSelf;
