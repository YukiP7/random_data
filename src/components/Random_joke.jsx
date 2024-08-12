import React, { useEffect, useState } from 'react';
import backgroundImg from '../assets/bg-randomJoke.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faBookBookmark, faComment, faHeart, faRetweet, faRotateRight, faUpload } from '@fortawesome/free-solid-svg-icons';
import chaiCup from '../assets/cup.png'
import image from '../assets/elon_musk.png'

function Random_joke() {
  const [joke, setJoke] = useState(null);
  const [reload , setReload] = useState(false) ;
  
  const fetchJoke = async () => {
    try {
      const response = await fetch('https://api.freeapi.app/api/v1/public/randomjokes/joke/random');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.data); 

      setJoke(data.data);

    } catch (error) {
      console.error("Error in API Fetching", error);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, [reload]);

  const handleCup = () => {
    window.open("https://chaicode.com/" ,'_blank')
  }

  // Function to generate random timestamp
  const generateRandomTimestamp = () => {
    const date = new Date();
    const randomDays = Math.floor(Math.random() * 30); // Random number of days in the last month
    date.setDate(date.getDate() - randomDays);
    return date.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true }) + ' · ' + date.toLocaleDateString();
  };

  // Function to generate random views and interactions
  const generateRandomAnalytics = () => {
    return {
      views: (Math.random() * 100 + 10).toFixed(1) + 'M', // Random views between 1M and 10M
      comments: Math.floor(Math.random() * 100) + 'K', // Random comments between 0 and 10K
      retweets: Math.floor(Math.random() * 100) + 'K', // Random retweets between 0 and 10K
      likes: Math.floor(Math.random() * 1000) + 'K', // Random likes between 0 and 10K
      bookmarks: Math.floor(Math.random() * 1000) + 'K' // Random bookmarks between 0 and 1K
    };
  };

const analytics = generateRandomAnalytics() 
const timeStamp = generateRandomTimestamp()

  return (
    <div>
      {joke? (
        <div
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover' 
          }} 
          className="min-h-screen bg-black flex items-center justify-center"
        >
          <div className='bg-black text-white rounded-xl py-4 px-5 w-auto lg:w-1/3 mx-10 md:w-1/2'>
            <div className='flex justify-between items-center '>
              <div className='flex gap-4 items-center'>
                <FontAwesomeIcon icon={faArrowLeft} />
                <p className='text-lg'>Post</p>
              </div>
              <FontAwesomeIcon icon={faRotateRight} onClick={() => (setReload(!reload))} className='cursor-pointer' />
            </div>

            <div className='flex items-center gap-1 flex-row pt-5 justify-start'>
              <img 
                src={image}
                alt="user-profile"
                className='h-12 w-12 rounded-full'  
              />

              <div className='mt-2'>
              <p className='font-serif text-sm'>Elon Musk </p>
              <p className='font-sans text-xs mb-5 text-[#A0A0A0]'>@elonmusk</p>
              </div>
            </div>

            <div>
              <p className='text-sm'>{joke.content}</p>
            </div>

            <div>
              <p className='text-xs text-[#71767B] mt-3 mb-4'>
                {timeStamp} <span className='font-semibold text-white'>{analytics.views}</span> Views</p>
            </div>

            <div className='mb-5'>
              <div className="border-b-2 border-[#71767B] my-2"></div>
              <div className='flex gap-4 items-center justify-around text-[#71767B]'>
                <div 
                className='flex items-center gap-1 cursor-pointer'
                >
                  <FontAwesomeIcon icon={faComment} />
                  <p className='text-xs'>{analytics.comments}</p>
                </div>
              <div 
              className='flex items-center gap-1 cursor-pointer'>
                 <FontAwesomeIcon icon={faRetweet} />
                <p className='text-xs'>{analytics.retweets}</p>
              </div>
              <div 
              className='flex items-center gap-1 cursor-pointer'>
                 <FontAwesomeIcon icon={faHeart} />
                <p className='text-xs'>{analytics.likes}</p>
              </div>
              <div 
              className='flex items-center gap-1 cursor-pointer'>
                 <FontAwesomeIcon icon={faBookBookmark} />
                <p className='text-xs'>{analytics.bookmarks}</p>
              </div>

              <div 
              className='flex items-center gap-1 cursor-pointer'>
                 <FontAwesomeIcon icon={faUpload} />
              </div>
              </div>
              <div className="border-b-2 border-[#71767B] my-2"></div>
            </div>

            <div className='text-center text-white opacity-40 text-xs inset-x-0 bottom-0'>&copy; chai aur code</div>
          </div>

          <div className='absolute bottom-2 right-2'>
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
  );
}

export default Random_joke;