import React from "react";
import PropTypes from 'prop-types';
import Modal from 'src/components/modal';
import List from "../list";
import {plural, totalPrice} from "../../utils";

import './style.css';

function Controls({ onOpen, active, onClose, basket = [], onDeleteItem }) {
  console.log("basket", basket);
  console.log("basket.length", basket.length);

  return (
    <div className="Controls">
      <div className="Controls-price">
        В корзине:{" "}
        {basket.length
          ? basket.length +
            ` ${plural(basket.length, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${totalPrice(basket)} ₽`
          : "Пусто"}
      </div>
      <button onClick={() => onOpen()}>Перейти</button>
      <Modal
        active={active}
        onClose={onClose}
        basket={basket}
        modalTitle={"Корзина"}
      >
        <List list={basket} onDeleteItem={onDeleteItem} />
      </Modal>
    </div>
  );
}

Controls.propTypes = {
  onOpen: PropTypes.func
};

Controls.defaultProps = {
  onOpen: () => {}
}

export default React.memo(Controls);
