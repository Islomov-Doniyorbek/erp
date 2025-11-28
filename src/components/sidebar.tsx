'use client'
import { useM } from '@/app/context'
import Link from 'next/link'
import React from 'react'
import { FaUser, FaUserAlt } from 'react-icons/fa'
import { FaUserClock } from 'react-icons/fa6'
import { FiRepeat, FiShoppingBag, FiShoppingCart, FiUsers } from 'react-icons/fi'
import { MdDashboard, MdPointOfSale } from 'react-icons/md'

const Sidebar = () => {
    const pages = [
        {
            id:0,
            title: "Dashboard",
            icon: <MdDashboard/>,
            path: "/",
            findTable: ""
        },
        {
            id:1,
            title: "Sotuvlar",
            icon: <MdPointOfSale/>,
            path: "/sales",
            findTable: "sale"
        },
        {
            id:2,
            title: "Xaridlar",
            icon: <FiShoppingBag/>,
            path: "/purchases",
            findTable: "purchase"
        },
        {
            id:3,
            title: "Hisob faktura",
            icon: <FiRepeat/>,
            path: "/countFactures",
            findTable: "sale"
        },
        {
            id:4,
            title: "Agentlar",
            icon: <FiUsers/>,
            path: "/",
            findTable: "sale"
        },
    ]
    const {change} = useM()
  return (
    <div className="w-24 bg-[#6930C3] text-white p-4">
        {
            pages.map(page=>(
                <Link 
                key={page.id}
                onClick={() => change(page.findTable)}
                className='flex flex-col items-center gap-2 my-5'
                href={page.path}>
                    <span className='text-4xl'>{page.icon}</span>
                    <span>{page.title}</span>
                </Link>
            ))
        }
    </div>
  )
}

export default Sidebar
