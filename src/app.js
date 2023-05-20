import React, {useCallback} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const modalActive = store.getState().modalActive;
  const basket = store.getState().basket;
  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onOpenModal: useCallback(() => {
      store.openModal();
    }, [store, modalActive]),

    onCloseModal: useCallback(() => {
      store.closeModal();
    }, [store, modalActive]),

    onAddItem: useCallback(
      (item) => {
        store.addItem(item);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title='Магазин' className={'Head'} />
      <Controls
        onOpen={callbacks.onOpenModal}
        onClose={callbacks.onCloseModal}
        active={modalActive}
        basket={basket}
        onDeleteItem={callbacks.onDeleteItem}
      />
      <List list={list} onAddItem={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;
