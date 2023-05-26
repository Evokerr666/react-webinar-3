import { memo, useCallback, useEffect } from "react";
import ItemInfo from "../../components/item-info";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import { useParams } from "react-router-dom";

function ItemPage() {
  const store = useStore();
  const params = useParams();
  useEffect(() => {
    callbacks.onLoadArticle(params.id)
  }, [])
  const select = useSelector((state) => ({
    description: state.catalog.currentArticle.description,
    madeIn: state.catalog.currentArticle.madeIn,
    category: state.catalog.currentArticle.category,
    edition: state.catalog.currentArticle.edition,
    price: state.catalog.currentArticle.price,
    amount: state.basket.amount,
    sum: state.basket.sum,
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
    onLoadArticle: useCallback(
      async (id) => await store.actions.catalog.loadById(id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <PageLayout>
      <Head title="Название товара" />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        onClose={callbacks.closeModal}
        amount={select.amount}
        sum={select.sum}
      />
      <ItemInfo
        description={select.description}
        madeIn={select.madeIn}
        category={select.category}
        edition={select.edition}
        price={select.price}
        onAdd={callbacks.addToBasket}
      />
    </PageLayout>
  );
}

export default memo(ItemPage);
