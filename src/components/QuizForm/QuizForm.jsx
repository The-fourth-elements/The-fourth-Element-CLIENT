'use client';
import { useState, useEffect } from 'react';
import './QuizForm.scss';
import { useCreateQuiz } from '@/zustand/store/quizActions';
import { Button } from '@nextui-org/react';


const QuizForm = ({ data, update, idQuiz, onClose }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const { createQuiz, updateQuiz } = useCreateQuiz();
	const [questions, setQuestions] = useState([]);
	const [currentAnswer, setCurrentAnswer] = useState('');
	const [currentAnswers, setCurrentAnswers] = useState([]);
	const [correctAnswer, setCorrectAnswer] = useState('');
	const [questionData, setQuestionData] = useState([
		{
			question: '',
			answers: [],
		},
	]);

	useEffect(() => {
		if (data) {
			// Establecer el título y la descripción desde data
			setTitle(data.name);
			setDescription(data.description);

			// Mapear las preguntas y respuestas desde data y establecerlas en questionData y currentAnswers
			const mappedQuestions = data.quest.map(question => ({
				question: question.question,
				answers: question.responses.map(response => ({
					response: response.response,
					verdadera: response.verdadera,
				})),
			}));

			setQuestionData(mappedQuestions);

			// Crear un array de respuestas actuales basado en la longitud de las preguntas
			const currentAns = Array(mappedQuestions.length).fill('');
			setCorrectAnswer(currentAns);
			setCurrentAnswers(currentAns);
		}
	}, [data]);


	const handleAddAnswer = questionIndex => {
		const newQuestionData = [...questionData];
		const newAnswer = {
			response: currentAnswers[questionIndex],
			verdadera: false,
		};
		newQuestionData[questionIndex]?.answers.push(newAnswer);
		setQuestionData(newQuestionData);

		// Limpia el valor del campo de respuesta específico
		const newCurrentAnswers = [...currentAnswers];
		newCurrentAnswers[questionIndex] = '';
		setCurrentAnswers(newCurrentAnswers);
	};

	const handleTitleChange = e => {
		setTitle(e?.target?.value);
	};
	const handleDescriptionChange = e => {
		setDescription(e?.target?.value);
	};
	const handleAddQuestion = () => {
		const newQuestionData = [
			...questionData,
			{ question: '', answers: [], correctAnswer: '' },
		];
		setQuestionData(newQuestionData);
	};


	const handleDeleteQuestion = questionIndex => {
		const newQuestionData = [...questionData];
		newQuestionData.splice(questionIndex, 1); // Elimina la pregunta en el índice questionIndex
		setQuestionData(newQuestionData);
	};

	const handleDeleteAnswer = (questionIndex, ansIndex) => {
		const updatedAnswers = [...questionData];
		const newupdatedAnswers = updatedAnswers[questionIndex].answers.splice(
			ansIndex,
			1
		);
		setCurrentAnswers(newupdatedAnswers);
	};

	const handleQuestionChange = (text, questionIndex) => {
		const newQuestionData = [...questionData];
		newQuestionData[questionIndex].question = text;
		setQuestionData(newQuestionData);
	};

	const handleCorrectAnswerChange = (answer, questionIndex) => {
		const newQuestionData = [...questionData];
		newQuestionData[questionIndex]?.answers?.forEach(ans => {
			ans.verdadera = ans?.response === answer;
		});
		setQuestionData(newQuestionData);
	};

	const handleSaveQuestionnaire = () => {
		const questionnaireData = {
			name: title,
			description: description,
			quest: questionData,
		};

		update
			? updateQuiz(questionnaireData, idQuiz)
			: createQuiz(questionnaireData);
		onClose();
	};

	return (
		<div className='main h-[80vh]'>
			<div className='header'>
				{update ? <h1>Editar Cuestionario</h1> : <h1>Crear Cuestionario</h1>}

				<input
					className='inputHeader'
					type='text'
					placeholder='Título del cuestionario'
					value={title}
					onChange={handleTitleChange}
				/>
				<input
					className='inputHeader'
					type='text'
					placeholder='Descripcion del cuestionario'
					value={description}
					onChange={handleDescriptionChange}
				/>
			</div>

			<div className='body'>
				{questionData.map((question, questionIndex) => (
					<div className='divEveryQuestion' key={questionIndex}>
						<h3>Pregunta {questionIndex + 1}</h3>
						<input
							className='input'
							type='text'
							placeholder='Nueva pregunta'
							value={question?.question}
							onChange={e =>
								handleQuestionChange(e?.target?.value, questionIndex)
							}
						/>
						<input
							className='input'
							type='text'
							placeholder='Respuesta'
							value={currentAnswers[questionIndex] || ''}
							onChange={e => {
								const newCurrentAnswers = [...currentAnswers];
								newCurrentAnswers[questionIndex] = e.target.value;
								setCurrentAnswers(newCurrentAnswers);
							}}
						/>
						<div>
							{question.answers.map((answer, ansIndex) => (
								<div className='inputElements' key={ansIndex}>
									<div className='divInput'>
										<input
											className='inputRadio'
											type='radio'
											name={`correctAnswer_${questionIndex}`}
											value={answer.response}
											checked={answer.verdadera}
											onChange={() =>
												handleCorrectAnswerChange(
													answer.response,
													questionIndex
												)
											}
										/>
										<p className='pAnswer'>{answer.response}</p>
									</div>
									<div style={{ marginLeft: 'auto' }}>
										<button
											onClick={() =>
												handleDeleteAnswer(questionIndex, ansIndex)
											}>
											<p className='pDelete'>Eliminar</p>
										</button>
									</div>
								</div>
							))}
						</div>
						<div className='guardaBotones '>
							<Button
								onClick={() => handleAddAnswer(questionIndex)}
								className='bg-background'>
								Agregar Respuesta
							</Button>
							<Button
								onClick={() => handleDeleteQuestion(questionIndex)}
								className='bg-danger-400'>
								Eliminar pregunta
							</Button>
						</div>
					</div>
				))}
			</div>
			<Button className='p-7 mb-5 text-xl' onClick={handleAddQuestion}>
				Agregar Pregunta
			</Button>

			<Button
				className='p-7 bg-background text-xl'
				onClick={handleSaveQuestionnaire}>
				Guardar Cuestionario
			</Button>
		</div>
	);
};


export default QuizForm;
