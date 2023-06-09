export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  getComments: (id) => {
    return async (dispatch, getState, services) => {
      
      dispatch({ type: "comments/get-start" });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`,
        });console.log('ACTION');
        dispatch({
          type: "comments/get-success",
          payload: { comments: res.data.result.items },
        });
      } catch (e) {
        //Ошибка загрузки
        console.log('Ошибка', e);
        dispatch({ type: "comments/get-error" });
      }
    };
  },

  /* postComment: (id, text, type) => {
    return async (dispatch, getState, services) => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          dispatch({ type: "comments/post-start" });

          const res = await services.api.request({
            url: '/api/v1/comments/',
            method: 'POST',
            body: JSON.stringify({
              'text': text,
              'parent': {
                '_id': id,
                '_type': type
              }
            })
          });
          dispatch({
            type: "comments/load-success",
            payload: { data: res.data.result },
          });
        } catch (e) {
          //Ошибка загрузки
          dispatch({ type: "comments/post-error" });
        }
      }
    };
  }, */
};
