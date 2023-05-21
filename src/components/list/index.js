import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({list, onAddItem, onDeleteItem}) {
  return (
    <div className='List'>
      {list.map((item) => (
        <div key={item.code} className='List__item'>
          <Item item={item} onAddItem={onAddItem} onDeleteItem={onDeleteItem} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

List.defaultProps = {
  onAddItem: () => {},
  onDeleteItem: () => {},
  list: [],
};

export default React.memo(List);
