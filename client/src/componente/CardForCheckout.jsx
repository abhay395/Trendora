
function CardForCheckout({ item, index, length }) {
    return (
        <div className='w-full' key={index}>
            <div className="flex items-start py-4 pl-4  gap-4 w-full relative ">
                <div className='h-28 w-[15rem]  rounded-lg overflow-hidden'>
                    <img src={item.productId.images[0].url} alt={item.productId.title} className="object-cover object-top h-full w-full " />
                </div>
                <div className='h-full space-y-2 relative min-h-30  w-full '>
                    <h4 className="font-bold text-[0.94rem] text-gray-800">{item.productId.title}</h4>
                    <p className="text-sm font-medium text-gray-500 flex items-center space-x-1">
                        <span>Estimated delivery by <span className='text-gray-700 text-sm font-bold'>14 July 2025</span></span></p>
                    <div className='flex items-center justify-between left-0 absolute bottom-2 right-4'>
                        <p className="font-bold text-gray-800"><span className='text-gray-400 text-xl mr-1'>₹</span>{[...item.productId.sizes].find((size) => size.size == item.size).price.toFixed(2)}</p>
                        <div className='flex items-center space-x-4 pr-7'>
                            <span className='font-semibold text-gray-700'>QTY :</span>
                            {/* <div className="flex items-center gap-2 "> */}
                            <span className='text-gray-600 font-bold'>{item.quantity}</span>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {
                index < length - 1 ? <div className='border-b border-gray-300 mx-5'></div> : null
            }
        </div>
    )
}

export default CardForCheckout