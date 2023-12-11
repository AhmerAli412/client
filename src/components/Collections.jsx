import React from 'react'
import pic1 from '../img/pic1.jpeg'
import pic2 from '../img/pic2.jpeg'
import pic3 from '../img/pic3.jpeg'
import pic4 from '../img/pic4.jpeg'

const Collections = () => {
  return (
    <div>
        <div class="bg-bgg py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <h2 class="mb-8 text-center text-2xl font-bold text-white md:mb-12 lg:text-3xl">Collections</h2>

    <div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
    
      <div>
        <a href="#" class="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
          <img src={pic1} loading="lazy" alt="Photo by Austin Wade" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

          <div class="relative flex w-full flex-col rounded-lg bg-bgg1 p-4 text-center">
            <span class="text-white">Men</span>
            <span class="text-lg font-bold text-white lg:text-xl">Business Causual</span>
          </div>
        </a>
      </div>
  
      <div>
        <a href="#" class="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
          <img src={pic2} loading="lazy" alt="Photo by engin akyurt" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

          <div class="relative flex w-full flex-col rounded-lg bg-bgg1 p-4 text-center">
            <span class="text-white">Women</span>
            <span class="text-lg font-bold text-white lg:text-xl">Summer Season</span>
          </div>
        </a>
      </div>
     
      <div>
        <a href="#" class="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
          <img src={pic3} loading="lazy" alt="Photo by Austin Wade" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

          <div class="relative flex w-full flex-col rounded-lg bg-bgg1 p-4 text-center">
            <span class="text-white">Men</span>
            <span class="text-lg font-bold text-white lg:text-xl">Streetwear</span>
          </div>
        </a>
      </div>
   
      <div>
        <a href="#" class="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
          <img src={pic4} loading="lazy" alt="Photo by Austin Wade" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

          <div class="relative flex w-full flex-col rounded-lg bg-bgg1 p-4 text-center">
            <span class="text-white">Women</span>
            <span class="text-lg font-bold text-white lg:text-xl">Sale</span>
          </div>
        </a>
      </div>
    
    </div>
  </div>
</div>
    </div>
  )
}

export default Collections