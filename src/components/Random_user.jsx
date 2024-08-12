import React, { useEffect, useState } from 'react';
import backgroundImg from '../assets/background_user.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faLocationDot, faPhone, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import chaiCup from '../assets/cup.png'

function Random_user() {
  const monthsName = [
    'January' , 'Febraury' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December'
  ]
  const [userData, setUserData] = useState(null);
  const [reload , setReload] = useState(false) ;
  
  const fetchUserData = async () => {
    try {
      const response = await fetch('https://api.freeapi.app/api/v1/public/randomusers/user/random');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.data); 

      setUserData(data.data);

    } catch (error) {
      console.error("Error in API Fetching", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [reload]);

  const handleCup = () => {
    window.open("https://chaicode.com/" ,'_blank')
  }

  const handleLocation = () => {
    const { latitude, longitude } = userData.location.coordinates; 
    console.log(latitude , longitude)
    const locationUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(locationUrl, '_blank');
  }

  const handleCall = () => {
    const phoneUrl = `tel:${userData.phone}`;
    window.open(phoneUrl, '_blank');
  }

  return (
    <div>
      {userData ? (
        <div
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover' 
          }} 
          className="min-h-screen bg-black flex items-center justify-center"
        >
          <div className='bg-[#b6b3f3] border-8 border-white rounded-xl font-serif py-4 px-8'>
            <div className='flex justify-between items-center'>
              <FontAwesomeIcon icon={faArrowLeft} />
              <p className='text-lg text-black opacity-70 mx-10'>Profile Overview</p>
              <FontAwesomeIcon icon={faRotateRight} onClick={() => (setReload(!reload))} className='cursor-pointer' />
            </div>

            <div className='flex items-center flex-col pt-5'>
              <img 
                src={userData.picture.large}
                alt="user-profile"
                className='h-28 w-28 rounded-full'  
              />

              <p className='font-serif text-2xl m-1'>
                {userData.name.first} {userData.name.last}
              </p>

              <p className='font-sans text-xs m-2 mb-5'>{userData.login.username}</p>
            </div>

            <div className='mb-5'>
              <div className="border-b-2 border-black opacity-5 my-2"></div>
              <div className='flex gap-4 items-center justify-center'>
                <div 
                className='flex items-center gap-1 cursor-pointer'
                onClick={handleLocation}
                >
                  <div className='h-5 w-5 bg-black text-white flex items-center justify-center rounded-full p-3'>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <p className='text-xs'>Location</p>
                </div>

                <div 
                className='flex items-center gap-1 cursor-pointer'
                onClick={handleCall} >
                  <div className='h-5 w-5 bg-black text-white flex items-center justify-center rounded-full p-3'>
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <p className='text-xs'>Call me</p>
                </div>
              </div>
              <div className="border-b-2 border-black opacity-5 my-2"></div>
            </div>

            <div className='flex flex-row gap-7 text-black opacity-70 justify-center items-center m-2 font-sans'>
              <div>
                <h1 className='text-xs'>City</h1>
                <p className='text-lg mb-4 font-semibold'>{userData.location.city}</p> 

                <h1 className='text-xs'>Date of Birth</h1>
                <p className='text-lg mb-4 font-semibold'>{new Date(userData.dob.date).getDate()} {monthsName[new Date(userData.dob.date).getMonth()]},{new Date(userData.dob.date).getFullYear()}</p> 

                <h1 className=' text-xs '>Time Zone</h1>
                <p className='text-lg mb-4 font-semibold'>{userData.location.timezone.offset} ({userData.location.state })</p> 
              </div>

              <div>
              <h1 className='text-xs '>Nationality</h1>
                <p className='text-lg mb-4 font-semibold'>{userData.location.country}</p> 

                <h1 className='text-xs '>Phone No.</h1>
                <p className='text-lg mb-4 font-semibold'>{userData.phone}</p> 

                <h1 className='text-xs '>Registered Since</h1>
                <p className='text-lg mb-4 font-semibold'>{new Date(userData.dob.date).getDate()} {monthsName[new Date(userData.dob.date).getMonth()]},{new Date(userData.dob.date).getFullYear()}</p> 
              </div>
            </div>

            

            <div className='relative mt-20'>
              <img src={chaiCup} alt="offer-me-a-chai" 
              className='absolute bottom-0 right-0 cursor-pointer'
              onClick={handleCup}
              />
            </div>

            <div className='text-center text-white opacity-40 text-xs inset-x-0 bottom-0'>&copy; chai aur code</div>
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

export default Random_user;