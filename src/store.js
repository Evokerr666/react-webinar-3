import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem(item) {
    if (!this.state.basket?.length) {
      this.setState({
        ...this.state,
        basket: [{ ...item, count: 1 }],
      });
    } else {
      const basket = [...this.state.basket];
      const index = basket.findIndex((el) => el.code == item.code);
      if (index + 1) {
        basket[index] = { ...basket[index], count: basket[index].count + 1 };
      } else {
        basket.push({ ...item, count: 1 });
      }

      this.setState({
        ...this.state,
        basket: basket,
      });
    }
  }
  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      basket: this.state.basket.filter((item) => item.code !== code),
    });
  }

  openModal() {
    this.setState({
      ...this.state,
      modalActive: true,
    });
  }

  closeModal() {
    this.setState({
      ...this.state,
      modalActive: false,
    });
  }
}

export default Store;
