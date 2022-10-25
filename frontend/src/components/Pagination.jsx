import React from "react";

function Pagination({ productsPerPage, totalProducts, paginate, currentPage }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination pagination-lg">
        {pageNumber.map((page) => (
          <li className="page-item" key={page}>
            <button
              onClick={() => paginate(page)}
              type="button"
              className={
                currentPage === page ? "page-link active" : "page-link"
              }
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
