import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { numFormatter } from '/utils';
import { cn as bem } from '@bem-react/classname';

function Footer({totalPrice}) {
  const cn = bem('Footer');
  return (
    <div className={cn()}>
      <div className={cn("name")}>Итого</div>
      <div className={cn("price")}>
        {totalPrice ? `${numFormatter(totalPrice)} ₽` : '0 ₽'}
      </div>
    </div>
  );
}

Footer.propTypes = {
  totalPrice: PropTypes.number
};

Footer.defaultProps = {
  numFormatter: () => {},
};

export default React.memo(Footer);
