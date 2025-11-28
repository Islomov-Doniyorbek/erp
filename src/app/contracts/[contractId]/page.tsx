'use client';
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { formatNumber } from "@/formatters/formatNumber";

export default function Page() {
  const params = useParams();
  const contractId = params.contractId;

  const contracts = useSelector((state: RootState) => state.contracts.contracts);
  const documents = useSelector((state: RootState) => state.documents.documents);

  // const [sumFact, setSumFacts] = useState(0);

  // --- MERGING ---
  const merging = documents.map(doc => {
    const contract = contracts.find(c => c.id === doc.dealId);

    return {
      ...doc,
      counteragent: contract?.counteragent || "",
      stir: contract?.stir || "",
      contractType: contract?.dealType || "",
      dealId: contract?.id || ""
    };
  });
  
  const sumFact = merging
  .filter(f => String(f.dealId) === String(contractId)) // faqat shu shartnomaga tegishlilar
  .filter(f => f.cftype === "invoice")                // invoice turidagi hujjatlar
  .reduce((acc, f) => acc + f.totalSum, 0); 

  // --- DEAL INFO ---
  const dealInfo = contracts.find(c => c.id === Number(contractId));

  const searchParams = useSearchParams();
  
  const q = searchParams.get('q');  
  useEffect(()=>{
    console.log(q);
    
  }, [q])

  return (
    <div className='relative'>
      <div className="w-full flex justify-between">
        <div className='text-lg font-bold'>
          <p>
            {dealInfo?.dealDate} sanada ochilgan {dealInfo?.dealNum} raqamli shartnoma bo`yicha aylanmalar
          </p>
        </div>
      </div>

      <div className='w-full mt-6'>
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr>
              <th className='border py-4 w-[5%]'>
                <input type="checkbox" className='scale-200' />
              </th>

              <th className='border w-[35%]'>
                <div className='text-center border-b py-2'>Kontragent</div>
                <div className='w-full flex'>
                  <div className='w-[60%] border-r py-1 text-center'>Nomi</div>
                  <div className='w-[40%] py-2 text-center'>STIR</div>
                </div>
              </th>

              <th className='border w-[60%]'>
                <div className='flex justify-around border-b py-2'>
                  <p></p>
                  <p>Aylanmalar</p>
                  <p></p>
                  <p>
                    {/* <p className="flex justify-around">
                      <p>To`lgan</p>
                      <p>Umumiy</p>
                    </p> */}
                    <p>{formatNumber(sumFact)} / {formatNumber(Number(dealInfo?.dealSumm))}</p>
                  </p>
                </div>
                <div className='w-full flex'>
                  <div className='w-[20%] border-r py-2 text-center'>Turi</div>
                  <div className='w-[20%] border-r py-2 text-center'>Raqami</div>
                  <div className='w-[20%] border-r py-2 text-center'>Sanasi</div>
                  <div className='w-[40%] py-2 text-center'>Summasi</div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {merging
              .filter(doc => String(doc.dealId) === String(contractId))
              .map(doc => (
                <tr key={doc.id}
                
                className={`
                  ${
                          doc.contractType === "sale"
                            ? (doc.cftype === "invoice" ? "bg-red-50" : "bg-green-50")
                            : (doc.cftype === "purchase" ? "bg-red-50" : "bg-green-50")
                        }
                        ${q!==null ? Number(q)===doc.id ? "text-red-600" : "" : null}
                  `}
                  
                >
                  <td className='border text-center'>
                    <input type="checkbox" className='scale-200' />
                  </td>

                  <td className='border'>
                    <div className='flex'>
                      <div className='w-[60%] pl-1.5 border-r py-2 overflow-hidden text-ellipsis whitespace-nowrap'>
                        {doc.counteragent}
                      </div>
                      <div className='w-[40%] pl-1.5 py-2'>{doc.stir}</div>
                    </div>
                  </td>

                  <td className='border'>
                    <div className='flex'>
                      <div className='w-[20%] pl-1.5 border-r py-2'>
                        {
                          doc.contractType === "sale"
                            ? (doc.cftype === "invoice" ? "Hisob-faktura" : "To'lov")
                            : (doc.cftype === "purchase" ? "To'lov" : "Hisob-faktura")
                        }
                      </div>

                      <div className='w-[20%] pl-1.5 border-r py-2'>{doc.dNum}</div>
                      <div className='w-[20%] pl-1.5 border-r py-2'>{doc.ddate}</div>
                      <div className='w-[40%] pl-1.5 py-2'>{formatNumber(Number(doc.totalSum))}</div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
