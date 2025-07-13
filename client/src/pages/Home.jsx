import React from 'react'
import myImage from '../assets/HeroSectionImage.png';
import { MoveRight } from 'lucide-react';
import Card from '../componente/Card';
import FeatureSection from '../componente/FeatureSection';
const products1 = [
  {
    id: 1,
    title: "Classic White T-Shirt",
    description: "100% cotton, slim fit, breathable and lightweight.",
    price: 499,
    originalPrice: 799,
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/t/v/c/xl-kcsh-fo-1647-wh-fubar-original-imah4zensmpmzgbn.jpeg?q=70&crop=false",
    category: "Men"
  },
  {
    id: 2,
    title: "Men’s Denim Jacket",
    description: "Stylish blue denim jacket for casual wear.",
    price: 1899,
    originalPrice: 2499,
    image: "https://campussutra.com/cdn/shop/files/JKDENIMP02_M_PLN_NBU_1_80a9e6ee-5622-456b-82f5-a2fb3e18f9f8.jpg?v=1728974706&width=800",
    category: "Men"
  },
  {
    id: 3,
    title: "Floral Summer Dress",
    description: "Light and breezy dress perfect for summer outings.",
    price: 1399,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80",
    category: "Women"
  },
  {
    id: 4,
    title: "Women’s Beige Coat",
    description: "Elegant coat with a warm inner lining for winter.",
    price: 2999,
    originalPrice: 3799,
    image: "https://m.media-amazon.com/images/I/61OWk8KmCWL._SY879_.jpg",
    category: "Women"
  },
  {
    id: 5,
    title: "Black Hoodie",
    description: "Unisex black hoodie with front pocket and soft fleece inside.",
    price: 999,
    originalPrice: 1499,
    image: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/N77892s.jpg?im=Resize,width=640",
    category: "Unisex"
  },
  {
    id: 1,
    title: "Classic White T-Shirt",
    description: "100% cotton, slim fit, breathable and lightweight.",
    price: 499,
    originalPrice: 799,
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/t/v/c/xl-kcsh-fo-1647-wh-fubar-original-imah4zensmpmzgbn.jpeg?q=70&crop=false",
    category: "Men"
  },
  {
    id: 2,
    title: "Men’s Denim Jacket",
    description: "Stylish blue denim jacket for casual wear.",
    price: 1899,
    originalPrice: 2499,
    image: "https://campussutra.com/cdn/shop/files/JKDENIMP02_M_PLN_NBU_1_80a9e6ee-5622-456b-82f5-a2fb3e18f9f8.jpg?v=1728974706&width=800",
    category: "Men"
  },
  {
    id: 3,
    title: "Floral Summer Dress",
    description: "Light and breezy dress perfect for summer outings.",
    price: 1399,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80",
    category: "Women"
  },
  {
    id: 4,
    title: "Women’s Beige Coat",
    description: "Elegant coat with a warm inner lining for winter.",
    price: 2999,
    originalPrice: 3799,
    image: "https://m.media-amazon.com/images/I/61OWk8KmCWL._SY879_.jpg",
    category: "Women"
  },
  {
    id: 5,
    title: "Black Hoodie",
    description: "Unisex black hoodie with front pocket and soft fleece inside.",
    price: 999,
    originalPrice: 1499,
    image: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/N77892s.jpg?im=Resize,width=640",
    category: "Unisex"
  }
];

const products2 = [
  {
    id: 1,
    title: "Classic White T-Shirt",
    description: "100% cotton, slim fit, breathable and lightweight.",
    price: 499,
    originalPrice: 799,
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/t/v/c/xl-kcsh-fo-1647-wh-fubar-original-imah4zensmpmzgbn.jpeg?q=70&crop=false",
    category: "Men"
  },
  {
    id: 2,
    title: "Men’s Denim Jacket",
    description: "Stylish blue denim jacket for casual wear.",
    price: 1899,
    originalPrice: 2499,
    image: "https://campussutra.com/cdn/shop/files/JKDENIMP02_M_PLN_NBU_1_80a9e6ee-5622-456b-82f5-a2fb3e18f9f8.jpg?v=1728974706&width=800",
    category: "Men"
  },
  {
    id: 3,
    title: "Floral Summer Dress",
    description: "Light and breezy dress perfect for summer outings.",
    price: 1399,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80",
    category: "Women"
  },
  {
    id: 4,
    title: "Women’s Beige Coat",
    description: "Elegant coat with a warm inner lining for winter.",
    price: 2999,
    originalPrice: 3799,
    image: "https://m.media-amazon.com/images/I/61OWk8KmCWL._SY879_.jpg",
    category: "Women"
  },
  {
    id: 5,
    title: "Black Hoodie",
    description: "Unisex black hoodie with front pocket and soft fleece inside.",
    price: 999,
    originalPrice: 1499,
    image: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/N77892s.jpg?im=Resize,width=640",
    category: "Unisex"
  }

];



function Home() {
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
            products1.map((item) => <Card product={item} />)
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
            products2.map((item) => <Card product={item} />)
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