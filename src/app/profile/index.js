import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import AuthBar from "../../components/auth-bar";
import ProfileCard from "../../components/profile-card";
import Spinner from "../../components/spinner";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  useInit(
      () => {
      store.actions.auth.getUserById();
      const token = localStorage.getItem("userToken");
      if (!token && !select.user) {
        navigate("/login");
      }
    },
    [],
    true
  );

  const select = useSelector((state) => ({
    user: state.auth.data,
    waiting: state.auth.waiting,
  }));

  const callbacks = {
    // Выход
    signOut: useCallback(() => store.actions.auth.signOut(), [store]),
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthBar
        user={select.user}
        signOut={callbacks.signOut}
        profileLink={`/profile`}
        loginLink={`/login`}
        t={t}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
