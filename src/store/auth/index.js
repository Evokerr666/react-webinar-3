import StoreModule from "../module";

/**
 * Информация о пользователе
 */
class AuthState extends StoreModule {
  initState() {
    return {
      data: null,
      waiting: false, // признак ожидания загрузки
      errors: [],
    };
  }

  async signIn(authInfo, callbackBySuccess) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const data = {
        login: authInfo.login,
        password: authInfo.password,
      };
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (!response.ok) {
        // Поймали ошибку
        throw json.error.data.issues;
      } else {
        // Получили токен
        localStorage.setItem("userToken", json.result.token);
        callbackBySuccess();
        this.setState(
          {
            data: json.result.user,
            waiting: false,
          },
          "Загружен профиль из АПИ"
        );
      }
    } catch (e) {
      this.setState({
        data: null,
        waiting: false,
        errors: e,
      });
    }
  }

  //Выход пользователя по токену
  async signOut() {
    const token = localStorage.getItem("userToken");
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      await fetch(`/api/v1/users/sign`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      localStorage.removeItem("userToken");
      this.setState({
        ...this.getState(),
        data: null,
      });
    } catch (error) {
    } finally {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }

  //Получение пользователя по токену
  async getUserById() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch("/api/v1/users/self", {
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        throw json.error.data.issues;
      } else {
        const token = localStorage.getItem("userToken");
        if (!token) {
          localStorage.setItem("userToken", json.result.token);
        }
        this.setState(
          {
            data: json.result,
            waiting: false,
          },
          "Загружен профиль по токену из АПИ"
        );
      }
    } catch (e) {
      this.setState({
        data: null,
        waiting: false,
      });
    }
  
}

//Сброс ошибки
 resetError() {
  if (this.getState().errors) {
    this.setState({
      ...this.getState(),
      errors: [],
    });
  }
}

}

export default AuthState;
