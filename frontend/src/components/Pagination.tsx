import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="pagination-block">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Précédent</button>
      )}
      <span>
        Page {currentPage} - {totalPages}
      </span>
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Suivant</button>
      )}
    </div>
  );
};

export default Pagination;