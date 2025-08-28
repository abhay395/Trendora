import React from 'react'

function PaymentSection({ paymentMode, setPaymentMode }) {
    return (
        <div className='w-full'>
            <div className='mb-4  text-left w-full'>
                <span className='font-semibold text-lg text-gray-900'>Select A Payment option</span>
            </div>
            <div className="flex flex-col w-full items-center justify-center space-y-4 ">
                <div className='w-full space-y-2 py-3 flex  flex-col border rounded-xl border-gray-200 px-5'>
                    <div className='flex items-center space-x-3'>
                        <input type="radio" name='payment' value='cash' onChange={e => setPaymentMode('cash')} className='w-5 h-5  accent-black' id='1'
                            checked={paymentMode == 'cash'}
                        />
                        <label htmlFor='1' className='space-y-2'>
                            <p className='font-semibold text-[1.02rem] text-gray-800'>Cash On devlivery</p>
                        </label>
                    </div>

                </div>
                <div className='w-full space-y-2  pt-4 flex  flex-col border rounded-xl border-gray-200 px-5'>
                    <div className='flex items-center space-x-3'>
                        <input type="radio" name='payment'
                            checked={paymentMode == 'debit'}
                            value='debit' onChange={e => setPaymentMode('debit')} className='w-5 h-5  accent-black' id='2' />
                        <label htmlFor='2' className='space-y-2'>
                            <p className='font-semibold text-[1.02rem] text-gray-800'>Debit/Card</p>
                        </label>
                    </div>
                    {/* <div> */}
                    <form className=" bg-white px-10 py-6 space-y-6">
                        {/* Name */}
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Lydia George"
                                className="w-full border outline-none border-gray-300 px-4 py-2 rounded-lg"
                            />
                        </div>

                        {/* Card Number */}
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">Card Number *</label>
                            <input
                                type="text"
                                id="cardNumber"
                                placeholder="2432 1234 3212 5321"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-none"
                            />
                        </div>

                        {/* Expiry + CVV */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="expiry" className="text-sm font-medium text-gray-700">Expiry Date *</label>
                                <input
                                    type="month"
                                    id="expiry"
                                    className="w-full border outline-none border-gray-300 px-4 py-2 rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="cvv" className="text-sm font-medium text-gray-700">CVV *</label>
                                <input
                                    type="password"
                                    id="cvv"
                                    placeholder="***"
                                    maxLength={3}
                                    className="w-full border outline-none border-gray-300 px-4 py-2 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Save Card */}
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="saveCard" className="w-4 h-4 accent-black" />
                            <label htmlFor="saveCard" className="text-sm text-gray-700">Save this card for later use</label>
                        </div>
                    </form>

                    {/* </div> */}
                </div>
                {/* <div className='border-b w-full border-gray-300 my-4'></div> */}
            </div>
        </div>
    )
}

export default PaymentSection