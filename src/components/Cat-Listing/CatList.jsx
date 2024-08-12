import React, { useEffect, useState } from 'react'
import backgroundImg from '../../assets/bg-catList.png'
import chaiCup from '../../assets/cup.png'
import Card from './Card'

function CatList() {
  const [catList , setCatList] = useState(null)

  const fetchCatData = async () => {
    try {
      const response = await fetch('https://api.freeapi.app/api/v1/public/cats?page=1&limit=4')
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json() 
      console.log(data.data.data)
      setCatList(data.data.data)

    } catch (error) {
       console.error("Error in API Fetching", error);
    }
  }

  useEffect(() => {
    fetchCatData() ;
  } , [])

  const handleCup = () => {
    window.open("https://chaicode.com/" ,'_blank')
  }

  return (
    <div>
     {catList? (
        <div
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover' 
          }} 
          className="min-h-screen bg-black bg-opacity-55"
        >

          <h1 className='font-bold text-5xl p-9 pb-4 text-white'>Cats around us</h1>

          <div className="flex overflow-x-auto p-9 space-x-7">
            {catList.map((cat, index) => (
              <Card 
                key={index} 
                image={cat.image} 
                name={cat.name} 
                description={cat.description} 
                origin={cat.origin} 
                temperament={cat.temperament} 
                life_span={cat.life_span} 
              />
            ))}
          </div>
    
          <div className='absolute top-3 right-3'>
              <img src={chaiCup} alt="offer-me-a-chai" 
              className=' cursor-pointer'
              onClick={handleCup}
              />
          </div>         

        </div>
      ) : (
        <div className='min-h-screen bg-[#212121] flex items-center justify-center'>
          <p className='text-center text-white text-2xl'>Loading...</p>
        </div>
      )}
    </div>
  )
}

export default CatList