import React from 'react'

const Stats = () => {
  return (
    <div>
        <div class="bg-bgg py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-lg px-4 md:px-8">
  
    <div class="mb-8 md:mb-12">
      <h2 class="mb-4 text-center text-2xl font-bold text-white md:mb-6 lg:text-3xl">Our Customers by the numbers</h2>

      <p class="mx-auto max-w-screen-md text-center text-white md:text-lg">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p>
    </div>
   
    <div class="grid grid-cols-2 gap-6 rounded-lg bg-bgg1 p-6 md:grid-cols-4 md:gap-8 md:p-8">
     
      <div class="flex flex-col items-center">
        <div class="text-xl font-bold text-white sm:text-2xl md:text-3xl">200</div>
        <div class="text-sm text-indigo-200 sm:text-base">People</div>
      </div>
     
      <div class="flex flex-col items-center">
        <div class="text-xl font-bold text-white sm:text-2xl md:text-3xl">500+</div>
        <div class="text-sm text-indigo-200 sm:text-base">People</div>
      </div>

      
      <div class="flex flex-col items-center">
        <div class="text-xl font-bold text-white sm:text-2xl md:text-3xl">1000+</div>
        <div class="text-sm text-indigo-200 sm:text-base">Customers</div>
      </div>
      
      <div class="flex flex-col items-center">
        <div class="text-xl font-bold text-white sm:text-2xl md:text-3xl">A couple</div>
        <div class="text-sm text-indigo-200 sm:text-base">Coffee breaks</div>
      </div>
     
    </div>
  </div>
</div>
    </div>
  )
}

export default Stats