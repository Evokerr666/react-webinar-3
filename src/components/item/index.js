import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {
  const renderButton = () => {
    if (props.item.count) {
      return (
        <button onClick={() => props.onDeleteItem(props.item.code)}>
          Удалить
        </button>
      );
    }
    return (
      <button onClick={() => props.onAddItem(props.item)}>Добавить</button>
    );
  };

  return (
    <div className={"Item"}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{props.item.price + " ₽"}</div>
      {props.item.count && <div>{props.item.count} шт.</div>}
      <div className="Item-actions">{renderButton()}</div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {},
  ondd: () => {},
}

export default React.memo(Item);
