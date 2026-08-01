import React, { useState } from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center space-x-2 mt-4">
            <button
                disabled={currentPage === 1}
                onClick={() => handleClick(currentPage - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => handleClick(page)}
                    className={`px-3 py-1 border rounded ${page === currentPage ? "bg-gray-800 text-white" : ""
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => handleClick(currentPage + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
