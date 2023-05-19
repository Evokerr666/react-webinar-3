import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Head from "../head";
import { totalPrice } from "../../utils";

function Modal({
  active,
  onClose,
  children,
  modalTitle,
  basket,
  onDeleteItem,
}) {
  return (
    <div className={active ? "modal active" : "modal"} onClick={onClose}>
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <Head title={modalTitle}></Head>
        {children}
        <button onClick={onClose}>Закрыть</button>
        <div className="Modal-price">Итого: {`${totalPrice(basket)} ₽`}</div>
      </div>
    </div>
  );
}

export default Modal;
