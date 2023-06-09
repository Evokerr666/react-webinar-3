import {memo, useCallback, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import Spinner from "../../components/spinner";
import ArticleCommentsSignin from "../../components/article-comments-signin";
import commentsActions from '../../store-redux/comments/actions';
import Comment from "../../components/comment";
import { useParams } from "react-router-dom";
import CommentsList from "../../components/comments-list";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import shallowequal from "shallowequal";


function ArticleComments() {
  const params = useParams();
  const dispatch = useDispatch();
  useInit(() => {
    dispatch(commentsActions.getComments(params.id))
  }, [params.id]);
  const selectRedux = useSelectorRedux(state =>({
    comments: state.comments.comments,
    waiting: state.comments.waiting,
/*     newComment: state.comments.newComment, */
  }), shallowequal);
  
  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
    user: state.session.user.profile?.name
  }));
  console.log(select);
  
  console.log('Redux Select comments', selectRedux.comments);
  const callbacks = {
    postComment: useCallback((id, text, type) => dispatch(commentsActions.postComment(id, text, type)), []),
  }

  const comments = useMemo(() => treeToList(listToTree(selectRedux.comments), (item, level) => (
    {_id: item._id, level, text: item.text, author: item.author.profile.name, date: item.dateCreate}
  )), [selectRedux.comments])

  console.log('comments', comments);

  const {t} = useTranslate();

  const renders = {
    item: useCallback(comment => (
      <Comment
      comment={comment}
      user={select.user}
      postComment={callbacks.postComment}
      labelAnswer={t('comment.answer')}
      />
    ), [comments, t]),
  };

  return (
    <>
    {/* <ArticleCommentsSignin /> */}
    <Spinner active={select.waiting}>
      <CommentsList list={selectRedux.comments} renderItem={renders.item}/>
    </Spinner>
    </>
  );
} 

export default memo(ArticleComments);
