'use client'
import { useState } from "react";
import "./QuizForm.scss"
import { useCreateQuiz } from "@/zustand/store/updataeQuizes";

const QuizForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {createQuiz} = useCreateQuiz()
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

const handleTitleChange = (e) => {
  setTitle(e.target.value);
};
const handleDescriptionChange = (e) => {
  setDescription(e.target.value);
};

const handleAddQuestion = () => {
  const newQuestionData = [...questionData, { question: '', answers: [], correctAnswer: '' }];
  setQuestionData(newQuestionData);
};

const handleAddAnswer = (questionIndex) => {
  const newQuestionData = [...questionData];
  const newAnswer = { response: currentAnswer, verdadera: false };
  newQuestionData[questionIndex].answers.push(newAnswer);
  setQuestionData(newQuestionData);
  setCurrentAnswer('');
};

const handleDeleteQuestion = (questionIndex) => {
  const newQuestionData = [...questionData];
  newQuestionData.splice(questionIndex, 1); // Elimina la pregunta en el índice questionIndex
  setQuestionData(newQuestionData);
};

const handleDeleteAnswer = (questionIndex, ansIndex) => {
  const updatedAnswers = [...questionData];
  const newupdatedAnswers = updatedAnswers[questionIndex].answers.splice(ansIndex, 1)
  setCurrentAnswers(newupdatedAnswers);
};

const handleQuestionChange = (text, questionIndex) => {
  const newQuestionData = [...questionData];
  newQuestionData[questionIndex].question = text;
  setQuestionData(newQuestionData);
};

const handleCorrectAnswerChange = (answer, questionIndex) => {
  const newQuestionData = [...questionData];
  newQuestionData[questionIndex].answers.forEach((ans) => {
    ans.verdadera = ans.response === answer;
  });
  setQuestionData(newQuestionData);
};

const handleSaveQuestionnaire = () => {
  const questionnaireData = {
    name: title,
    description: description,
    quest:questionData,
    
  };
  console.log(questionnaireData)
  createQuiz(questionnaireData)
};

return (
  <div className="main">
    <div className="header">
      <h1>Crear Cuestionario</h1>
      <input
        className="inputHeader"
        type="text"
        placeholder="Título del cuestionario"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        className="inputHeader"
        type="text"
        placeholder="Descripcion del cuestionario"
        value={description}
        onChange={handleDescriptionChange}
      />
    </div>

    <div className="body">
    {questionData.map((question, questionIndex) => (
  <div className="divEveryQuestion" key={questionIndex}>
    <h3>Pregunta {questionIndex + 1}</h3>
    <input
      className="input"
      type="text"
      placeholder="Nueva pregunta"
      value={question.question}
      onChange={(e) => handleQuestionChange(e.target.value, questionIndex)}
    />
    <input
      className="input"
      type="text"
      placeholder="Respuesta"
      value={currentAnswer}
      onChange={(e) => setCurrentAnswer(e.target.value)}
    />
    <div>
    {question.answers.map((answer, ansIndex) => (
  <div className="inputElements" key={ansIndex}>
    <div className="divInput">
      <input
        className="inputRadio"
        type="radio"
        name={`correctAnswer_${questionIndex}`}
        value={answer.response}
        checked={answer.verdadera}
        onChange={() => handleCorrectAnswerChange(answer.response, questionIndex)}
      />
      <p className="pAnswer">{answer.response}</p>
    </div>
    <div style={{ marginLeft: 'auto' }}>
      <button onClick={() => handleDeleteAnswer(questionIndex, ansIndex)}>
        <p className="pDelete">Eliminar</p>
      </button>
    </div>
  </div>
))}
    </div>
    <div className="guardaBotones">
    <button onClick={() => handleAddAnswer(questionIndex)}>Agregar Respuesta</button>
    <button onClick={() => handleDeleteQuestion(questionIndex)}>Eliminar pregunta</button>
    </div>

  </div>
))}
    </div>
        <button className="agregarQ" onClick={handleAddQuestion}>Agregar Pregunta</button>
     
    <button className="QuizSave" onClick={handleSaveQuestionnaire}>Guardar Cuestionario</button>
  </div>
);
}

  export default QuizForm;