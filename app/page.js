
"use client";
import { useEffect, useState } from 'react';
import './globals.css';


const App = () => {


  let [workDuration, setWorkDuration] = useState(25*60);

  let [durationChange, setDurationChange] = useState(0);

  let [start, setStart] = useState(durationChange);

  let [breakChange, setBreakChange] = useState(0);

  let [flag, setFlag] = useState(false);

  let [disabled, setDisable] = useState(false);

  let[stopDisability, setStopDisablity] = useState(true);

  let [resetDisability, setResetDisablity] = useState(true);

  let [count, setCount] = useState(0);

  let [alertText, setAlertText] = useState("work duration is over");
  let [textTime, setTextTime] = useState("Work-Time")

  function Timer(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }


  function handleCLick(){
    setWorkDuration(durationChange);
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
            setWorkDuration(breakChange);
            setAlertText("break duration is over");
            setTextTime("Break-Time");
          }

          else{
            setWorkDuration(durationChange);
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
  }

  function Stop(){
    console.log(Timer(workDuration));
    setFlag(false);
    setStopDisablity(true);
    setDisable(false);
    setResetDisablity(false);
  }


  function handleReset(){
    setWorkDuration(25*60);
    setDisable(false);
    setResetDisablity(true);
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

    <div>
      <input onChange={(e) => setDurationChange(e.target.value)} type='number' required placeholder='work duration'></input>
      <input onChange={(e)=> setBreakChange(e.target.value)} type='number' placeholder='break duration' required></input>
      <button onClick={handleCLick}>set</button>
    </div>
  </div>
  )
}


export default App;
