import React from "react"
import { Link } from "react-router-dom"

export default function IntroPage({handleisGameOn}) {
  return (
    <div className="intro-cont">
        <h1>Quizzical</h1> 
        <p>Take a challenge and answer all trivia questions. </p>
        <Link to="/react-quizzical/quiz">
          <button onClick={()=>handleisGameOn()}>Start quiz</button>
        </Link>        
    </div>
  )
}
