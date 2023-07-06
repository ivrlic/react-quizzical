import React, { useEffect, useState } from "react";
import IntroPage from "./pages/IntroPage";
import QuizPage from "./pages/QuizPage";
import { Route, Routes } from "react-router-dom";
import img1 from "./images/blobs-baby.png"
import img2 from "./images/blobs-lemony.png"
import axios from "axios";

function App() {

  const [answer, setAnswer] = useState(getAnswerArray())
  const [question, setQuestion] = useState([])
  const [loading, setLoading] = useState(true)
  const [isChecked, setIsChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [isGameOn, setIsGameOn] = useState(false)


  useEffect(() => {
      setLoading(true)
      const url = "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
      let cancel
      axios.get(url, {
        cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
          setLoading(false) 
          setQuestion(getQuestionArray(res.data)) 
          setAnswer(getAnswerArray(res.data)) 
       }).catch(err => console.log("cancel getting data..."))

      return () => cancel()
  }, [isGameOn]) 


  // getting correct and false answers into object arrays with new properties 
  // and shuffling answers in the arrays
  function getQuestionArray (data){
    if (data){
      const questionArray = data.results.map(result => {
          return result.question
      })
      return questionArray
    }
  }


  // getting correct and false answers into object arrays with new properties 
  // and shuffling answers in the arrays
  function getAnswerArray (data){
    if (data){
      const answerArray = data.results.map(result => {
          const wrongAnswers = result.incorrect_answers
          const correctAnswer = result.correct_answer
          const answers = wrongAnswers.concat(correctAnswer)
          shuffledArray(answers)
          // turning array of string answers and into the objects
          return answers.map(answer => {      
                  return {
                      text: answer,
                      id: crypto.randomUUID(),
                      isSelected: false,
                      isCorrect: answer === correctAnswer ? true : false
                  }
          })
      })
      return answerArray
    }
  }


  // function that shuffles items in array 
  function shuffledArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array
  }
 

  function calculateScore() {
      const selectedArray = answer.map(answerBlock => answerBlock.filter(
          answer=>answer.isSelected))
      const scoreArray = selectedArray.filter(answer => answer[0].isCorrect)
        setScore(scoreArray.length)
  }


  function toggleSelectAnswer(id) {
    setAnswer(prev => prev.map(
                answerBlock => {
                  if(answerBlock[0].id === id || answerBlock[1].id === id || 
                    answerBlock[2].id === id || answerBlock[3].id === id){
                        return answerBlock.map(
                          answer => {
                              return answer.id === id ?
                                {...answer, isSelected: !answer.isSelected} :
                                {...answer, isSelected: false }                   
                        })
                  } else {return answerBlock}
                } 
      ))
  }


  function toggleCheckAnswers (){
    setTimeout(()=>setIsChecked(!isChecked), 200) 
  }


  // toggling as a dependency for useEffect to render new questions at start of the game
  // two times state changes so it could be "the game is on" always true
  function toggleGameOn (){
      setIsGameOn(!isGameOn) 
      setIsGameOn(!isGameOn) 
  }

    
  if(loading) return (
       <div className="intro-cont">
          <p className="loading">Loading...</p>
      </div>
  )

  return (
    <div>
      <Routes>
          <Route exact path="/react-quizzical" element={<IntroPage handleisGameOn={toggleGameOn}/>}/>
          <Route path="/react-quizzical/quiz" element={<QuizPage 
                  question={question}
                  answer={answer}
                  handleSelect={toggleSelectAnswer}
                  handleCheck={toggleCheckAnswers}
                  isChecked={isChecked}
                  score={score}
                  handleScore={calculateScore}
                  handleisGameOn={toggleGameOn}/>}/>
      </Routes>
      <img className="blob-baby" src={img1}/>
      <img className="blob-lemony" src={img2}/>
    </div>
  );
}

export default App;




