import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function ItemInfo(props) {
  const { description, madeIn, category, edition, price, id } = props;
  const cn = bem("Item-info");
  const callbacks = {
    onAdd: (e) => props.onAdd(id),
  };

  return (
    <div className={cn()}>
      <div className={cn("description")}>{description}</div>
      <div className={cn("description")}>
        Страна производитель:
        <span className="bold">
          {madeIn?.title}
          {` (${madeIn?.code})`}
        </span>
      </div>
      <div className={cn("description")}>
        Категория:<span className="bold">{category}</span>
      </div>
      <div className={cn("description")}>
        Год выпуска:<span className="bold">{edition}</span>
      </div>
      <div className={cn("price")}>{`Цена: ${numberFormat(price)} ₽`}</div>
      <button className={cn("button")} onClick={callbacks.onAdd}>
        Добавить
      </button>
    </div>
  );
}

ItemInfo.propTypes = {
  madeIn: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }).isRequired,
  description: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  category: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  amount: PropTypes.number,
};

ItemInfo.defaultProps = {
  onAdd: () => {},
};

export default memo(ItemInfo);
