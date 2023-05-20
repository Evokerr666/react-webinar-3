import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'src/components/modal';
import List from '../list';
import { plural, totalPrice } from '../../utils';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Controls({onOpen, active, onClose, basket, onDeleteItem}) {

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('basket')}>В корзине:</div>
      <div className={cn('info')}>
        {basket.length
          ? basket.length +
            ` ${plural(basket.length, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${totalPrice(basket)} ₽`
          : 'пусто'}
      </div>
      <button className={cn('actions')} onClick={() => onOpen()}>
        Перейти
      </button>
      <Modal
        active={active}
        onClose={onClose}
        basket={basket}
        modalTitle={'Корзина'}
      >
        <List list={basket} onDeleteItem={onDeleteItem} />
      </Modal>
    </div>
  );
}

Controls.propTypes = {
  onOpen: PropTypes.func,
  active: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onClose: PropTypes.func,
  basket: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Controls.defaultProps = {
  onOpen: () => {},
  onClose: () => {},
  onDeleteItem: () => {},
  basket: [],
};

export default React.memo(Controls);
