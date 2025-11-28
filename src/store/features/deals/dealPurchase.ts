// store/features/deals/dealsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deals: [
    {
      id: 0,
      counteragent: "Buyuk Istanbul",
      stir: "917001003",
      phone: "+99897469902",
      dealDate: "17.12.2025",
      dealNum: "96007",
      dealMazmun: "stul",
      dealSumm: "6320000",
      debit: 6320000,
      kredit: 4230000,
      total: 90000
    },
    {
      id: 1,
      counteragent: "Osiyo Nur",
      stir: "366600407",
      phone: "+998911111010",
      dealDate: "08.08.2025",
      dealNum: "399",
      dealMazmun: "mahsulotlar",
      dealSumm: "6320000",
      debit: 3620000,
      kredit: 2980000,
      total: 90000
    },
    {
      id: 2,
      counteragent: "Osiyo Nur",
      stir: "366600407",
      phone: "+998911111010",
      dealDate: "08.08.2025",
      dealNum: "403",
      dealMazmun: "mahsulotlar",
      dealSumm: "7100000",
      debit: 3620000,
      kredit: 10000,
      total: 90000
    },
    {
      id: 3,
      counteragent: "OKMK",
      stir: "163699211",
      phone: "+998944777474",
      dealDate: "28.09.2024",
      dealNum: "13",
      dealMazmun: "alyumin sim",
      dealSumm: "12600000",
      debit: 12600000,
      kredit: 12600000,
      total: 90000
    },
    {
      id: 4,
      counteragent: "LukOil",
      stir: "100417978",
      phone: "+998911001210",
      dealDate: "18.11.2025",
      dealNum: "19",
      dealMazmun: "dizel",
      dealSumm: "6321000",
      debit: 6321000,
      kredit: 0,
      total: 90000
    },
    {
      id: 5,
      counteragent: "LukOil",
      stir: "100417978",
      phone: "+998911001210",
      dealDate: "19.11.2025",
      dealNum: "20",
      dealMazmun: "salyarka",
      dealSumm: "32100",
      debit: 32100,
      kredit: 16300,
      total: 90000
    },
  ]
};

const dealsSlice = createSlice({
  name: "Pdeals",
  initialState,
  reducers: {
    addDeal: (state, action) => {
      // Yangi dealga avtomatik ID qo'shamiz
      const newDeal = {
        ...action.payload,
        id: state.deals.length > 0 ? Math.max(...state.deals.map(deal => deal.id)) + 1 : 1
      };
      state.deals.push(newDeal);
    },
    // Qo'shimcha reducerlar
    updateDeal: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const existingDeal = state.deals.find(deal => deal.id === id);
      if (existingDeal) {
        Object.assign(existingDeal, updatedData);
      }
    },
    deleteDeal: (state, action) => {
      state.deals = state.deals.filter(deal => deal.id !== action.payload);
    }
  }
});

export const { addDeal, updateDeal, deleteDeal } = dealsSlice.actions;

export default dealsSlice.reducer;