import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function ItemInfo(props) {
  const { description, /* madeIn */ /* category, */ edition, price, onAdd } =
    props;
  const cn = bem("Item-info");
  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn("description")}>{description}</div>
      <div className={cn("description")}>
        Страна производитель:<span className="bold">{/* madeIn */}</span>
      </div>
      <div className={cn("description")}>
        Категория:<span className="bold">{/* category */}</span>
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

export default memo(ItemInfo);
