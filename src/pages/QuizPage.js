import React from "react"
import { Link } from "react-router-dom"
import Question from "../components/Question"

export default function QuizPage({answer, question, handleSelect, handleCheck, isChecked, score, handleScore}) {

 
   return (
    <div className="quiz-page">
        <Question
            answer={answer}
            question={question}
            handleSelect={handleSelect}
            isChecked={isChecked}/>


        <div className="footer-quiz-page">
          {isChecked &&<p>You scored {score}/5 correct answers</p>}

          {!isChecked && <button onClick={()=>{
                                      handleCheck()
                                      handleScore()}}>
                Check answers
              </button>}
          {isChecked&& <Link to="/react-quizzical">
              <button onClick={()=>{handleCheck()}}>
                End game
              </button>
          </Link>}
        </div>
    </div>
  )
}
