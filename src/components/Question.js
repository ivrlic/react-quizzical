import React from "react"
import { decode } from "html-entities"

export default function ({question, answer, handleSelect, isChecked, }) {   
    
    // one array of 5 arrays (for 5 questions) of 4 answers(objects)
    const answerComponent = answer.map(answersBlockArray => {
       
        // array of four answers for one question
        const fourAnswers = answersBlockArray.map(answer => {
        
            // getting style for answers: normal, selected, wrong, correct, after submitting
            function getCorrectStyle() {
                let style = {}
                // if answers are submitted
                if (isChecked===true) {
                    if(answer.isCorrect){
                        return style = {
                            border: "none",
                            backgroundColor: "#94D7A2",
                        }
                    } else if (answer.isSelected) {
                        return style = {
                            border: "none",
                            backgroundColor: "#F8BCBC",
                            opacity: 0.5,
                        }
                    } else {
                        return style = {
                            opacity: 0.5,
                        }
                    }   
                // if answers are not submitted               
                } else {
                    return style = {
                        backgroundColor: answer.isSelected ? "#D6DBF5" : "",
                        border: answer.isSelected ? "none" : "1px solid #4D5B9E"
                    }
                }
            }

            // return of every answer 
            return (
                <span
                    key={answer.id}
                    className={`answer ${!isChecked && "not-checked-answer"}`}
                    style={getCorrectStyle()}
                    onClick={()=>!isChecked && handleSelect(answer.id)}>
                        {decode(answer.text)}
                </span>
            )
        })
  
        // returning 4 answer objects for one question
        return (
            <div key={crypto.randomUUID()} className="answer-cont">
                {fourAnswers}
            </div>
        )  
    }) 
  
    // array of 5 questions
    const questionComponent = question.map((question, index) => {
        return (
        <div key={crypto.randomUUID()} className="question-cont">
            <p className="question">{decode(question)}</p>
            {answerComponent[index]}
            <hr />
        </div>
        )
    })
 
    // returning all 5 questions with related answers
    return (
        <div className="quiz-cont">
            {questionComponent}
        </div>
    )
}


 