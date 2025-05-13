
import { useEffect, useState } from 'react';
import './App.css'
import questions from "../src/data/questions.json"
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from 'react-bootstrap';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import Timer from './components/Timer';

function App() {
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResuls] = useState(false)

  const currentQuestion = questions[currentQIndex]

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index)
    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1)
    }
  }

  useEffect(() => {
    if (selectedAnswer !== null) {
      const timer = setTimeout(() => {
        if (currentQIndex + 1 < questions.length) {
          setCurrentQIndex(prev => prev + 1)
          setSelectedAnswer(null)
        } else {
          setShowResuls(true)
        }
      }, 1000)

      return () => clearTimeout(timer); // təmizləmə
    }
  }, [selectedAnswer])

  const restartQuiz = () => {
    setCurrentQIndex(0)
    setSelectedAnswer(null)
    setShowResuls(false)
    setScore(0)
  }

  const handleTimeout = () => {
    if (selectedAnswer === null) {
      if (currentQIndex + 1 < questions.length) {
        setSelectedAnswer(-1); 
        setTimeout(() => {
          setCurrentQIndex(prev => prev + 1);
          setSelectedAnswer(null);
        }, 1000);
      } else {
        setSelectedAnswer(-1);
        setTimeout(() => {
          setShowResuls(true);
        }, 1000);
      }
    }
  };

  return (
    <Container className='py-5'>
      <h2 className='text-center mb-4'>Quiz App</h2>

      {!showResult ? (
        <>
          <ProgressBar current={currentQIndex + 1} total={questions.length} />
          <Timer
            duration={60}
            isRunning={selectedAnswer === null}
            onTimeout={handleTimeout}
          />

          <QuestionCard
            questionObj={currentQuestion}
            questionNumber={currentQIndex + 1}
            totalQuestions={questions.length}
            onAnswerClick={handleAnswerClick}
            selectedAnswerIndex={selectedAnswer}
            isAnswered={selectedAnswer !== null}
          />
        </>

      ) : (
        <div className="text-center">
          <h3>🎉 Quiz Finished!</h3>
          <p>Your Score: {score} / {questions.length}</p>
          <Button onClick={restartQuiz} className="mt-3">Restart Quiz</Button>
        </div>
      )}
    </Container>
  )
}

export default App
