import { memo, useCallback, useEffect } from "react";
import ItemInfo from "../../components/item-info";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import { useParams } from "react-router-dom";
import { TRANSLATE_LIST } from "../../store/language/translate-list";

function ItemPage() {
  const store = useStore();
  const params = useParams();
  useEffect(() => {
    callbacks.onLoadArticle(params.id)
  }, [params.id])
  const select = useSelector((state) => ({
    description: state.catalog.currentArticle.description,
    country: state.catalog.currentArticle.madeIn?.title,
    countryCode: state.catalog.currentArticle.madeIn?.code,
    category: state.catalog.currentArticle.category?.title,
    edition: state.catalog.currentArticle.edition,
    price: state.catalog.currentArticle.price,
    amount: state.basket.amount,
    sum: state.basket.sum,
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
    // Загрузка информации о товаре
    onLoadArticle: useCallback(
      async (id) => await store.actions.catalog.loadById(id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    onLangChange: useCallback(
      () => store.actions.language.onLangChange(event.target.value),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title={TRANSLATE_LIST?.[select.lang]?.productName} lang={select.lang} onLangChange={callbacks.onLangChange}/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        onClose={callbacks.closeModal}
        amount={select.amount}
        sum={select.sum}
        lang={select.lang}
      />
      <ItemInfo
        id={params.id}
        description={select.description}
        country={select.country}
        countryCode={select.countryCode}
        category={select.category}
        edition={select.edition}
        price={select.price}
        onAdd={callbacks.addToBasket}
        lang={select.lang}
      />
    </PageLayout>
  );
}

export default memo(ItemPage);
