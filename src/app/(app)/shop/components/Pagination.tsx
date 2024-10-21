'use client'

import { useState } from 'react'

interface PaginationProps {}

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  return (
    <div>
      <button
        onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}
