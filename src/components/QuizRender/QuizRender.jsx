'use client';

import { toastSuccess, toastError } from '@/helpers/toast';
import { useState } from 'react';
import './QuizRender.scss';
import { putData } from '@/hooks/fetchData';
import { getCookie } from 'cookies-next';
import { useUserProfile } from '@/zustand/store/userProfile';
const QuizRender = ({ quiz, onClose, classId }) => {
	const userId = getCookie('jsdklfsdjklfdsjfds');
	const moduleId = getCookie('moduleId');
	const { updateUserProgress } = useUserProfile()
	const [selectedAnswers, setSelectedAnswers] = useState(
		new Array(quiz?.quest?.length).fill(null)
	);

	const totalQuestions = quiz[0]?.quest?.length;

	const handleAnswerChange = (questionIndex, selectedAnswerIndex) => {
		const newSelectedAnswers = [...selectedAnswers];
		newSelectedAnswers[questionIndex] = selectedAnswerIndex;
		setSelectedAnswers(newSelectedAnswers);
	};
	const handleSendQuiz = async() => {
		let correctCount = 0;

		for (let i = 0; i < quiz[0]?.quest?.length; i++) {
			const selectedAnswerIndex = selectedAnswers[i];
			if (
				selectedAnswerIndex !== null && quiz[0]?.quest[i]?.responses[selectedAnswerIndex]?.verdadera
			) {
				correctCount++;
			}
		}
		const correctPercentage = (correctCount / totalQuestions) * 100;
		if (correctPercentage >= 100) {
			const response = await putData(`${process.env.API_BACKEND}approve/user/${userId}/module/${moduleId}/class/${classId}`);
			if(response?.data){
				updateUserProgress(response.data)
			}
			toastSuccess('Aprobado');
			onClose()
		} else {
			toastError('Reprobado');
		}
	};
	return (
		<div className='mainQuiz'>
			<h1>{quiz[0]?.name}</h1>
			<h2>{quiz[0]?.description}</h2>
			{quiz[0]?.quest?.map((pregunta, questionIndex) => {
				return (
					<div className='divPregunta' key={questionIndex}>
						<h3>{pregunta?.question}</h3>
						{pregunta?.responses?.map((answer, answerIndex) => (
							<label className='divOptions' key={answerIndex}>
								<input
									type='radio'
									value={answerIndex}
									checked={selectedAnswers[questionIndex] === answerIndex}
									onChange={() =>
										handleAnswerChange(questionIndex, answerIndex)
									}
								/>
								<p className='pAnswer'>{answer?.response}</p>
							</label>
						))}
					</div>
				);
			})}
			<button className='quizButton' onClick={handleSendQuiz}>
				Enviar
			</button>
		</div>
	);
};

export default QuizRender;