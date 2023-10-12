"use client"
import "./QuizRender.scss"
import { toastSuccess, toastError } from "@/helpers/toast"
import { useState } from "react";

const QuizRender = () => {
    const quiz = {
      description: "esta es la descipcion tal vez asi de larga esta bien",
      name: "el titulo del quiz",
      quest: [
        {
          answers: [
            {
              response: "option 1",
              verdadera: false,
            },
            {
              response: "option 2",
              verdadera: true,
            },
            {
              response: "option 3",
              verdadera: false,
            },
          ],
          question: "pregunta 1",
        },
        {
          answers: [
            {
              response: "option 4",
              verdadera: false,
            },
            {
              response: "option 5",
              verdadera: true,
            },
            {
              response: "option 6",
              verdadera: false,
            },
          ],
          question: "pregunta 2",
        },
      ],
    };
  
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
        <div className="main">
          <h1>{quiz.name}</h1>
          <h2>{quiz.description}</h2>
          {quiz.quest.map((pregunta, questionIndex) => (
            <div key={questionIndex}>
              <h3>{pregunta.question}</h3>
              {pregunta.answers.map((answer, answerIndex) => (
                <div key={answerIndex}>
                  <input
                    type="radio"
                    value={answerIndex}
                    checked={selectedAnswers[questionIndex] === answerIndex}
                    onChange={() => handleAnswerChange(questionIndex, answerIndex)}
                  />
                  <p>{answer.response}</p>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleSendQuiz}>Enviar</button>
        </div>
      );
  };

export default QuizRender;