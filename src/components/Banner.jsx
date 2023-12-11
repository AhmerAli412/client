import React from 'react'

const Banner = () => {
  return (
    <div>
        <div class="bg-bgg py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div class="flex flex-col overflow-hidden rounded-lg bg-gray-900 sm:flex-row md:h-80">
    
      <div class="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-2/5">
        <h2 class="mb-4 text-xl font-bold text-white md:text-2xl lg:text-4xl">Booster Sale<br />Up to 70% off.</h2>

        <p class="mb-8 max-w-md text-gray-400">Get your booster now to acheive maximum inceptia rewards. The offer is for limited time so get your booster as soon as possible.</p>

        <div class="mt-auto">
          <a href="#" class="inline-block rounded-lg bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base">Get now</a>
        </div>
      </div>
     
      <div class="order-first h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-3/5">
        <img src="https://images.unsplash.com/photo-1505846951821-e25bacf2eccd?auto=format&q=75&fit=crop&crop=top&w=1000&h=500" loading="lazy" alt="Photo by Dom Hill" class="h-full w-full object-cover object-center" />
      </div>
      
    </div>
  </div>
</div>
    </div>
  )
}

export default Banner