import React, { useState } from 'react';

const quizQuestions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: "Jupiter",
    },
    {
      question: "Which programming language is commonly used for web development?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correctAnswer: "JavaScript",
    },
  ];
  
const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(quizQuestions.length).fill(''));
  const [showScore, setShowScore] = useState(false);

  const handleOptionChange = (event) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return answer === quizQuestions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };
  
  return (
    <div className="container mx-auto p-4  text-start ml-32 ">
      <h1 className="text-6xl font-bold mb-4  text-center">Quiz App</h1>
     
      {!showScore ? (
        <div className="quiz-container mt-12  p-6">
          <h2 className="text-3xl mb-2">{quizQuestions[currentQuestionIndex].question}</h2>
          <div className="options  mb-4 text-3xl ">
            {quizQuestions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="mb-2  ">
                <input
                
                  required
                  type="radio"
                  id={option}
                  name="quiz"
                  value={option}
                  checked={userAnswers[currentQuestionIndex] === option}
                  onChange={handleOptionChange}
                  className="p-4 mr-2"
                />
                <label required htmlFor={option} className="text-xl">{option}</label>
              </div>
            ))}
          </div>
       
          <button onClick={handleNextQuestion} className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-[#7747FF] hover:bg-black hover:text-[#7747FF]   text-gray-50 font-bold leading-loose transition duration-75">
            {currentQuestionIndex < quizQuestions.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      ) : (
        <div className="score-container">
          <h2 className="text-xl mb-4">Your Score: {calculateScore()} / {quizQuestions.length}</h2>
          {quizQuestions.map((question, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">{question.question}</h3>
              <p className={`text-lg ${userAnswers[index] === question.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
                Your answer: {userAnswers[index]} (Correct answer: {question.correctAnswer})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
