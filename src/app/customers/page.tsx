'use client'
import { formatNumber } from '@/formatters/formatNumber'
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdLink } from 'react-icons/md'
import { useSelector } from 'react-redux'

const Page = () => {
  const router = useRouter()
  const agents = useSelector((state:RootState) => state.agents.agents)
const goToTurnovers = (stir: string) => {
        router.push(`/sales?stir=${stir}`);
    };
  return (
    <div className='relative'>      
      <div className="w-full flex justify-between">
        <h2 className='text-3xl font-bold'>Xaridor</h2>
        <button className='text-2xl font-bold px-5 py-1 text-white bg-[#6930C3] rounded-2xl cursor-pointer active:bg-[#8045e0]'>Yangi +</button>
      </div>
      <div className='w-full mt-6'>
        <table className='w-full border-collapse border border-gray-300'>
                <thead>
                    <tr>
                        <th className='border py-4 w-[5%]'><input type="checkbox" className='scale-200' /></th>
                        <th className='border w-[25%]'>
                            <div className='text-center text-[14px] border-b py-2'>Xaridor va buyurtma beruvchi korxona</div>
                            <div className='w-full flex'>
                                <div className='w-[40%] text-[14px] border-r py-2 text-center'>Nomi</div>
                                <div className='w-[25%] text-[14px] border-r py-2 text-center'>STIR</div>
                                <div className='w-[35%] text-[14px] py-2 text-center'>Telefon raqami</div>
                            </div>
                        </th>
                        <th className='border w-[40%]'>
                            <div className='text-center text-[14px] border-b py-2'>Shartnomalar</div>
                            <div className='w-full flex'>
                                <div className='w-[20%] text-[14px] border-r py-2 text-center'>Soni</div>
                                <div className='w-[25%] text-[14px] border-r py-2 text-center'>Fakturalar qiymati</div>
                                <div className='w-[30%] text-[14px] border-r py-2 text-center'>Umumiy summa</div>
                                <div className='w-[25%] text-[14px] py-2 text-center'>Havola</div>
                            </div>
                        </th>
                        <th className='border w-[30%]'>
                            <div className='text-center text-[14px] border-b py-2'>Summa</div>
                            <div className='w-full flex'>
                                <div className='w-[33%] text-[14px] border-r py-2 text-center'>Debit</div>
                                <div className='w-[33%] text-[14px] border-r py-2 text-center'>Kredit</div>
                                <div className='w-[34%] text-[14px] py-2 text-center'>Umumiy</div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                      agents.map(item=>(
                        <tr key={item.id}>
                          <td className='border text-center'><input type="checkbox" className='scale-200' /></td>
                          <td className='border'>
                              <div className='w-full flex'>
                                  <div className='w-[40%] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] border-r py-2 text-center'>{item.countrAgentName}</div>
                                  <div className='w-[25%] text-[14px] border-r py-2 text-center'>{item.countrAgentStir}</div>
                                  <div className='w-[35%] text-[14px] py-2 text-center'>{item.countrAgentPhone}</div>
                              </div>
                          </td>
                          <td className='border'>
                              <div className='w-full flex'>
                                  <div className='w-[20%] text-[14px] border-r py-2 text-center'>{item.countrAgentContractsCount}</div>
                                  <div className='w-[25%] text-[14px] border-r py-2 text-center'>{formatNumber(Number(item.countrAgentCFSumm))}</div>
                                  <div className='w-[30%] text-[14px] border-r py-2 text-center'>{formatNumber(Number(item.countrAgentTotalContractsSum))}</div>
                                  <div className='w-[25%] text-[14px] py-2 text-center'>
                                    <p className="w-full flex justify-center -rotate-45 text-blue-400 cursor-pointer">
                                                        <MdLink
                                                        onClick={()=>goToTurnovers(item.countrAgentStir)}
                                                        className='text-2xl'/>
                                    </p>                                    
                                  </div>
                              </div>
                          </td>
                          <td className='border '>
                              <div className='w-full flex'>
                                  <div className='w-[33%] text-[14px] border-r py-2 text-center'>0</div>
                                  <div className='w-[33%] text-[14px] border-r py-2 text-center'>0</div>
                                  <div className='w-[34%] text-[14px] py-2 text-center'>0</div>
                              </div>
                          </td>
                        </tr>
                      ))
                    }
                </tbody>
            </table>
      </div>
    </div>
  )
}

export default Page
