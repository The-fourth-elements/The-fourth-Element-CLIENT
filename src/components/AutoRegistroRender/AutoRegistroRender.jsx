'use client';
import './AutoRegistroRender.scss';
import { useAutoRegistro } from '@/zustand/store/autoRegistroStore';
import { CircularProgress, Modal, ModalContent } from '@nextui-org/react';
// import SliderAutoRegistro from '@/helpers/SliderAutoRegistro'
import React, { useState, useEffect } from 'react';
import { Slider } from '@nextui-org/react';
import { getCookie } from 'cookies-next';
import { toastError, toastSuccess } from '@/helpers/toast';

const RenderAutoRegistro = ({ isOpen, onOpen, onOpenChange, data, type }) => {
	const { createResponseSR } = useAutoRegistro();
	const userId = getCookie('jsdklfsdjklfdsjfds');
	const [userResponses, setUserResponses] = useState([]);
	const [comments, setComments] = useState('');

	const excersice = data.filter(section => section.type === type);

	useEffect(() => {
        console.log('excersice ', excersice);


		if (excersice[0]?.questions) {
			setUserResponses(excersice[0]?.questions?.map(() => 3));
            console.log('userResponses ', userResponses);

		}

	}, [isOpen]);

	const handleChangeComments = event => {
		setComments(event.target.value);
	};

	const handleChangeResponse = (event, index) => {
		const newResponses = [...userResponses];
		newResponses[index] = event;
		setUserResponses(newResponses); // Actualiza el estado de las respuestas del usuario
		console.log(newResponses);
	};

	const handleSaveResponse = () => {
		console.log(comments);
		try {
			if (comments === '') {
				throw new Error('Complete todos los campos');
			}
			const bodyAuto = {
				selfRegisterId: excersice[0]._id,
				userId,
				response: userResponses,
				comments,
			};
			createResponseSR(bodyAuto);
		} catch (error) {
			toastError(error.message);
		}
	};
	return (
		excersice &&
		Object.keys(excersice).length > 0 && (
			<Modal
				className=''
				isOpen={isOpen}
				onOpen={onOpen}
				onOpenChange={onOpenChange}
				size='5xl'
				backdrop='blur'
				scrollBehavior='inside'>
				<ModalContent className='modalContent'>
					{onClose => (
						<div className='mainAutoRender'>
							{excersice?.map( (exer , key) => (
								<React.Fragment key={key}>
									<header>
										<h1>{exer?.name}</h1>
										<h2>{exer?.type}</h2>
									</header>
									<article>
										{exer.questions?.map((question, index) => (
											<section className='section1AutoRender' key={index}>
												<h3 className='autoRegistroQuestion'>
													{question?.selfQuestion}
												</h3>
												<h3 className='autoRegistroAgree'>{question?.agree}</h3>
												<Slider
													className='autoRegistroSlider'
													fillOffset={1}
													classNames={{
														base: 'max-w-md gap-3',
													}}
													onChange={event => handleChangeResponse(event, index)}
													color={
														userResponses[index] === 3
															? 'foreground'
															: userResponses[index] < 3
															? 'danger'
															: 'success'
													}
													size='md'
													step={1}
													defaultValue={3}
													showSteps={true}
													maxValue={5}
													minValue={1}
													marks={[
														{ value: 1 },
														{ value: 2 },
														{ value: 3 },
														{ value: 4 },
														{ value: 5 },
													]}
												/>
												<h3 className='autoRegistroDisagree'>
													{question?.disagree}
												</h3>
											</section>
										))}
										<textarea
											className='textAutoRegistro'
											onChange={handleChangeComments}
											name=''
											id=''
											cols='30'
											rows='10'
											placeholder='¿Por que te sentiste asi?'
										/>
									</article>
								</React.Fragment>
							))}
							<footer>
								<button
									onClick={handleSaveResponse}
									className='buttonFooterAutoRender'>
									Guardar Respuestas
								</button>
							</footer>
						</div>
					)}
				</ModalContent>
			</Modal>
		)
	);
};

export default RenderAutoRegistro;
