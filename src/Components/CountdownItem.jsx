import PropTypes from 'prop-types';

const CountdownItem = ({ value, label }) => {
  return (
    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
      <span className="countdown font-mono text-5xl">
        <span style={{ "--value": value }}>{value}</span>
      </span>
      {label}
    </div>
  );
};

CountdownItem.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default CountdownItem;
