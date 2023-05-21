import React from 'react';
import PropTypes from 'prop-types';
import { numFormatter, plural} from '../../utils';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Controls({onOpen, basketCount, totalPrice}) {
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <div className={cn('basket')}>В корзине:</div>
      <div className={cn('info')}>
        {basketCount
          ? basketCount +
            ` ${plural(basketCount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numFormatter(totalPrice)} ₽`
          : 'пусто'}
      </div>
      <button className={cn('actions')} onClick={() => onOpen()}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  onOpen: PropTypes.func,
  totalPrice: PropTypes.number,
  basketCount: PropTypes.number,
};

Controls.defaultProps = {
  onOpen: () => {},
};

export default React.memo(Controls);
