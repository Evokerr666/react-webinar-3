import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      current: 0,
      currentArticle: {},
    }
  }

  async load(id) {
    const currentPage = id || 1 
    const response = await fetch(`/api/v1/articles?limit=10&skip=${currentPage*10-10}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items,
       count: json.result.count,
       current: currentPage,
    }, 'Загружены товары из АПИ');
  }

  async loadById(id) {
    const response = await fetch(`/api/v1/articles/${id}`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       currentArticle: json.result
    }, 'Загружено описание товара из API');
  }
}

export default Catalog;
