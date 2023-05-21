import React, {useCallback} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Footer from './components/footer';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const modalActive = store.getState().modalActive;
  const totalPrice = store.getState().totalPrice;
  const basket = store.getState().basket;
  const callbacks = {
    onDeleteItem: useCallback(
      (code, price, count) => {
        store.deleteItem(code, price, count);
      },
      [store]
    ),
    onOpenModal: useCallback(() => {
      store.openModal();
    }, [store]),
    onCloseModal: useCallback(() => {
      store.closeModal();
    }, [store]),
    onAddItem: useCallback(
      (item) => {
        store.addItem(item);
      },
      [store]
    ),
  };
  return (
    <PageLayout>
      <Head title="Магазин" className={"Head"} />
      <Controls
        onOpen={callbacks.onOpenModal}
        basketCount={basket?.length}
        totalPrice={totalPrice}
      />
      <Modal onClose={callbacks.onCloseModal} active={modalActive}>
        <Head
          title={"Корзина"}
          actions={[
            { title: "Закрыть", id: "close", action: callbacks.onCloseModal },
          ]}
          className={"Head-modal"}
        />
        <List list={basket} onDeleteItem={callbacks.onDeleteItem} />
        <Footer totalPrice={totalPrice} />
      </Modal>
      <List list={list} onAddItem={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;
