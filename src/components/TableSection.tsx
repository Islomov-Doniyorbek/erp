'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from "@/store/store";
import { useM } from '@/app/context';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaFilter } from 'react-icons/fa';

// Type definitions
interface Agent {
  id: number;
  countrAgentName: string;
  countrAgentStir: string;
  // ... other agent properties
}

interface Contract {
  id: number;
  dealType: string;
  countrAgent: number;
  dealMazmun: string;
  dealNum: string | number;
  dealDate: string;
  dealSumm: string | number;
  debit: string | number;
  kredit: string | number;
  // ... other contract properties
}

interface MergedContract extends Contract {
  countrAgentName: string;
  countrAgentStir: string;
}

const TableSection = () => {
    const { findPageTable, change } = useM();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const stirQuery = searchParams.get('stir');

    const reduxDeals = useSelector((state: RootState) => state.contracts.contracts as Contract[]);
    const agents = useSelector((state: RootState) => state.agents.agents as Agent[]);

    // useMemo bilan agent ma'lumotlarini birlashtirish
    const mergingContracts: MergedContract[] = useMemo(() => {
        return reduxDeals.map(contract => {
            const agent = agents.find(a => a.id === contract.countrAgent)
            return {
                ...contract,
                countrAgentName: agent?.countrAgentName || "",
                countrAgentStir: agent?.countrAgentStir || ""
            }
        });
    }, [reduxDeals, agents]);

    // --- PageType ---
    const [originDeals, setOriginDeals] = useState<MergedContract[]>([]);
    const [deals, setDeals] = useState<MergedContract[]>([]);
    const [filterType, setFilterType] = useState<"" | "opening" | "closing">("");
    const [stir, setStir] = useState("");
    const [docNum, setDocNum] = useState("");
    const [docDate, setDocDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // --- Helper functions ---
    const parseDate = (dateStr: string): Date => {
        if (!dateStr) return new Date(0);
        const [day, month, year] = dateStr.split(".");
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    const isSameDay = (d1: Date, d2: Date): boolean =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    const goToTurnovers = (dealId: number) => {
        router.push(`/contracts/${dealId}`);
    };

    // Filterlarni qo'llash funksiyasi
    const applyFilters = (data: MergedContract[]) => {
        let filtered = [...data];

        // Ochiq / yopiq filter
        if (filterType === "opening") {
            filtered = filtered.filter(d => {
                const debitNum = typeof d.debit === 'string' ? parseFloat(d.debit) : d.debit || 0;
                const dealSummNum = typeof d.dealSumm === 'string' ? parseFloat(d.dealSumm) : d.dealSumm || 0;
                return debitNum !== dealSummNum;
            });
        } else if (filterType === "closing") {
            filtered = filtered.filter(d => {
                const debitNum = typeof d.debit === 'string' ? parseFloat(d.debit) : d.debit || 0;
                const dealSummNum = typeof d.dealSumm === 'string' ? parseFloat(d.dealSumm) : d.dealSumm || 0;
                return debitNum === dealSummNum;
            });
        }

        // STIR
        if (stir.trim()) {
            filtered = filtered.filter(d => 
                d.countrAgentStir?.toString().trim() === stir.trim()
            );
        }

        // Raqam
        if (docNum.trim()) {
            filtered = filtered.filter(d => 
                d.dealNum?.toString().trim() === docNum.trim()
            );
        }

        // Yagona sana
        if (docDate) {
            const target = new Date(docDate);
            filtered = filtered.filter(d => isSameDay(parseDate(d.dealDate), target));
        }

        // Sana oralig'i
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            filtered = filtered.filter(d => {
                const dealD = parseDate(d.dealDate);
                return dealD >= start && dealD <= end;
            });
        }

        setDeals(filtered);
    };

    // Asosiy ma'lumotlarni yangilash - faqat bitta useEffect
    const pageType = useMemo(() => {
  if (pathname.startsWith("/sales")) return "sale";
  if (pathname.startsWith("/purchase")) return "purchase";
  return "";
}, [pathname]);

// const filteredDeals = useMemo(() => {
//   return mergingContracts.filter(d => d.dealType === pageType);
// }, [mergingContracts, pageType]);


    const kontrAgent = findPageTable === "sale"
        ? "Xaridor va buyurtma beruvchi korxonalar"
        : findPageTable === "purchase"
        ? "Mol yetkazib beruvchi korxonalar"
        : "";

    // STIR query bo'yicha filter qilish
    const filteredDeals = useMemo(() => {
        if (stirQuery) {
            return deals.filter(deal => deal.countrAgentStir?.toString() === stirQuery);
        }
        return deals;
    }, [deals, stirQuery]);

    const calculateTotal = (debit: string | number, kredit: string | number): number => {
        const debitNum = typeof debit === 'string' ? parseFloat(debit) : debit || 0;
        const kreditNum = typeof kredit === 'string' ? parseFloat(kredit) : kredit || 0;
        return debitNum - kreditNum;
    };

    return (
        <>
            <div className='w-full flex gap-2 justify-start py-2.5'>
                {/* Filter buttons */}
                <div className='flex gap-2'>
                    <button 
                        onClick={() => setFilterType("")} 
                        className={`px-2 py-0.5 border-2 border-[#6930c3] text-[16px] ${filterType === "" ? "bg-[#6930c3] text-white" : ""}`}
                    >
                        Umumiy
                    </button>
                    <button 
                        onClick={() => setFilterType("opening")} 
                        className={`px-2 py-0.5 border-2 border-[#6930c3] text-[16px] ${filterType === "opening" ? "bg-[#6930c3] text-white" : ""}`}
                    >
                        Ochiq
                    </button>
                    <button 
                        onClick={() => setFilterType("closing")} 
                        className={`px-2 py-0.5 border-2 border-[#6930c3] text-[16px] ${filterType === "closing" ? "bg-[#6930c3] text-white" : ""}`}
                    >
                        Yopiq
                    </button>
                </div>

                {/* STIR */}
                <div className='flex items-center gap-1.5 border-2 border-[#6930c3] p-1 rounded-[7px]'>
                    <input 
                        type="text" 
                        value={stir} 
                        onChange={e => setStir(e.target.value)} 
                        placeholder="STIR" 
                        className='w-36 text-[16px] outline-none' 
                    />
                    <FaFilter className='text-2xl text-[#6930c3]' />
                </div>

                {/* Raqam */}
                <div className='flex items-center gap-1.5 border-2 border-[#6930c3] p-1 rounded-[7px]'>
                    <input 
                        type="text" 
                        value={docNum} 
                        onChange={e => setDocNum(e.target.value)} 
                        placeholder="Raqam" 
                        className='w-36 text-[16px] outline-none' 
                    />
                    <FaFilter className='text-2xl text-[#6930c3]' />
                </div>

                {/* Yagona sana */}
                <div className='flex items-center gap-1.5 border-2 border-[#6930c3] p-1 rounded-[7px]'>
                    <input 
                        type="date" 
                        value={docDate} 
                        onChange={e => setDocDate(e.target.value)} 
                        className='w-36 text-[16px] outline-none' 
                    />
                    <FaFilter className='text-2xl text-[#6930c3]' />
                </div>

                {/* Sana oralig'i */}
                <div className='flex items-center gap-1.5 border-2 border-[#6930c3] p-1 rounded-[7px]'>
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={e => setStartDate(e.target.value)} 
                        className='w-36 text-[16px] outline-none' 
                    />
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={e => setEndDate(e.target.value)} 
                        className='w-36 text-[16px] outline-none' 
                    />
                    <FaFilter className='text-2xl text-[#6930c3]' />
                </div>
            </div>

            {/* Table */}
            <table className='w-full border-collapse border border-gray-300'>
                <thead>
                    <tr>
                        <th className='border py-4 w-[5%]'><input type="checkbox" className='scale-200' /></th>
                        <th className='border w-[25%]'>
                            <div className='text-center border-b py-2'>{kontrAgent}</div>
                            <div className='w-full flex'>
                                <div className='w-[60%] border-r py-2 text-center'>Nomi</div>
                                <div className='w-[40%] py-2 text-center'>STIR</div>
                            </div>
                        </th>
                        <th className='border w-[40%]'>
                            <div className='text-center border-b py-2'>Shartnoma</div>
                            <div className='w-full flex'>
                                <div className='w-[40%] border-r py-2 text-center'>Mazmuni</div>
                                <div className='w-[20%] border-r py-2 text-center'>Raqam</div>
                                <div className='w-[20%] border-r py-2 text-center'>Sana</div>
                                <div className='w-[20%] py-2 text-center'>Summasi</div>
                            </div>
                        </th>
                        <th className='border w-[30%]'>
                            <div className='text-center border-b py-2'>Summa</div>
                            <div className='w-full flex'>
                                <div className='w-[33%] border-r py-2 text-center'>Debit</div>
                                <div className='w-[33%] border-r py-2 text-center'>Kredit</div>
                                <div className='w-[34%] py-2 text-center'>Umumiy</div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDeals.length > 0 ? (
                        filteredDeals.map(deal => (
                            <tr 
                                key={deal.id} 
                                onClick={() => goToTurnovers(deal.id)} 
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                <td className='border text-center' onClick={e => e.stopPropagation()}>
                                    <input type="checkbox" className='scale-200' />
                                </td>
                                <td className='border'>
                                    <div className='flex'>
                                        <div className='w-[60%] pl-1.5 border-r py-2 overflow-hidden text-ellipsis whitespace-nowrap'>
                                            {deal.countrAgentName}
                                        </div>
                                        <div className='w-[40%] pl-1.5 py-2'>
                                            {deal.countrAgentStir}
                                        </div>
                                    </div>
                                </td>
                                <td className='border'>
                                    <div className='flex'>
                                        <div className='w-[40%] pl-1.5 border-r py-2'>
                                            {deal.dealMazmun}
                                        </div>
                                        <div className='w-[20%] pl-1.5 border-r py-2'>
                                            {deal.dealNum}
                                        </div>
                                        <div className='w-[20%] pl-1.5 border-r py-2'>
                                            {deal.dealDate}
                                        </div>
                                        <div className='w-[20%] pl-1.5 py-2'>
                                            {deal.dealSumm}
                                        </div>
                                    </div>
                                </td>
                                <td className='border'>
                                    <div className='flex'>
                                        <div className='w-[33%] pl-1.5 border-r py-2'>
                                            {deal.debit}
                                        </div>
                                        <div className='w-[33%] border-r pl-1.5 py-2'>
                                            {deal.kredit}
                                        </div>
                                        <div className='w-[34%] pl-1.5 py-2'>
                                            {calculateTotal(deal.debit, deal.kredit)}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className='border py-4 text-center'>
                                Ma`lumot topilmadi
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default TableSection;