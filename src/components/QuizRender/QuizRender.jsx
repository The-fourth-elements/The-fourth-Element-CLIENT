"use client"

import { toastSuccess, toastError } from "@/helpers/toast"
import { useState } from "react";
import "./QuizRender.scss"
const QuizRender = ({quiz}) => {
  
    const [selectedAnswers, setSelectedAnswers] = useState(new Array(quiz.quest.length).fill(null));
    const [correctQuestions, setCorrectQuestions] = useState(0);
  
    const totalQuestions = quiz.quest.length;
  
    const handleAnswerChange = (questionIndex, selectedAnswerIndex) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = selectedAnswerIndex;
        setSelectedAnswers(newSelectedAnswers);
      };
  
    const handleSendQuiz = () => {
        let correctCount = 0;
        
        for (let i = 0; i < quiz.quest.length; i++) {
          const selectedAnswerIndex = selectedAnswers[i];
          
          if (selectedAnswerIndex !== null && quiz.quest[i].answers[selectedAnswerIndex].verdadera) {
            correctCount++;
          }
        }
      
        const correctPercentage = (correctCount / totalQuestions) * 100;
      
        if (correctPercentage >= 60) {
          toastSuccess("Aprobado");
        } else {
          toastError("Reprobado");
        }
      };
  
    return (
        <div className="mainQuiz">
          <h1>{quiz.name}</h1>
          <h2>{quiz.description}</h2>
          {quiz.quest.map((pregunta, questionIndex) => (
            <div className= "divPregunta" key={questionIndex}>
              <h3>{pregunta.question}</h3>
              {pregunta.answers.map((answer, answerIndex) => (
              <label className="divOptions" key={answerIndex}>
                <input
                  type="radio"
                  value={answerIndex}
                  checked={selectedAnswers[questionIndex] === answerIndex}
                  onChange={() => handleAnswerChange(questionIndex, answerIndex)}
                />
                <p>{answer.response}</p>
              </label>
            ))}
            </div>
          ))}
          <button className="quizButton" onClick={handleSendQuiz}>Enviar</button>
        </div>
      );
  };

export default QuizRender;