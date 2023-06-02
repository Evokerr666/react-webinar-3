import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Auth from '../../components/auth';
import AuthBar from '../../components/auth-bar';
import useSelector from '../../hooks/use-selector';

function Login() {
  const store = useStore();
  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const select = useSelector(state => ({
    errors: state.profile.errors,
    user: state.profile.data,
  }));

  const callbacks = {
    // Выход
    signOut: useCallback(() => store.actions.profile.signOut(), [store]),
    // Авторизация
    signIn: useCallback((authInfo, callbackBySuccess) => store.actions.profile.signIn(authInfo, callbackBySuccess), [store]),
  }

  // Функция для локализации текстов
  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthBar user={select.user} signOut={callbacks.signOut} profileLink={`/profile`} loginLink={`/login`} t={t}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
        <Auth onLogIn={callbacks.signIn} t={t} errors={select.errors}/>
    </PageLayout>
  );
}

export default memo(Login);
