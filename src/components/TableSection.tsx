"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from "@/store/store";
import { useM } from '@/app/context';
import { usePathname } from 'next/navigation';
import { FaFilter } from 'react-icons/fa';
import { useRouter } from "next/navigation";


const TableSection = () => {

    const { findPageTable, change } = useM();
    const pathname = usePathname();

    const reduxDeals = useSelector((state: RootState) => 
        state.contracts.contracts
    );

    const kontrAgent = findPageTable === "sale"
        ? "Xaridor va buyurtma beruvchi korxonalar"
        : findPageTable === "purchase"
        ? "Mol yetkazib beruvchi korxonalar"
        : "";

    const [deals, setDeals] = useState(reduxDeals);
    const [originDeals, setOriginDeals] = useState(reduxDeals);

    const [stir, setStir] = useState("");
    const [docNum, setDocNum] = useState("");
    const [docDate, setDocDate] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        setDeals(reduxDeals);
        setOriginDeals(reduxDeals);
    }, [reduxDeals]);

    useEffect(() => {
    const pageType = pathname.startsWith("/sales")
        ? "sale"
        : pathname.startsWith("/purchase")
        ? "purchase"
        : "";

    // Contextga saqlaymiz (oldingi kod)
    change(pageType);

    // Shartnomalarni turiga qarab filtrlash
    const filteredDeals = reduxDeals.filter(d => d.dealType === pageType);

    setDeals(filteredDeals);
    setOriginDeals(filteredDeals);
}, [pathname, reduxDeals]);

    // Sana parse qilish (DD.MM.YYYY -> Date)
    const parseDate = (dateStr: string) => {
        if (!dateStr) return new Date(0);
        const [day, month, year] = dateStr.split(".");
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    const isSameDay = (d1: Date, d2: Date) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    // Barcha filterlarni birlashtiruvchi funksiya
    const applyFilters = () => {
        let filtered = [...originDeals];

        // Ochiq / yopiq filterlari
        if (filterType === "opening") {
            filtered = filtered.filter(d => Number(d.debit ?? 0) !== Number(d.dealSumm ?? 0));
        } else if (filterType === "closing") {
            filtered = filtered.filter(d => Number(d.debit ?? 0) === Number(d.dealSumm ?? 0));
        }

        // STIR
        if (stir.trim()) {
            filtered = filtered.filter(d => d.stir?.trim() === stir.trim());
        }

        // Raqam
        if (docNum.trim()) {
            filtered = filtered.filter(d => d.dealNum?.toString().trim() === docNum.trim());
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

    // Ochiq / yopiq / umumiy filter uchun
    const [filterType, setFilterType] = useState<"" | "opening" | "closing">("");

    const handleFilterType = (type: "" | "opening" | "closing") => {
        setFilterType(type);
    }

    const router = useRouter();

    const goToTurnovers = (dealId: number) => {
        router.push(`/contracts/${dealId}`);
    };

    return (
        <>
            <div className='w-full flex gap-2 justify-start py-2.5'>
                <div className='flex gap-2 justify-start'>
                    <div 
                        onClick={() => { handleFilterType(""); applyFilters(); }} 
                        tabIndex={0}        
                        className="px-2 py-0.5 inline-block focus:outline-2 focus:outline-red-400 border-2 border-[#6930c3] text-[16px] cursor-pointer"
                    >
                        Umumiy
                    </div>
                    <div 
                        onClick={() => { handleFilterType("opening"); applyFilters(); }} 
                        tabIndex={0}        
                        className="px-2 py-0.5 inline-block focus:outline-2 focus:outline-red-400 border-2 border-[#6930c3] text-[16px] cursor-pointer"
                    >
                        Ochiq
                    </div>
                    <div 
                        onClick={() => { handleFilterType("closing"); applyFilters(); }} 
                        tabIndex={0}        
                        className="px-2 py-0.5 inline-block focus:outline-2 focus:outline-red-400 border-2 border-[#6930c3] text-[16px] cursor-pointer"
                    >
                        Yopiq
                    </div>
                </div>

                {/* STIR */}
                <div className='flex rounded-[7px] items-center gap-1.5 border-2 border-[#6930c3] p-1'>
                    <input value={stir} onChange={e => setStir(e.target.value)} type="text" placeholder="STIR" className='w-36 text-[16px]' />
                    <button onClick={applyFilters}><FaFilter className='text-2xl text-[#6930c3]' /></button>
                </div>

                {/* Raqam */}
                <div className='flex rounded-[7px] items-center gap-1.5 border-2 border-[#6930c3] p-1'>
                    <input value={docNum} onChange={e => setDocNum(e.target.value)} type="text" placeholder="Raqam" className='w-36 text-[16px]' />
                    <button onClick={applyFilters}><FaFilter className='text-2xl text-[#6930c3]' /></button>
                </div>

                {/* Yagona sana */}
                <div className='flex rounded-[7px] items-center gap-1.5 border-2 border-[#6930c3] p-1'>
                    <input value={docDate} onChange={e => setDocDate(e.target.value)} type="date" className='w-36 text-[16px]' />
                    <button onClick={applyFilters}><FaFilter className='text-2xl text-[#6930c3]' /></button>
                </div>

                {/* Sana oralig'i */}
                <div className='flex rounded-[7px] items-center gap-1.5 border-2 border-[#6930c3] p-1'>
                    <input value={startDate} onChange={e => setStartDate(e.target.value)} type="date" className='w-36 text-[16px]' />
                    <input value={endDate} onChange={e => setEndDate(e.target.value)} type="date" className='w-36 text-[16px]' />
                    <button onClick={applyFilters}><FaFilter className='text-2xl text-[#6930c3]' /></button>
                </div>
            </div>

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
                    {deals.map(deal => (
                        <tr key={deal.id}
                        onClick={() => goToTurnovers(deal.id)}
                        >
                            <td className='border text-center'><input type="checkbox" className='scale-200' /></td>
                            <td className='border'>
                                <div className='flex'>
                                    <div className='w-[60%] pl-1.5 border-r py-2 overflow-hidden text-ellipsis whitespace-nowrap'>{deal.counteragent}</div>
                                    <div className='w-[40%] pl-1.5 py-2'>{deal.stir}</div>
                                </div>
                            </td>
                            <td className='border'>
                                <div className='flex'>
                                    <div className='w-[40%] pl-1.5 border-r py-2'>{deal.dealMazmun}</div>
                                    <div className='w-[20%] pl-1.5 border-r py-2'>{deal.dealNum}</div>
                                    <div className='w-[20%] pl-1.5 border-r py-2'>{deal.dealDate}</div>
                                    <div className='w-[20%] pl-1.5 py-2'>{deal.dealSumm}</div>
                                </div>
                            </td>
                            <td className='border'>
                                <div className='flex'>
                                    <div className='w-[33%] pl-1.5 border-r py-2'>{deal.debit}</div>
                                    <div className='w-[33%] border-r pl-1.5 py-2'>{deal.kredit}</div>
                                    <div className='w-[34%] pl-1.5 py-2'>{deal.debit - deal.kredit}</div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TableSection;
