
import PropTypes from 'prop-types';
import CountdownItem from './CountdownItem';

const TimerView = ({ timeRemaining }) => {

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000).toString().padStart(2, '0');

  const countdownData = [
    { value: days, label: 'days' },
    { value: hours, label: 'hours' },
    { value: minutes, label: 'min' },
    { value: seconds, label: 'sec' }
  ];

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
    
      {countdownData.map((item, index) => (
        <CountdownItem key={index} value={item.value} label={item.label} />
      ))}
    </div>
  );
};

TimerView.propTypes = {
  timeRemaining: PropTypes.number.isRequired,
};

export default TimerView;
