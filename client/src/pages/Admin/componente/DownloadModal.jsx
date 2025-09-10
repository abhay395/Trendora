import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'
const DownloadModal = ({ setisOpen, isOpen, downloadHandler }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState({});
    const closeModel = () => {
        setisOpen(false)
        setStartDate('')
        setEndDate('')
        setError({})
    }
    const formHandler = async (e) => {
        e.preventDefault();
        let newError = {};

        if (!startDate) {
            newError.startDate = "Start Date is required";
        }
        if (!endDate) {
            newError.endDate = "End Date is required";
        }

        if (startDate && endDate) {
            if (new Date(startDate).getTime() >= new Date(endDate).getTime()) {
                newError.message = "Start Date must be earlier than End Date";
            }
        }

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }

        setError({});
        await downloadHandler({ startDate, endDate });
    };

    return (
        <div>
            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: -50 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="bg-white p-6 rounded-2xl shadow-xl w-[400px] download-container">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                                Select Date Range
                            </h2>

                            <form className="flex flex-col gap-4" onSubmit={formHandler}>
                                <div className="grid grid-cols-2 gap-5">
                                    {/* Start Date */}
                                    <div className="flex flex-col">
                                        <label htmlFor="startDate" className="text-sm font-medium mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            className={`px-3 py-2 border rounded-lg text-sm outline-none ${error.startDate ? "border-red-500" : "border-gray-300"
                                                }`}
                                            value={startDate}
                                            onChange={(e) => {
                                                setStartDate(e.target.value);
                                                setError({});
                                            }}
                                        />
                                        {error.startDate && (
                                            <p className="text-red-500 text-xs mt-1">{error.startDate}</p>
                                        )}
                                    </div>

                                    {/* End Date */}
                                    <div className="flex flex-col">
                                        <label htmlFor="endDate" className="text-sm font-medium mb-1">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            className={`px-3 py-2 border rounded-lg text-sm outline-none ${error.endDate ? "border-red-500" : "border-gray-300"
                                                }`}
                                            value={endDate}
                                            onChange={(e) => {
                                                setEndDate(e.target.value);
                                                setError({});
                                            }}
                                        />
                                        {error.endDate && (
                                            <p className="text-red-500 text-xs mt-1">{error.endDate}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Global error */}
                                {error.message && (
                                    <p className="text-red-500 text-sm">{error.message}</p>
                                )}

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    disabled={!!error.startDate || !!error.endDate || !!error.message}
                                >
                                    Download CSV
                                </button>
                            </form>

                            {/* Close */}
                            <button
                                onClick={closeModel}
                                className="mt-2 w-full px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default DownloadModal;
