import  { useState,useRef } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'
const Quiz = () => {
  let [index,setIndex] = useState(0)
  let[question,setQuestion]=useState(data[index]);
  let[lock,setlock] =useState(false);
  let[score,setScore] = useState(0);
  let [result,setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_array=[option1,option2,option3,option4];
  

  const checkAns=(e,ans)=>{
        if(lock===false){
          if(question.answer===ans){
          e.target.classList.add("correct");
          setScore((prev)=>prev+1);
          setlock(true);
        }else{
          e.target.classList.add("wrong");
          setlock(true);
          option_array[question.answer-1].current.classList.add("correct");
        }
      }      
  }

  const Next=()=>{
    
          if(lock===true){
            if(index === data.length-1){
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setlock(false);

            option_array.map((option)=>{
              option.current.classList.remove("wrong");
              option.current.classList.remove("correct");
              return null;
            })
          }
    }

    const Reset=()=>{
      setIndex(0);
      setQuestion(data[0]);
      setScore(0);
      setlock(false);
      setResult(false)
    }
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {
        result? <></> :
        <>
          <h2 className='question'>{index+1}.{question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e)=>checkAns(e,1)}>{question.option1}</li>
            <li ref={option2} onClick={(e)=>checkAns(e,2)}>{question.option2}</li>
            <li ref={option3} onClick={(e)=>checkAns(e,3)}>{question.option3}</li>
            <li ref={option4} onClick={(e)=>checkAns(e,4)}>{question.option4}</li>
          </ul>
           <button onClick={Next}>Next</button>
           <div className="index">
             {index+1} of {data.length} questions
           </div>
        </>
        
      }
      {
        result?
        <> 
          <h2>You Scored {score} out of {data.length}</h2>
           <button onClick={Reset}>Reset</button>
        </> : <></>
      }
      
      
    </div>
  )
}

export default Quiz
