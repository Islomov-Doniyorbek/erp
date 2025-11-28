// store/features/deals/dealsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contracts: [
    {
      id: 0,
      counteragent: "GazProm",
      stir: "710011944",
      phone: "+998974114110",
      dealType: "sale",
      dealDate: "17.11.2025",
      dealNum: "4119",
      dealMazmun: "arenda",
      dealSumm: "60000000000",
      debit: 910000,
      kredit: 1000000,
      total: 90000
    },
    {
      id: 1,
      counteragent: "OXU",
      stir: "631441007",
      phone: "+998932662629",
      dealType: "sale",
      dealDate: "29.02.2024",
      dealNum: "2988",
      dealMazmun: "shprits",
      dealSumm: "410000",
      debit: 410000,
      kredit: 41000,
      total: 90000
    },
    {
      id: 2,
      counteragent: "GazProm",
      stir: "710011944",
      phone: "+998974114110",
      dealType: "sale",
      dealDate: "17.12.2025",
      dealNum: "4123",
      dealMazmun: "arenda",
      dealSumm: "72000",
      debit: 42000,
      kredit: 60000,
      total: 90000
    },
    {
      id: 3,
      counteragent: "ToshShaharTransXizmat MCHJ",
      stir: "778100041",
      phone: "+998776117172",
      dealType: "sale",
      dealDate: "20.11.2025",
      dealNum: "381",
      dealMazmun: "yoqilg'i",
      dealSumm: "63210000",
      debit: 36200000,
      kredit: 18400000,
      total: 90000
    },
    {
      id: 4,
      counteragent: "Toshkent Metropoliteni DUK",
      stir: "631100410",
      phone: "+998904101010",
      dealType: "sale",
      dealDate: "16.01.2025",
      dealNum: "97",
      dealMazmun: "maxsus buyurtmalar",
      dealSumm: 321000,
      debit: 321000,
      kredit: 321000,
      total: 90000
    },
    {
      id: 6,
      counteragent: "Buyuk Istanbul",
      stir: "917001003",
      phone: "+99897469902",
      dealType: "purchase",
      dealDate: "17.12.2025",
      dealNum: "96007",
      dealMazmun: "stul",
      dealSumm: "6320000",
      debit: 6320000,
      kredit: 4230000,
      total: 90000
    },
    {
      id: 7,
      counteragent: "Osiyo Nur",
      stir: "366600407",
      phone: "+998911111010",
      dealType: "purchase",
      dealDate: "08.08.2025",
      dealNum: "399",
      dealMazmun: "mahsulotlar",
      dealSumm: "6320000",
      debit: 3620000,
      kredit: 2980000,
      total: 90000
    },
    {
      id: 8,
      counteragent: "Osiyo Nur",
      stir: "366600407",
      phone: "+998911111010",
      dealType: "purchase",
      dealDate: "08.08.2025",
      dealNum: "403",
      dealMazmun: "mahsulotlar",
      dealSumm: "7100000",
      debit: 3620000,
      kredit: 10000,
      total: 90000
    },
    {
      id: 9,
      counteragent: "GazProm",
      stir: "163699211",
      phone: "+998944777474",
      dealType: "purchase",
      dealDate: "28.09.2024",
      dealNum: "13",
      dealMazmun: "alyumin sim",
      dealSumm: "12600000",
      debit: 12600000,
      kredit: 12600000,
      total: 90000
    },
    {
      id: 10,
      counteragent: "LukOil",
      stir: "100417978",
      phone: "+998911001210",
      dealType: "purchase",
      dealDate: "18.11.2025",
      dealNum: "19",
      dealMazmun: "dizel",
      dealSumm: "6321000",
      debit: 6321000,
      kredit: 0,
      total: 90000
    },
    {
      id: 11,
      counteragent: "LukOil",
      stir: "100417978",
      phone: "+998911001210",
      dealType: "purchase",
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
  name: "contracts",
  initialState,
  reducers: {
    addDeal: (state, action) => {
      // Yangi dealga avtomatik ID qo'shamiz
      const newDeal = {
        ...action.payload,
        id: state.contracts.length > 0 ? Math.max(...state.contracts.map(deal => deal.id)) + 1 : 1
      };
      state.contracts.push(newDeal);
    },
    // Qo'shimcha reducerlar
    updateDeal: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const existingDeal = state.contracts.find(deal => deal.id === id);
      if (existingDeal) {
        Object.assign(existingDeal, updatedData);
      }
    },
    deleteDeal: (state, action) => {
      state.contracts = state.contracts.filter(deal => deal.id !== action.payload);
    }
  }
});

export const { addDeal, updateDeal, deleteDeal } = dealsSlice.actions;

export default dealsSlice.reducer;