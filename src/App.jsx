import { useState, useEffect } from "react";
import "./App.css";
import clocktimer from "../src/assets/clockover.jpg";
import Form from "./Components/Form";
import TimerView from "./Components/TimerView";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerEnded, setTimerEnded] = useState(false); 

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setIsRunning(false);
            setTimerEnded(true); 
            return 0;
          } else {
            return prevTime - 1000;
          }
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleTimerToggle = () => {
    setIsRunning(!isRunning);
    setTimerEnded(false); 
  };

  const handleDateTime = (value) => {
    setDateTime(value);
    const timestamp = Date.parse(value);
    const currentTime = Date.now();
    setTimeRemaining(timestamp - currentTime);
    setTimerEnded(false); 
  };

  const handleReset = () => {
    setIsRunning(false);
    setDateTime("");
    setTimeRemaining(0);
    setTimerEnded(false); 
  };

  return (
    <>
      <div className="bg-white h-screen w-screen flex overflow-hidden">
        <div className="w-2/4 flex items-center justify-center flex-col">
          <h1 className="mb-4 font-extrabold text-gray-700 text-6xl">
            <span className="text-red-500">CountDown</span> Timer
          </h1>
          <Form
            isRunning={isRunning}
            dateTime={dateTime}
            onhandleTimerToggle={handleTimerToggle}
            onhandleDateTime={handleDateTime}
            onhandleReset={handleReset}
          />
          <TimerView timeRemaining={timeRemaining} />
          {timerEnded && (
             <div className="flex items-center justify-center mt-4 border p-4 rounded-lg">
             <p className="text-3xl mr-2">🎉🎊</p>
             <p className="text-xl text-gray-700 "><span className="text-red-500">The Countdown is over!</span> whats next on your adventure?.</p>
             <p className="text-3xl mr-2">🎉🎊</p>
           </div>
          )} 
        </div>
        <div className="w-2/4">
          <img src={clocktimer} alt="clocktimer" />
        </div>
      </div>
    </>
  );
}

export default App;
