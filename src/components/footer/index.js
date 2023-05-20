import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { totalPrice } from '/utils';
import { cn as bem } from '@bem-react/classname';

function Footer({basket}) {
  
  const cn = bem('Footer');

  return (
    <div className={cn()}>
      <div className={cn('name')}>Итого</div>
      <div className={cn('price')}>{`${totalPrice(basket)} ₽`}</div>
    </div>
  );
}

Footer.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default React.memo(Footer);
