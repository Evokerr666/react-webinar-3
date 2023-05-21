import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({active, onClose, children}) {
  return (
    <div className={active ? 'Modal active' : 'Modal'} onClick={onClose}>
      <div
        className={active ? 'Modal_content  active' : 'Modal_content'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  onClose: () => {},
};

export default React.memo(Modal);
