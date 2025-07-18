import React, { useEffect } from 'react'
import myImage from '../assets/HeroSectionImage.png';
import { MoveRight } from 'lucide-react';
import Card from '../componente/Card';
import FeatureSection from '../componente/FeatureSection';
import { Link } from 'react-router-dom';
import useProductStore from '../store/productStore';
const products3 = [
  {
    "title": "Western Doodles Casual Shirt",
    "description": "100% cotton slim-fit shirt featuring a modern doodle print—lightweight and breathable for all-day comfort.",
    "price": 499,
    "gender": "Men",
    "category": "Shirt",
    "sizes": {
      "S": 7,
      "M": 8,
      "L": 10,
      "XL": 11
    },
    "images": [
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/western-doodles-men-shirt-mydesignation-988716.jpg?v=1744923892&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/western-doodles-men-shirt-mydesignation-847079.jpg?v=1744923893&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/western-doodles-men-shirt-mydesignation-536747.jpg?v=1744923893&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/western-doodles-men-shirt-mydesignation-765547.jpg?v=1744923893&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/western-doodles-men-shirt-mydesignation-267844.jpg?v=1744923893&width=750"
      }
    ]
  },
  {
    "title": "Wolf Printed Shirt",
    "description": "Statement men's overcoat with a bold wolf illustration—ideal for layering over smart-casual outfits.",
    "price": 1899,
    "gender": "Men",
    "category": "Shirt",
    "sizes": {
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0
    },
    "images": [
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/wolf-men-shirt-mydesignation-7655183.jpg?v=1752736267&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/wolf-men-shirt-mydesignation-1402969.jpg?v=1752736266&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/wolf-men-shirt-mydesignation-3719986.jpg?v=1752736266&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/wolf-men-shirt-mydesignation-7655183.jpg?v=1752736267&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/wolf-men-shirt-mydesignation-9389237.jpg?v=1752736267&width=750"
      }
    ]
  },
  {
    "title": "Gramophone Floral Print T-shirt",
    "description": "Women’s relaxed-fit tee with a vintage gramophone floral print—soft, breezy, and stylish for summer days.",
    "price": 1399,
    "gender": "Women",
    "category": "T-shirt",
    "sizes": {
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0
    },
    "images": [
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/gramophone-men-shirt-mydesignation-4965993.jpg?v=1752736266&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/gramophone-men-shirt-mydesignation-4965993.jpg?v=1752736266&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/gramophone-men-shirt-mydesignation-7943757.jpg?v=1752736267&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/gramophone-men-shirt-mydesignation-8127440.jpg?v=1752736267&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/gramophone-men-shirt-mydesignation-2853337.jpg?v=1752736267&width=750"
      }
    ]
  },
  {
    "title": "Sands of Time Oversized Tee",
    "description": "Women’s oversized tee with abstract print—soft fabric and relaxed fit for maximum comfort.",
    "price": 2999,
    "gender": "Man",
    "category": "Shirt",
    "sizes": {
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0
    },
    "images": [
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/sands-of-time-men-oversized-t-shirt-mydesignation-4043775.jpg?v=1751311058&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/sands-of-time-men-oversized-t-shirt-mydesignation-9261765.jpg?v=1751311058&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/sands-of-time-men-oversized-t-shirt-mydesignation-9261765.jpg?v=1751311058&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/sands-of-time-men-oversized-t-shirt-mydesignation-4835100.jpg?v=1751311060&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/sands-of-time-men-oversized-t-shirt-mydesignation-4043775.jpg?v=1751311058&width=750"
      }
    ]
  },
  {
    "title": "Final Lap",
    "description": "Unisex black hoodie with front pocket and soft fleece lining—designed for comfort and style.",
    "price": 999,
    "gender": "Unisex",
    "category": "Hoodie",
    "sizes": {
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0
    },
    "images": [
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/final-lap-men-shirt-mydesignation-1070316.png?v=1751311059&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/final-lap-men-shirt-mydesignation-8937984.png?v=1751311060&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/final-lap-men-shirt-mydesignation-9167980.png?v=1751311061&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/final-lap-men-shirt-mydesignation-8937984.png?v=1751311060&width=750"
      },
      {
        "url": "https://www.mydesignation.com/cdn/shop/files/final-lap-men-shirt-mydesignation-1070316.png?v=1751311059&width=750"
      }
    ]
  }
]

function Home() {
  const {fetchProducts,products,isLoading} = useProductStore();
  useEffect(()=>{
    fetchProducts();
  },[])
  if(isLoading)return <h1>Loaing....</h1>
  return (
    <div className="min-h-screen px-6 md:px-12 bg-white">
      <div className='flex items-center justify-center'>
        <div className="max-w-7xl w-full flex  flex-col-reverse sm:flex-row items-center justify-between gap-x-10 gap-y-3">
          {/* Left Content */}
          <div className="max-w-xl sm:mt-19 lg:mt-14">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold  text-gray-900 mb-4">
              Customized <br />
              <span className="text-gray-500 ">Printed Tees</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg mb-6">
              We offer personalized printed t-shirts. Choose your style, add your design, and wear your creativity.
            </p>
            <button
              class="relative cursor-pointer py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out  hover:scale-105 hover:text-white  active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-black before:to-black before:transition-all flex justify-center items-center gap-x-3 before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
            >
              Explore More <MoveRight />
            </button>
          </div>
          {/* Right Image */}
          <div className="w-full  flex justify-center mt-24 lg:mt-40">
            <img
              src={myImage}
              alt="Boy in customized tee"
              className="w-full max-w-[1000px] h-auto object-cover "
            />
          </div>
        </div>
      </div>
      {/* // Lattest Collection  */}
      <section className='my-14 md:px-10 lg:px-20'>
        <div className=''>
          <h1 className='text-4xl font-bold text-gray-700 px-2 text-center'><span className='text-gray-500'>Lattest</span> Collection </h1>
          <p className='text-lg font-semibold text-gray-400 px-2 text-center mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla veniam iure unde vitae,  </p>
        </div>
        <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-8 gap-x-3 gap-y-2 lg:gap-x-4  lg:gap-y-5'>
          {
            products.map((item) => <Link to={`product/${item._id}`}><Card product={item} /></Link>)
          }
        </section>
      </section>
      {/* // Best Sailer */}
      <section className='my-14 px-20'>
        <div className='py-4'>
          <h1 className='text-4xl font-bold text-gray-700 px-2 text-center '><span className='text-gray-500'>Best</span> Seller </h1>
          <p className='text-lg font-semibold text-gray-400 px-2 text-center mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla veniam iure unde vitae,  </p>
        </div>
        <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-8 gap-x-3 gap-y-2 lg:gap-x-4  lg:gap-y-5'>
          {
            products.map((item) => <Card product={item} />)
          }
        </section>
      </section>
      {/* Feature Section */}
      <section>
        <FeatureSection />
      </section>
    </div>
  )
}

export default Home