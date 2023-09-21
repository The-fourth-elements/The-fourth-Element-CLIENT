'use client';

import './style.scss';
import { Card, CardBody, Button } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import '@/components/loginForm/style.scss';
import InputField from '@/helpers/InputField';
import { validationSchemaModule } from '@/helpers/validations'
import Image from 'next/image';
import back from '@/assets/svg/arrowBack.svg'
import { useRouter } from 'next/navigation'

const ModuleForm = () => {
    const router = useRouter()
    const handleFileChange = (event) => {
        const fileInput = event.target;
        const isVideo = fileInput.files.length > 0 && fileInput.files[0].type.startsWith('video/');
        if(!isVideo){
            fileInput.value =''
        }
    }

	const initialValuesModule = {
		nameOfModule: '',
		inputFile: '',
	};
	return (
		<>
			<Card className='min-h-screen modern bg-primary-500 Main text-4xl'>
				<CardBody className='body'>
					<Formik initialValues={initialValuesModule}
                    validationSchema={validationSchemaModule}
                    >
						<Form className='Form relative'>
                            <Image src={back} width={40} className='absolute z-10 top-1 left-1 cursor-pointer 
                            rounded-md hover:bg-primary' onClick={()=>{
                                router.push('/dashboard')
                            }}/>
							<div className='group'>
                            <label htmlFor='nameOfModule' className=''>
									Nombre del modulo
								</label>
								<InputField type='file' name='nameOfModule' />
								<div className='group'>
										<input
											className=''
											type='file'
											name='video'
											id='video'
                                            accept='video/*'
                                            onChange={handleFileChange}
											required
										/>
								</div>
							</div>
							<Button type='submit' className='submit'>
								Agregar modulo
							</Button>
						</Form>
					</Formik>
				</CardBody>
			</Card>
		</>
	);
};

export default ModuleForm;
