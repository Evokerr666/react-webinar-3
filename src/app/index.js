import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useInit from "../hooks/use-init";
import useStore from "src/hooks/use-store";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  const select = useSelector(state => ({
    user: state.auth.data,
    waiting: state.auth.waiting,
  }))

  const store = useStore();
  useInit(() => {
    store.actions.auth.getUserById();
  }, [], true)
  
  return (
    <>
      <Routes>
        <Route
          path={"/"}
          element={<Main />}
        />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={select.user ? <Navigate to="/profile"/> : <Login />}/>
        <Route path={"/profile"} element={!select.user ? <Navigate to="/login"/> : <Profile />}/>
      </Routes>
          {select ? <></>:null}
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
