'use client'
import React, { useState } from 'react'
import { MdClose, MdLink } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from "@/store/store";
import { setCreateDog, toggleCreateDog } from '@/store/features/bools/isBool';
import { useRouter } from 'next/navigation';

const Page = () => {
  
//   const dispatch = useDispatch()
//   const isForm = useSelector((state:RootState) => state.bools.createDog)
//   const deals = useSelector((state: RootState) => state.Pdeals.deals)
  const factures = useSelector((state:RootState) => state.documents.documents)
  const contracts = useSelector((state: RootState) => state.contracts.contracts);
  const merginFactures = factures.map(fact=>{
    const contract = contracts.find(c => c.id === fact.dealId)
    return {
      ...fact,
      counteragent: contract?.counteragent || "",
      stir: contract?.stir || "",
      contractType: contract?.dealType || "",
      dealId: contract?.id
    }
  })


  const router = useRouter()
  const goToTurnovers = (dealId: number, factId: number) => {
        router.push(`/contracts/${dealId}?q=${factId}`);
    };
  return (
    <div className='relative'>
      <div className="w-full flex justify-between">
        <h2 className='text-3xl font-bold'>Hisob Fakturalar</h2>
        {/* <button onClick={()=>dispatch(setCreateDog(true))} className='text-2xl font-bold px-5 py-1 text-white bg-[#6930C3] rounded-2xl cursor-pointer active:bg-[#8045e0]'>Yangi xarid +</button> */}
      </div>

      <div className='w-full mt-6'>
        <table className='w-full'>
          <thead className='w-full'>
            <tr className='w-full'>
              <th className='w-[5%] border py-4 px-2.5'>
                <input type="checkbox" className=' scale-200' />
              </th>
              <th className='w-[30%] text-left border'>
                <div className='w-full text-center border-b px-2.5 py-2'>
                  Hisob faktura
                </div>
                <div className='w-full flex px-2.5'>
                  <div className='w-[10%] flex items-center h-full py-2 border-r'>Turi</div>
                  <div className='w-[50%] flex items-center h-full pl-2.5 py-2 border-r'>Raqam</div>
                  <div className='w-[40%] flex items-center h-full pl-2.5 py-2'>Sanasi</div>
                </div>                                
              </th>
              <th className='w-[30%] text-left border'>
                <div className='w-full text-center border-b px-2.5 py-2'>
                  KontrAgent
                </div>
                <div className='w-full flex px-2.5'>
                  <div className='w-[70%] flex items-center h-full py-2 border-r'>Kim</div>
                  <div className='w-[30%] flex items-center h-full pl-2.5 py-2'>STIR</div>
                </div>                
              </th>
              <th className='w-[5%] text-left border py-4 px-2.5'>Shartnoma</th>
              <th className='w-[30%] text-left border'>
                <div className='w-full text-center border-b px-2.5 py-2'>
                  Yetkazib berish qiymati
                </div>
                <div className='w-full flex px-2.5'>
                  <div className='w-[30%] flex items-center h-full py-2 border-r'>QQSsiz</div>
                  <div className='w-[20%] flex items-center h-full pl-2.5 border-r py-2'>QQS</div>
                  <div className='w-[50%] flex items-center h-full py-2'>Summa</div>
                </div>
              </th>
              {/* <th className='w-[10%] text-left border py-4 px-2.5'>Kredit</th> */}
              {/* <th className='w-[10%] text-left border py-4 px-2.5'>Umumiy</th> */}
            </tr>
          </thead>
          <tbody>
            {
        merginFactures
          .filter(c => c.cftype === "invoice")
          .map(item => {
            return (
              <tr key={item.id}>
                <td className='border'>
                  <div className='flex items-center justify-center'>
                    <input type="checkbox" className='scale-200' />
                  </div>
                </td>

                <td className='border '>
                  <div className='w-full flex px-2.5'>
                    <div className='w-[10%] py-2 h-full  border-r'>
                        {item.contractType == "sale"
                          ? String.fromCharCode(8601) + " K"
                          : String.fromCharCode(0x2197) + " Ch"
                        }
                    </div>
                    <div className='w-[50%] py-2 flex items-center h-full  border-r'>
                      {item.dNum}
                    </div>
                    <div className='w-[40%] py-2 flex items-center h-full pl-2.5 '>
                      {item.ddate}
                    </div>
                  </div> 
                </td>
                <td className='border '>
                  <div className='w-full flex px-2.5'>
                  <div className='w-[70%] flex items-center h-full py-2 border-r'>{item.counteragent}</div>
                  <div className='w-[30%] flex items-center h-full pl-2.5 py-2'>{item.stir}</div>
                </div> 
                </td>
                <td className='border '>
                  <p className="w-full flex justify-center -rotate-45 text-blue-400 cursor-pointer">
                    <MdLink
                    onClick={()=>goToTurnovers(Number(item.dealId), item.id)}
                    className='text-2xl'/>
                  </p>
                </td>
                <td className='border '>
                  <div className='w-full flex px-2.5'>
                    <div className='w-[30%] py-2 flex items-center pl-2.5 h-full border-r'>
                      {item.totalSum}
                    </div>
                    <div className='w-[20%] py-2 flex items-center pl-2.5 h-full  border-r'>
                      {item.qqs}
                    </div>
                    <div className='w-[50%] py-2 flex items-center pl-2.5 h-full'>
                      {item.totalSum}
                    </div>
                  </div> 
                </td>

              </tr>
            );
          })
          }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
