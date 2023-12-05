
"use client";
import { useEffect, useState } from 'react';
import './globals.css';

const App = () => {
  let [workDuration, setWorkDuration] = useState(25*60);

  let [durationChange, setDurationChange] = useState(25);

  let [start, setStart] = useState(durationChange);

  let [breakChange, setBreakChange] = useState(5);

  let [flag, setFlag] = useState(false);

  let [disabled, setDisable] = useState(false);

  let[stopDisability, setStopDisablity] = useState(true);

  let [resetDisability, setResetDisablity] = useState(true);

  let [count, setCount] = useState(0);

  let [alertText, setAlertText] = useState("work duration is over");

  let [textTime, setTextTime] = useState("Work-Time");

  let [inputWorkDisabled, setInputWorkDisabled] = useState(false);

  // let [inputBreakkDisabled, setInputBreakDisabled] = useState(true);




  function Timer(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }


  function handleCLick(e){
    e.preventDefault()
    if(durationChange==0){
      setWorkDuration(25*60)
    }
    else{
      setWorkDuration(durationChange*60);
    }
    setFlag(false);
    setDisable(false);
    setResetDisablity(false);

  }



  useEffect(() => {
    let timer;
    
    if(flag){
      timer = setTimeout(() => {

        if (workDuration <=1) {
          alert(alertText);

          setCount(count+1);

          console.log(count);

          if(count%2==0){
            setWorkDuration(breakChange*60);
            setAlertText("break duration is over");
            setTextTime("Break-Time");
          }

          else{
            setWorkDuration(durationChange*60);
            setAlertText("work duration is over");
            setTextTime("Work-Time");

          }

          return;   
        }
        
        setWorkDuration(workDuration - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [flag,workDuration]);



  function handleStart(){
    setFlag(true);
    setDisable(true);
    setStopDisablity(false);
    setResetDisablity(false);
    setInputWorkDisabled(true);

  }

  function Stop(){
    console.log(Timer(workDuration*60));
    setFlag(false);
    setStopDisablity(true);
    setDisable(false);
    setResetDisablity(false);
    setInputWorkDisabled(false);

  }


  function handleReset(){
    setFlag(false);
    setWorkDuration(25*60);
    setDisable(false);
    setResetDisablity(true);
    setInputWorkDisabled(false);
  }
  

return (
  <div id="main">
    {
      Timer(workDuration)
    }
    
    <div className='start-time'>{textTime}</div>
    
    <div>
      <button disabled= {disabled} onClick={handleStart} data-testid='start-btn'>start</button>
      <button disabled= {stopDisability} onClick={Stop} data-testid='stop-btn'>Stop</button>
      <button disabled= {resetDisability} onClick={handleReset} data-testid='reset-btn'>Reset</button>
    </div>

    <form>
      <input disabled = {inputWorkDisabled} onChange={(e) => setDurationChange(e.target.value)} value={durationChange<0?"":durationChange}  data-testid='work-duration' type='number' required placeholder='work duration'></input>
      <input disabled= {inputWorkDisabled} onChange={(e)=> setBreakChange(e.target.value)} value={breakChange<0?"":breakChange}  type='number' data-testid='break-duration' placehonnlder='break duration' required></input>
      <button type='submit' onClick={handleCLick}>set</button>
    </form>
  </div>
  )
}


export default App;
