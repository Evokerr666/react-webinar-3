// Начальное состояние
const initialState = {
  comments: [],
  waiting: false, // признак ожидания загрузки
  newComment: {},
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/get-start":
      return { ...state, comments: [], waiting: true};

    case "comments/get-success":
      return { ...state, comments: action.payload.comments, waiting: false};

    case "comments/get-error":
      return { ...state, comments: [], waiting: false};
    
    /* case "comments/post-start":
      return { ...state, waiting: true};

    case "comments/post-success":
      return { ...state, newComment: action.payload.data, waiting: false};

    case "comments/post-error":
      return { ...state, waiting: false}; */

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
