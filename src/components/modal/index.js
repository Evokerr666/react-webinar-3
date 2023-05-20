import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Head from '../head';
import Footer from '../footer';

function Modal({active, onClose, children, modalTitle, basket}) {
  return (
    <div className={active ? 'Modal active' : 'Modal'} onClick={onClose}>
      <div
        className={active ? 'Modal_content  active' : 'Modal_content'}
        onClick={(e) => e.stopPropagation()}
      >
        <Head
          title={modalTitle}
          actions={[{ title: 'Закрыть', id: 'close', action: onClose }]}
          className={'Head-modal'}
        />
        {children}
        <Footer basket={basket} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  onClose: PropTypes.func,
  basket: PropTypes.arrayOf(PropTypes.object).isRequired,
  modalTitle: PropTypes.string,
  children: PropTypes.node,
};

Modal.defaultProps = {
  onClose: () => {},
};

export default React.memo(Modal);
