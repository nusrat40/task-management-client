import React from 'react';
import banner from '../assets/banner.png'

const Home = () => {
    return (
        <div className=' min-h-screen flex flex-col lg:flex-row justify-center items-center px-20'>
            <img src={banner} alt="" />
            <div className='space-y-6 text-center lg:w-[600px]'>
                <h1 className='text-6xl'>Think,plan and track all in one place</h1>
                <p>Efficiently manage your tasks and boost productivity</p>
            </div>
           
        </div>
    );
};

export default Home;