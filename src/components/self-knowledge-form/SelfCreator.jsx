import { Card, CardBody, CardHeader } from '@nextui-org/react';
import FormCreator from './FormCreator';

const ModalSelf = () => {
	return (
		<div className='flex justify-center mt-8'>
			<Card className='w-3/4 flex justify-center items-center'>
				<CardHeader className='bg-primary-500'>
					<h3 className={`w-full text-center text-2xl`}>Autoconocimiento</h3>
				</CardHeader>
				<CardBody className='h-full bg-primary-500 relative'>
					<FormCreator />
				</CardBody>
			</Card>
		</div>
	);
};

export default ModalSelf;
