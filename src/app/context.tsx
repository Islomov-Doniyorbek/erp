'use client'
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react'

type MenuContextType = {
  findPageTable: string;
  change: (p: string) => void
}

export const Mcontext = createContext<MenuContextType | undefined>(undefined)

const MProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const pathname = usePathname()
      // const {change} = useM()
      // useEffect(()=>{
      //     change(pathname.startsWith("/sales") ? "sale" : pathname.startsWith("purchase") ? "purchase" : "")
      // }, [])
  const [findPageTable, setFindPageTable] = useState(pathname.startsWith("/sales") ? "sale" : pathname.startsWith("purchase") ? "purchase" : "")


  const change = (p: string) => {
    setFindPageTable(p)
  }
  return (
    <Mcontext.Provider
    value={
      {
        change, findPageTable
      }
    }
    >
      {children}
    </Mcontext.Provider>
  )
}

export const useM = () => {
  const ctx = useContext(Mcontext)
  if (!ctx) throw new Error('useM faqat MProvider ichida ishlatiladi')
  return ctx
}

export default MProvider
