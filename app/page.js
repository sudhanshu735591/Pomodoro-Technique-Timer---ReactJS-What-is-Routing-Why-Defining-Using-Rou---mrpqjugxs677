
"use client";
import { useEffect, useState } from 'react';
import './globals.css';

const App = () => {
  let [workDuration, setWorkDuration] = useState(25*60);
  let [durationChange, setDurationChange] = useState(25);
  let [breakChange, setBreakChange] = useState(5);
  let [flag, setFlag] = useState(false);
  let [disabled, setDisable] = useState(false);
  let [stopDisability, setStopDisablity] = useState(true);
  let [resetDisability, setResetDisablity] = useState(true);
  let [count, setCount] = useState(0);
  let [alertText, setAlertText] = useState("work duration is over");
  let [textTime, setTextTime] = useState("Work-Time");
  let [inputWorkDisabled, setInputWorkDisabled] = useState("false");
  let [setButton, setSetButton] = useState("false");

  function Timer(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  function handleClick(e){
    e.preventDefault()
    if(durationChange==0){
      setWorkDuration(25*60);
    }

    if(durationChange==0 && breakChange==0){
      setDurationChange(25);
      setBreakChange(5);
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
    setInputWorkDisabled("true");
    setSetButton("true");
  }

  function Stop(){
    console.log(Timer(workDuration*60));
    setFlag(false);
    setStopDisablity(true);
    setDisable(false);
    setResetDisablity(false);
    setInputWorkDisabled("false");
    setSetButton("false");

  }


  function handleReset(){
    setFlag(false);
    setWorkDuration(25*60);
    setDisable(false);
    setResetDisablity(true);
    setInputWorkDisabled("false");
    setStopDisablity(true);
    setSetButton("false");
    setDurationChange(25);
    setBreakChange(5);
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
      <input disabled = {inputWorkDisabled==="false"?false:true} onChange={(e) => setDurationChange(e.target.value)} value={durationChange<0?"":durationChange}  data-testid='work-duration' type='number' required placeholder='work duration'></input>
      <input disabled= {inputWorkDisabled==="false"?false:true} onChange={(e)=> setBreakChange(e.target.value)} value={breakChange<0?"":breakChange}  type='number' data-testid='break-duration' placeholder='break duration' required></input>
      <button disabled = {setButton==="false"?false:true} data-testid='set-btn' type='submit' onClick={handleClick}>set</button>
    </form>
  </div>
  )
}

export default App;
