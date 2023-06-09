import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import dateParser from "../../utils/date-parser";

function Comment(props) {
  const cn = bem("Comment");
  console.log('Comment props', props.comment.dateCreate);
 /*  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  }; */

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <div className={cn("user")}>{props.comment.author.profile.name}</div>
        <div className={cn("date")}>{dateParser(props.comment.dateCreate)}</div>
      </div>
      <div className={cn("text")}>{props.comment.text}</div>
      <button className={cn("answer")} /* onClick={callbacks.onAdd} */>{props.labelAnswer}</button>
    </div>
  );
}

/* Comment.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  link: PropTypes.string,
  onAdd: PropTypes.func,
  labelCurr: PropTypes.string,
  labelAdd: PropTypes.string
};

Comment.defaultProps = {
  onAdd: () => {},
  labelCurr: '₽',
  labelAdd: 'Добавить'
} */

export default memo(Comment);
