import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Item(props) {
  
  const cn = bem('Item');

  const renderButton = () => {
    if (props.item.count) {
      return (
        <button
          className={cn('delete')}
          onClick={() => props.onDeleteItem(props.item.code)}
        >
          Удалить
        </button>
      );
    }
    return (
      <button className={cn('add')} onClick={() => props.onAddItem(props.item)}>
        Добавить
      </button>
    );
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{`${props.item.price} ₽`}</div>
      {props.item.count && (
        <div className={cn('count')}>{`${props.item.count} шт`}</div>
      )}
      <div>{renderButton()}</div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  renderButton: PropTypes.func,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

Item.defaultProps = {
  onAddItem: () => {},
  onDeleteItem: () => {},
  renderButton: () => {},
};

export default React.memo(Item);
