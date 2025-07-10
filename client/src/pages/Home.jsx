import React from 'react'
import myImage from '../assets/HeroSectionImage.png';
function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 md:px-12 bg-white">
  <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
    
    {/* Left Content */}
    <div className="max-w-xl">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-4">
        Customized <br />
        <span className="text-blue-600">Printed Tees</span>
      </h1>
      <p className="text-gray-600 text-base md:text-lg mb-6">
        Nam at congue diam etiam erat lectus, finibus eget commodo quis, congue diam etiam erat lectus.
      </p>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
        Explore Store
      </button>
    </div>

    {/* Right Image */}
    <div className="w-full md:w-[50%] flex justify-center mt-40">
      <img
        src={myImage}
        alt="Boy in customized tee"
        className="w-full max-w-[1000px]  h-auto object-contain"
      />
    </div>
  </div>
</div>
  )
}

export default Home