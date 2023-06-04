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

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  useInit(
    () => {
      const token = localStorage.getItem("userToken");
      if (!token && !select.user) {
        navigate("/login");
      }
    },
    [],
    true
  );

  const select = useSelector((state) => ({
    user: state.profile.data,
    waiting: state.profile.waiting,
  }));

  const callbacks = {
    // Выход
    signOut: useCallback(() => store.actions.profile.signOut(), [store]),
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthBar
        user={select.user}
        signOut={callbacks.signOut}
        profileLink={`/profile/${select.user?._id}`}
        loginLink={`/login`}
        t={t}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileCard user={select.user} t={t} />
    </PageLayout>
  );
}

export default memo(Profile);
