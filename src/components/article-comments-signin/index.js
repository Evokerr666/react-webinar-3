import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router-dom";

function ArticleCommentsSignIn(props){

  const cn = bem('ArticleCommentsSignIn');


  return (
    <div className={cn()}>
      <div className={cn('title')}>
        Комментарии (0)
      </div>
      <div className={cn('sign')}>
        <div>{<Link to={'/login'}>Войдите,</Link>} чтобы иметь возможность комментировать</div>
      </div>
    </div>
  );
}

/* Item.propTypes = {
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

Item.defaultProps = {
  onAdd: () => {},
  labelCurr: '₽',
  labelAdd: 'Добавить'
} */

export default memo(ArticleCommentsSignIn);
