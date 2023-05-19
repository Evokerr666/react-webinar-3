import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({ title, actions = [] }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {actions.map((item) => (
        <button key={item.id}>{item.title}</button>
      ))}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  actions: PropTypes.array
};

export default React.memo(Head);
