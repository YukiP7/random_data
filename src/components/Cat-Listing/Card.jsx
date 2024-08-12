import React from 'react';

function Card({ image, name, description, origin, temperament, life_span , wikipedia_url}) {
  return (
    <div className='w-96 h-auto bg-white text-black rounded-2xl shadow-lg transition-transform transform hover:scale-105 flex-shrink-0'>
      <div>
        <img 
          src={image} 
          alt="cat-image"
          className='w-full h-80 rounded-t-2xl object-cover' 
        />
      </div>
      <div className='m-4'>
        <h1 className='text-2xl font-semibold'>{name}</h1>
        <p className='text-sm text-black mt-2'>{description}</p>
        <div className='flex gap-20 mt-2'>
          <p className='font-medium italic'>Origin</p>
          <p>{origin}</p>
        </div>
        <h1 className='font-medium mt-2 italic'>Temperament</h1>
        {Array.isArray(temperament) ? (
          <div className='flex flex-wrap gap-2'>
            {temperament.map((trait, index) => (
              <div 
                key={index}
                className='text-[#353535] bg-white bg-opacity-5 rounded-xl px-2 py-1'
              >
                {trait}
              </div>
            ))}
          </div>
        ) : (
          <p className='text-sm'>{temperament}</p>
        )}
        <div className='flex gap-14 mt-2'>
          <p className=' font-medium italic'>Life Span</p>
          <p>{life_span} years</p>
        </div>
      </div>

      <a href={wikipedia_url} target='_blank' className='block text-blue-500 hover:text-blue-700 decoration-none mb-0 ml-4'>Learn More</a>
    </div>
  );
}

export default Card;


