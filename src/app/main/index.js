import { React, memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import { useParams } from "react-router-dom";
import { TRANSLATE_LIST } from "../../store/language/translate-list";

function Main() {
  const store = useStore();
  const params = useParams();
  useEffect(() => {
    store.actions.catalog.load();
  }, []);
  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    current: state.catalog.current,
    lang: state.language.language,
  }));
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    onLoad: useCallback(
      async (id) => await store.actions.catalog.load(id),
      [store]
    ),
    onLangChange: useCallback(
      (event) => store.actions.language.onLangChange(event.target.value),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item item={item} onAdd={callbacks.addToBasket} lang={select.lang} />
        );
      },
      [callbacks.addToBasket, select.lang]
    ),
  };

  return (
    <PageLayout>
      <Head title={TRANSLATE_LIST?.[select.lang]?.shop} lang={select.lang} onLangChange={callbacks.onLangChange}/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        lang={select.lang}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={select.current}
        totalCount={select.count}
        onLoad={callbacks.onLoad}
      />
    </PageLayout>
  );
}

export default memo(Main);
