import Main from "./main";
import Basket from "./basket";
import ItemPage from "./item-page";
import useSelector from "../store/use-selector";
import { Routes, Route } from "react-router-dom";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" >
          <Route index element={<Main />} />
          <Route path={`item-page/:id`} element={<ItemPage />} />
        </Route>
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
