'use client'
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from "@/store/store";
import { setCreateDog } from '@/store/features/bools/isBool';
import TableSection from '@/components/TableSection';

const Page = () => {
  
  const dispatch = useDispatch()
  const isForm = useSelector((state:RootState) => state.bools.createDog)

  return (
    <div className='relative'>
      <div className="w-full flex justify-between">
        <h2 className='text-3xl font-bold'>Xaridlar</h2>
        <button onClick={()=>dispatch(setCreateDog(true))} className='text-2xl font-bold px-5 py-1 text-white bg-[#6930C3] rounded-2xl cursor-pointer active:bg-[#8045e0]'>Yangi xarid +</button>
      </div>

      <div className={`absolute transition-all duration-700 w-[360px]
    ${isForm ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0  pointer-events-none"} 
    left-[50%] top-[30%] -translate-x-[50%] -translate-y-[10%] z-10 
    py-2.5 px-2 bg-white border-4 rounded-[7px] border-[#6930C3]`}>
        <div className='relative my-2'>
          <h2 className='text-lg text-center'>Yetkazib beruvchi bilan yangi bitim tuzish</h2>
          <MdClose
          onClick={()=>dispatch(setCreateDog(false))}
          className='absolute cursor-pointer text-3xl -right-1.5 -top-4'/>
        </div>
        <div className='flex gap-1.5 flex-col my-3'>
          <label htmlFor="customer"
          className='text-[18px]'>Yetkazib beruvchi</label>
          <input type="text" id='customer' placeholder='LukOil LTZ'
          className='border rounded-[7px] border-[#6930c3] py-0.5 px-1'
          />
        </div>
        <div className='flex gap-1.5 flex-col my-3'>
          <label htmlFor="inn"
          className='text-[18px]'>STIR</label>
          <input
            type="text"
            id="inn"
            placeholder="123456789"
            pattern="^[0-9]{9}$"
            maxLength={9}
            className="border rounded-[7px] border-[#6930c3] py-0.5 px-1"
          />
        </div>
        <div className='flex gap-1.5 flex-col my-3'>
          <label htmlFor="mazmun"
          className='text-[18px]'>Shartnoma mazmuni</label>
          <input type="text" id='mazmun' placeholder='...'
          className='border rounded-[7px] border-[#6930c3] py-0.5 px-1'
          />
        </div>
        <div className='flex gap-1.5 flex-col my-3'>
          <label htmlFor="nomer"
          className='text-[18px]'>Shartnoma raqami</label>
          <input type="text" id='nomer' placeholder='12/44'
          className='border rounded-[7px] border-[#6930c3] py-0.5 px-1'
          />
        </div>
        <div className='flex gap-1.5 flex-col my-3'>
          <label htmlFor="sana"
          className='text-[18px]'>Shartnoma sanasi</label>
          <input type="date" id='sana' placeholder='12/44'
          className='border rounded-[7px] border-[#6930c3] py-0.5 px-1'
          />
        </div>
        <button className='w-full border rounded-[7px] bg-[#6930c3] text-white text-2xl cursor-pointer py-0.5 px-1'>+</button>
      </div>

      <div className='w-full mt-6'>
        <TableSection/>
      </div>
    </div>
  )
}

export default Page
