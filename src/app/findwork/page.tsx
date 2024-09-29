import Carousel from '@/Components/Carousel';
import Navbar from '@/Components/Navbar';
import React from 'react'

const findwork: React.FC = () => {
  return (
    <div className='bg-blue-300 h-screen'>
      <div>
        <Navbar/>
      </div>
      <div>
        <Carousel/>
      </div>
    </div>
  )
}

export default findwork;
