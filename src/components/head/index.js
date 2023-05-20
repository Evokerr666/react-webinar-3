import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({title, actions, className}) {
  return (
    <div className={className}>
      <h1>{title}</h1>
      <>
        {actions.map((item) => (
          <button className='Head-button' onClick={item.action} key={item.id}>
            {item.title}
          </button>
        ))}
      </>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.array,
  className: PropTypes.string,
};

Head.defaultProps = {
  actions: [],
};

export default React.memo(Head);
