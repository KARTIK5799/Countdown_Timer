import PropTypes from 'prop-types';
import { useState } from 'react';

const Form = ({
  isRunning,
  dateTime,
  onhandleDateTime,
  onhandleTimerToggle,
  onhandleReset
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [btndisabled, setBtndisabled] = useState(false);

  const currentDate = new Date().toISOString().split(".")[0];

  const handleDateTime = (value) => {
    const selectedDate = new Date(value);
    const diffInDays = Math.floor((selectedDate - new Date()) / (1000 * 60 * 60 * 24));

    if (diffInDays > 100) {
      setErrorMsg("Please select a date less than 100 days from now.");
      setBtndisabled(true);
    } else {
      setErrorMsg("");
      setBtndisabled(false); // Reset the disabled state
      onhandleDateTime(value);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg flex flex-col items-center justify-center ">
        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
        <label
          htmlFor="dateTime"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Select Date and Time:
        </label>
        <input
          type="datetime-local"
          name="dateTime"
          id="dateTime"
          value={dateTime}
          min={currentDate}
          onChange={(event) => handleDateTime(event.target.value)}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 mb-4"
        />
        <div className='flex gap-3'>
          <button
            className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${btndisabled ? 'pointer-events-none opacity-80 cursor-not-allowed' : ''}`}
            type="button"
            onClick={onhandleTimerToggle}
            disabled={btndisabled}
          >
            {!isRunning ? "Start" : "Stop"} Timer
          </button>
          <button
            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${btndisabled ? 'pointer-events-none opacity-80 cursor-not-allowed' : ''}`}
            type="button"
            onClick={onhandleReset}
            disabled={btndisabled} 
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

Form.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  dateTime: PropTypes.string.isRequired,
  onhandleDateTime: PropTypes.func.isRequired,
  onhandleTimerToggle: PropTypes.func.isRequired,
  onhandleReset: PropTypes.func.isRequired
};

export default Form;
