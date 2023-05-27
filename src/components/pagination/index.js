import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { usePagination, DOTS } from "../../store/use-pagination";
import "./style.css";

const Pagination = (props) => {
  const cn = bem('Pagination');
  const { onLoad, siblingCount, totalCount, currentPage } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  return (
    <div className={cn()}>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <div className={cn("item-dots")}>{DOTS}</div>;
        }
        return (
          <div
            className={cn(`item ${
              currentPage == pageNumber ? "active" : ""
            }`)}
            selected={pageNumber === currentPage}
            onClick={() => onLoad(pageNumber)}
          >
            {pageNumber}
          </div>
        );
      })}
    </div>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  siblingCount: PropTypes.number,
  onLoad: PropTypes.func,
};

Pagination.defaultProps = {
  siblingCount: 1,
  onLoad: () => {},
};

export default Pagination;
