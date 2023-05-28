import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import { Link } from "react-router-dom";
import { TRANSLATE_LIST } from "../../store/language/translate-list";
import "./style.css";

function BasketTool({ sum, amount, onOpen, lang }) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <Link to="/" className={cn("home")}>
      {TRANSLATE_LIST?.[lang]?.home}
      </Link>
      <span className={cn("label")}>{TRANSLATE_LIST?.[lang]?.inBasket}</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(amount, {
              one: TRANSLATE_LIST?.[lang]?.oneProduct,
              few: TRANSLATE_LIST?.[lang]?.fewProduct,
              many: TRANSLATE_LIST?.[lang]?.manyProduct,
            })} / ${numberFormat(sum)} ₽`
          : TRANSLATE_LIST?.[lang]?.emptyBasket}
      </span>
      <button onClick={onOpen}>{TRANSLATE_LIST?.[lang]?.goTo}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  onLoad: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
