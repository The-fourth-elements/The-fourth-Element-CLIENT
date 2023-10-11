'use client'
import { useState } from "react";
import "./QuizForm.scss"

const QuizForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState(''); 
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionData, setQuestionData] = useState([
    {
      question: '',
      answers: [],
      correctAnswer: '',
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
  newQuestionData[questionIndex].answers.push(currentAnswer);
  setQuestionData(newQuestionData);
  setCurrentAnswer('');
};

const handleDeleteQuestion = (index) => {
  const updatedQuestions = [...questions];
  updatedQuestions.splice(index, 1);
  setQuestions(updatedQuestions);
};

const handleDeleteAnswer = (index) => {
  const updatedAnswers = [...currentAnswers];
  updatedAnswers.splice(index, 1);
  setCurrentAnswers(updatedAnswers);
};

const handleQuestionChange = (text, questionIndex) => {
  const newQuestionData = [...questionData];
  newQuestionData[questionIndex].question = text;
  setQuestionData(newQuestionData);
};

const handleCorrectAnswerChange = (answer, questionIndex) => {
  const newCorrectAnswerChange = [...questionData];
  newCorrectAnswerChange[questionIndex].correctAnswer = answer;
  setQuestionData(newCorrectAnswerChange);
};

const handleSaveQuestionnaire = () => {
  const questionnaireData = {
    name: title,
    description: description,
    quest:questionData,
    
  };

    console.log(questionnaireData)
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
  <div key={questionIndex}>
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
              value={answer}
              checked={question.correctAnswer === answer}
              onChange={() => handleCorrectAnswerChange(answer, questionIndex)}
            />
            <p className="pAnswer">{answer}</p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <button onClick={() => handleDeleteAnswer(questionIndex, ansIndex)}>
              <p className="pDelete">Eliminar</p>
            </button>
          </div>
        </div>
      ))}
    </div>
    <button onClick={() => handleAddAnswer(questionIndex)}>Agregar Respuesta</button>
  </div>
))}
    </div>
        <button onClick={handleAddQuestion}>Agregar Pregunta</button>
     
    <button className="QuizSave" onClick={handleSaveQuestionnaire}>Guardar Cuestionario</button>
  </div>
);
}

  export default QuizForm;