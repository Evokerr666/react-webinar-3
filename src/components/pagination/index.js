import React from "react";
import { usePagination, DOTS } from "../../store/use-pagination";
import "./style.css";

const Pagination = (props) => {
  const { onLoad, siblingCount = 1, totalCount, currentPage } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  return (
    <div className="pagination-container">
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <div className="pagination-item-dots">{DOTS}</div>;
        }
        return (
          <div
            className={`pagination-item ${
              currentPage == pageNumber ? "active" : ""
            }`}
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

export default Pagination;
