import { useState, useEffect } from "react";
import "./App.css";
import clocktimer from "../src/assets/clockover.jpg";
import Form from "./Components/Form";
import TimerView from "./Components/TimerView";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0); 

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setIsRunning(false);
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
  };

  const handleDateTime = (value) => {
    setDateTime(value);
    const timestamp = Date.parse(value);
    const currentTime = Date.now();
    setTimeRemaining(timestamp - currentTime);
  };

  const handleReset = () => {
    setIsRunning(false);
    setDateTime("");
    setTimeRemaining(0);
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
        </div>
        <div className="w-2/4">
          <img src={clocktimer} alt="clocktimer" />
        </div>
      </div>
    </>
  );
}

export default App;
