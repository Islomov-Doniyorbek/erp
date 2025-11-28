// store/features/deals/dealsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents: [
    {
        id: 0,
        dealId: 9,
        cftype: "invoice",
        dNum: 14,
        ddate: "12.11.2025",
        totalSum: 40000000000,
        qqs: 12400
    },
    {
        id: 1,
        dealId: 1,
        cftype: "payment",
        dNum: 14,
        ddate: "12.11.2025",
        totalSum: 263000,
        qqs: 0
    },
    {
        id: 2,
        dealId: 1,
        cftype: "invoice",
        dNum: 132,
        ddate: "12.11.2025",
        totalSum: 362000,
        qqs: 12400
    },
    {
        id: 3,
        dealId: 6,
        cftype: "invoice",
        dNum: 936,
        ddate: "09.12.2025",
        totalSum: 693200,
        qqs: 0
    },
    {
        id: 4,
        dealId: 9,
        cftype: "payment",
        dNum: '14-2',
        ddate: "12.11.2025",
        totalSum: 32000,
        qqs: 0
    },
    {
        id: 5,
        dealId: 9,
        cftype: "payment",
        dNum: '14-3',
        ddate: "14.11.2025",
        totalSum: 169000,
        qqs: 0
    },
    {
        id: 6,
        dealId: 9,
        cftype: "invoice",
        dNum: '14-4',
        ddate: "19.11.2025",
        totalSum: 421000,
        qqs: 0
    },
  ]
};

const documentSlice = createSlice({
  name: "Sdeals",
  initialState,
  reducers: {
    addDeal: (state, action) => {
      // Yangi dealga avtomatik ID qo'shamiz
      const newDeal = {
        ...action.payload,
        id: state.documents.length > 0 ? Math.max(...state.documents.map(deal => deal.id)) + 1 : 1
      };
      state.documents.push(newDeal);
    },
    // Qo'shimcha reducerlar
    updateDeal: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const existingDeal = state.documents.find(deal => deal.id === id);
      if (existingDeal) {
        Object.assign(existingDeal, updatedData);
      }
    },
    deleteDeal: (state, action) => {
      state.documents = state.documents.filter(deal => deal.id !== action.payload);
    }
  }
});

export const { addDeal, updateDeal, deleteDeal } = documentSlice.actions;

export default documentSlice.reducer;