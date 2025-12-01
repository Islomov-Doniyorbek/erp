'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from "@/store/store";
import {setCreateDog, toggleCreateDog } from '@/store/features/bools/isBool';
import TableSection from '@/components/TableSection';
import { usePathname } from 'next/navigation';
import { useM } from '../context';
import { addDeal } from '@/store/features/deals/dealSale';

const Page = () => {
  // const [isForm, setIsForm] = useState(false);
  const dispatch = useDispatch()
  const isForm = useSelector((state:RootState) => state.bools.createDog)
  const [form, setForm] = useState({
      counteragent: "",
      stir: "",
      phone: "",
      dealDate: "",
      dealNum: "",
      dealMazmun: "",
      dealSumm: "",
      debit: 410000,
      kredit: 41000,
  })

  const addForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }
  const saveData = () => {
    dispatch(addDeal(form));
    console.log(form); 
  }
  return (
    <Suspense >
      <div className='relative'>      
      <div className="w-full flex justify-between">
        <h2 className='text-3xl font-bold'>Sotuvlar</h2>
        <button onClick={()=>dispatch(setCreateDog(true))} className='text-2xl font-bold px-5 py-1 text-white bg-[#6930C3] rounded-2xl cursor-pointer active:bg-[#8045e0]'>Yangi sotuv +</button>
      </div>

      <div className={`absolute transition-all duration-700 w-[360px]
    ${isForm ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0  pointer-events-none"} 
    left-[50%] top-[30%] -translate-x-[50%] -translate-y-[10%] z-10 
    py-2.5 px-2 bg-white border-4 rounded-[7px] border-[#6930C3]`}>
        <div className='relative my-2'>
          <h2 className='text-lg text-center'>Xaridor bilan yangi bitim tuzish</h2>
          <MdClose
          onClick={()=>dispatch(setCreateDog(false))}
          className='absolute cursor-pointer text-3xl -right-1.5 -top-4'/>
        </div>
        <div className='flex gap-1.5 flex-col my-3'>
          <label htmlFor="customer"
          className='text-[18px] flex justify-between'>
            <span>Xaridor</span>
          <span>Yangi <input type='checkbox' /></span>
          </label>
          <input type="text" id='customer' placeholder='LukOil LTZ'
          className='border rounded-[7px] border-[#6930c3] py-0.5 px-1'
          value={form.counteragent}
          onChange={(e)=>addForm(e)}
          name='counteragent'
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
            value={form.stir}
            onChange={(e)=>addForm(e)}
            name='stir'
          />
        </div>
        <div className='flex gap-1.5 flex-col my-3'>
          <label htmlFor="mazmun"
          className='text-[18px]'>Shartnoma mazmuni</label>
          <input type="text" id='mazmun' placeholder='...'
          className='border rounded-[7px] border-[#6930c3] py-0.5 px-1'
          value={form.dealMazmun}
          onChange={(e)=>addForm(e)}
          name='dealMazmun'
          />
        </div>
        <div className='flex gap-1.5 flex-col my-3'>
          <label htmlFor="nomer"
          className='text-[18px]'>Shartnoma raqami</label>
          <input type="text" id='nomer' placeholder='12/44'
          className='border rounded-[7px] border-[#6930c3] py-0.5 px-1'
          value={form.dealNum}
          onChange={(e)=>addForm(e)}
          name='dealNum'
          />
        </div>
        <div className='flex gap-1.5 flex-col my-3'>
          <label htmlFor="sana"
          className='text-[18px]'>Shartnoma sanasi</label>
          <input type="date" id='sana' placeholder='12/44'
          className='border rounded-[7px] border-[#6930c3] py-0.5 px-1'
          value={form.dealDate}
          onChange={(e)=>addForm(e)}
          name='dealDate'
          />
        </div>
        <div className='flex gap-1.5 flex-col my-3'>
          <label htmlFor="summa"
          className='text-[18px]'>Shartnoma summasi, uzs</label>
          <input type="number" min={100} step={1} max={1000000000000} id='summa' placeholder='1000'
          className='border rounded-[7px] border-[#6930c3] py-0.5 px-1'
          value={form.dealSumm}
          onChange={(e)=>addForm(e)}
          name='dealSumm'
          />
        </div>
        <button className='w-full border rounded-[7px] bg-[#6930c3] text-white text-2xl cursor-pointer py-0.5 px-1'
        onClick={()=>saveData()}
        >+</button>
      </div>

      <div className='w-full mt-6'>
        <TableSection/>
      </div>
    </div>
    </Suspense>
  )
}

export default Page
