import React from 'react'
import { useState } from 'react'
import { modal } from '../constants'

const Card = ({img, title, text}) => {
    const [visible, setVisible] = useState(false)
    return (
        <div className="max-w-sm bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 ">
            <img className="rounded-t-lg h-52 w-full object-center object-cover" src={img} alt={title} />
            <div className="p-5 space-y-6">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{text}</p>
                <a onClick={() => setVisible(true)} className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium 
                text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
                 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>

            <div className={`w-screen h-screen fixed ${!visible && `hidden` } inset-0 z-30
             bg-black bg-opacity-50 flex items-center justify-center`}>
                    <div className='bg-[#E2E8F0] rounded-lg w-1/2 max-sm:w-[80%] p-4'>
                        <div className='flex justify-end'>
                            <button onClick={() => setVisible(false)} 
                            className='text-3xl text-[#263145] 
                            hover:text-[#263145] focus:outline-none'>&times;</button>
                        </div>
                        <div className='flex max-sm:flex-col'>
                        <img src="\src\assets\images\modal.png" alt="" className='w-52 mx-auto'/>
                        <div className=''>
                            <h5 className='text-2xl text-center font-bold text-[#263145] pt-2'>What's More?</h5>
                            <p className='text-lg text-[#263145] py-6 px-8 max-sm:tracking-tighter text-justify max-sm:h-40 overflow-auto'>{modal}</p>
                        </div>

                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Card
