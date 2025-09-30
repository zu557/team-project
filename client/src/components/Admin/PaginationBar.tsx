import React, { FC } from 'react';

/**
 * Props for the PaginationBar component.
 * It is designed to work with local state changes via the onChange callback.
 */
interface PaginationProps {
  currentPage: number;
  totalPage: number;
  // Callback function to handle page change in the parent component
  onChange: (page: number) => void;
}

const PaginationBar: FC<PaginationProps> = ({
  currentPage = 1,
  totalPage = 1,
  onChange,
}) => {
  const current = Math.max(1, currentPage);
  const total = Math.max(1, totalPage);

  // If there's only one page, hide the pagination bar entirely
  if (total <= 1) {
    return null;
  }

  // Helper to determine which page numbers to display, including ellipses
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxPagesToShow = 7;
    
    // Always show first page
    if (total > 0) pages.push(1);

    let start = 2;
    let end = total - 1;

    if (total > maxPagesToShow) {
        // Determine the range of pages around the current page
        start = Math.max(2, current - 2);
        end = Math.min(total - 1, current + 2);
    }
    
    // Add first ellipsis if needed
    if (start > 2) {
      pages.push('ellipsis');
    }

    // Add main page range
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add second ellipsis if needed
    if (end < total - 1) {
      pages.push('ellipsis');
    }

    // Always show last page if it's not the first page
    if (total > 1 && pages[pages.length - 1] !== total) {
        pages.push(total);
    }
    
    // Filter duplicates (which can happen with tiny total page counts)
    return pages.filter((value, index, self) => 
        self.indexOf(value) === index
    );
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 mt-12 text-sm">
      {/* Previous Button */}
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className={`px-3 py-1.5 rounded-lg border transition-colors duration-200 ${
          current === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-indigo-50 hover:border-indigo-500'
        }`}
      >
        Previous
      </button>

      {/* Page Numbers and Ellipses */}
      {pageNumbers.map((p, index) => {
        if (p === 'ellipsis') {
          return (
            <span key={`ell-${index}`} className="px-3 py-1.5 text-gray-500">
              ...
            </span>
          );
        }

        const page = p as number;
        const isActive = page === current;

        return (
          <button
            key={page}
            onClick={() => onChange(page)}
            disabled={isActive}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all duration-200 ${
              isActive
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className={`px-3 py-1.5 rounded-lg border transition-colors duration-200 ${
          current === total
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-indigo-50 hover:border-indigo-500'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationBar;
