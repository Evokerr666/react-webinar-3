import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function CommentsList({list, renderItem}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item._id} className='List-comment'>
          {renderItem(item)}
        </div>
      )}
    </div>
  )
}

/* CommentsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
};

CommentsList.defaultProps = {
  renderItem: (item) => {},
} */

export default memo(CommentsList);
