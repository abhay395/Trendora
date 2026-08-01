function PriceDetaile({ selectedProduct, discount,buttonHandler }) {
    let totalPrice = selectedProduct.reduce((sum, item) => sum + item.totalPrice, 0)
    return (
        (<div className='space-y-4 mt-4' >
            <h3 className="font-semibold text-gray-700 text-[1.2rem]">Price Details</h3>
            <div className="bg-[#f5f2fe] p-4 rounded-xl ">
                <div className="text-sm space-y-4 text-gray-500">
                    <div className="flex justify-between text-[1rem] font-semibold text-gray-700">
                        <span>{selectedProduct.length} item</span>
                        {/* <span>${selectedItemId[0]?.price?.toFixed(2)}</span> */}
                    </div>
                    <div className='space-y-3 font-medium'>
                        {selectedProduct.map((item) => (<div className="flex justify-between" key={item._id}>
                            <span>{item.quantity} X {item.productId.title} </span>
                            <span>${item?.totalPrice?.toFixed(2)}</span>
                        </div>))}
                        <div className="flex justify-between">
                            <span>Coupon discount</span>
                            <span className="text-green-600">-₹{discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery Charges</span>
                            <span className="text-gray-700">Free Delivery</span>
                        </div>
                        {/* <hr className="my-4" /> */}
                        <div className='border border-gray-300 my-5'></div>
                        <div className="flex justify-between text-[1rem] text-gray-700 font-semibold">
                            <span>Total Amount</span>
                            <span>₹{(totalPrice).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={buttonHandler} className="w-full bg-black text-white py-3 rounded-xl font-semibold cursor-pointer">
                Place order →
            </button>
        </div>)

    )
}

export default PriceDetaile