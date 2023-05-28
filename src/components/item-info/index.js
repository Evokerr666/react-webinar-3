import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import { TRANSLATE_LIST } from "../../store/language/translate-list";
import "./style.css";

function ItemInfo(props) {
  const { description, country, countryCode, category, edition, price, id, lang } = props;
  const cn = bem("Item-info");
  const callbacks = {
    onAdd: (e) => props.onAdd(id),
  };

  return (
    <div className={cn()}>
      <div className={cn("description")}>{description}</div>
      <div className={cn("description")}>
      {TRANSLATE_LIST?.[lang]?.country}:
        <span className="bold">
          {country}
          {` (${countryCode})`}
        </span>
      </div>
      <div className={cn("description")}>
      {TRANSLATE_LIST?.[lang]?.category}:<span className="bold">{category}</span>
      </div>
      <div className={cn("description")}>
      {TRANSLATE_LIST?.[lang]?.manufactured}:<span className="bold">{edition}</span>
      </div>
      <div className={cn("price")}>{TRANSLATE_LIST?.[lang]?.price}{`: ${numberFormat(price)} ₽`}</div>
      <button className={cn("button")} onClick={callbacks.onAdd}>
      {TRANSLATE_LIST?.[lang]?.add}
      </button>
    </div>
  );
}

ItemInfo.propTypes = {
  country: PropTypes.string,
  countryCode: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  category: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.string,
};

ItemInfo.defaultProps = {
  onAdd: () => {},
};

export default memo(ItemInfo);
