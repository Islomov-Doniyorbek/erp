'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from "@/store/store";
import { useM } from '@/app/context';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaFilter } from 'react-icons/fa';

const TableSection = () => {
    const { findPageTable, change } = useM();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const stirQuery = searchParams.get('stir');

    const reduxDeals = useSelector((state: RootState) => state.contracts.contracts);
    const agents = useSelector((state: RootState) => state.agents.agents);

    // --- Merge contracts with agent info ---
    const mergingContracts = reduxDeals.map(contract => {
        const agent = agents.find(a => a.id === contract.countrAgent)
        return {
            ...contract,
            countrAgentName: agent?.countrAgentName || "",
            countrAgentStir: agent?.countrAgentStir || ""
        }
    });

    // --- PageType ---
    const [originDeals, setOriginDeals] = useState(mergingContracts);
    const [deals, setDeals] = useState(mergingContracts);
    const [filterType, setFilterType] = useState<"" | "opening" | "closing">("");
    const [stir, setStir] = useState("");
    const [docNum, setDocNum] = useState("");
    const [docDate, setDocDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // --- Helper functions ---
    const parseDate = (dateStr: string) => {
        if (!dateStr) return new Date(0);
        const [day, month, year] = dateStr.split(".");
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    const isSameDay = (d1: Date, d2: Date) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    const goToTurnovers = (dealId: number) => {
        router.push(`/contracts/${dealId}`);
    };

    // --- Update originDeals on pathname or reduxDeals change ---
    useEffect(() => {
    const pageType = pathname.startsWith("/sales")
        ? "sale"
        : pathname.startsWith("/purchase")
        ? "purchase"
        : "";

    change(pageType);

    // Merge contracts with agents
    const merged = reduxDeals.map(contract => {
        const agent = agents.find(a => a.id === contract.countrAgent)
        return {
            ...contract,
            countrAgentName: agent?.countrAgentName || "",
            countrAgentStir: agent?.countrAgentStir || ""
        }
    });

    const filtered = merged.filter(d => d.dealType === pageType);
    setOriginDeals(filtered);
}, [pathname, reduxDeals, agents, change]);


    // --- Apply all filters automatically ---
    useEffect(() => {
        let filtered = [...originDeals];

        // Ochiq / yopiq filter
        if (filterType === "opening") {
            filtered = filtered.filter(d => Number(d.debit ?? 0) !== Number(d.dealSumm ?? 0));
        } else if (filterType === "closing") {
            filtered = filtered.filter(d => Number(d.debit ?? 0) === Number(d.dealSumm ?? 0));
        }

        // STIR
        if (stir.trim()) {
            filtered = filtered.filter(d => d.countrAgentStir?.trim() === stir.trim());
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
    }, [originDeals, filterType, stir, docNum, docDate, startDate, endDate]);

    const kontrAgent = findPageTable === "sale"
        ? "Xaridor va buyurtma beruvchi korxonalar"
        : findPageTable === "purchase"
        ? "Mol yetkazib beruvchi korxonalar"
        : "";

    return (
        <>
            <div className='w-full flex gap-2 justify-start py-2.5'>
                {/* Filter buttons */}
                <div className='flex gap-2'>
                    <button onClick={() => setFilterType("")} className="px-2 py-0.5 border-2 border-[#6930c3] text-[16px]">Umumiy</button>
                    <button onClick={() => setFilterType("opening")} className="px-2 py-0.5 border-2 border-[#6930c3] text-[16px]">Ochiq</button>
                    <button onClick={() => setFilterType("closing")} className="px-2 py-0.5 border-2 border-[#6930c3] text-[16px]">Yopiq</button>
                </div>

                {/* STIR */}
                <div className='flex items-center gap-1.5 border-2 border-[#6930c3] p-1 rounded-[7px]'>
                    <input type="text" value={stir} onChange={e => setStir(e.target.value)} placeholder="STIR" className='w-36 text-[16px]' />
                    <FaFilter className='text-2xl text-[#6930c3]' />
                </div>

                {/* Raqam */}
                <div className='flex items-center gap-1.5 border-2 border-[#6930c3] p-1 rounded-[7px]'>
                    <input type="text" value={docNum} onChange={e => setDocNum(e.target.value)} placeholder="Raqam" className='w-36 text-[16px]' />
                    <FaFilter className='text-2xl text-[#6930c3]' />
                </div>

                {/* Yagona sana */}
                <div className='flex items-center gap-1.5 border-2 border-[#6930c3] p-1 rounded-[7px]'>
                    <input type="date" value={docDate} onChange={e => setDocDate(e.target.value)} className='w-36 text-[16px]' />
                    <FaFilter className='text-2xl text-[#6930c3]' />
                </div>

                {/* Sana oralig'i */}
                <div className='flex items-center gap-1.5 border-2 border-[#6930c3] p-1 rounded-[7px]'>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className='w-36 text-[16px]' />
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className='w-36 text-[16px]' />
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
                    {deals.map(deal => (
                        stirQuery ? (
                            stirQuery == deal.countrAgentStir ? (<tr key={deal.id} onClick={() => goToTurnovers(deal.id)} className="cursor-pointer hover:bg-gray-100">
                            <td className='border text-center'><input type="checkbox" className='scale-200' /></td>
                            <td className='border'>
                                <div className='flex'>
                                    <div className='w-[60%] pl-1.5 border-r py-2 overflow-hidden text-ellipsis whitespace-nowrap'>{deal.countrAgentName}</div>
                                    <div className='w-[40%] pl-1.5 py-2'>{deal.countrAgentStir}</div>
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
                        </tr> ) : null
                        ) : (
                            <tr key={deal.id} onClick={() => goToTurnovers(deal.id)} className="cursor-pointer hover:bg-gray-100">
                            <td className='border text-center'><input type="checkbox" className='scale-200' /></td>
                            <td className='border'>
                                <div className='flex'>
                                    <div className='w-[60%] pl-1.5 border-r py-2 overflow-hidden text-ellipsis whitespace-nowrap'>{deal.countrAgentName}</div>
                                    <div className='w-[40%] pl-1.5 py-2'>{deal.countrAgentStir}</div>
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
                        )
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TableSection;
