import React from 'react'

function VideoTitle({title, overview}) {
    return (
        <>
            <div className='w-screen aspect-video absolute pt-[17%] px-12 text-white bg-gradient-to-r from-black'>
                <div className='text-4xl font-bold w-3/4'>{title}</div>
                <div className='mt-3 text-xl w-1/4'>{overview}</div>

                <div className='mt-3'>
                    <button className='bg-red-600 rounded-lg p-4 px-3 text-white'> ▶️ Play</button>
                    <button className='bg-red-600 rounded-lg ml-3 p-4  px-3 text-white'> More Info</button>
                </div> 
            </div>
        </>
    )
}

export default VideoTitle
