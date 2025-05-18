import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { motion } from 'framer-motion'
import './QuestionCard.css'

function QuestionCard({ questionObj, questionNumber, totalQuestions, onAnswerClick, selectedAnswerIndex, isAnswered }) {
  const { question, options, correctIndex } = questionObj

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="question-card p-4 mb-4 shadow-lg">
        <div className="question-header mb-3">
          <span className="q-number">Question {questionNumber} of {totalQuestions}</span>
        </div>
        <h4 className="question-text mb-4">{question}</h4> 
        <div className="options-list">
          {options.map((option, index) => {
            const isCorrect = index === correctIndex
            const isSelected = index === selectedAnswerIndex

            let variant = 'outline-primary'

            if (isAnswered) {
              if (isSelected && isCorrect) variant = 'success'
              else if (isSelected && !isCorrect) variant = 'danger'
              else if (!isSelected && isCorrect) variant = 'success'
            }

            return (
              <motion.div
                whileTap={{ scale: 0.90 }}
                key={index}
                className="option-button"
              >
                <Button
                  variant={variant}
                  className={`w-100 text-left option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => onAnswerClick(index)}
                  disabled={isAnswered}
                >
                  {option}
                </Button>
              </motion.div>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}

export default QuestionCard
