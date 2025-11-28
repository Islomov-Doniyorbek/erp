// store/features/deals/dealsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  circumferences: [
    {
      id: 0,
      docType: "in",
      docDate: "19.11.2025",
      docNum: "17994-440",
      summa: "400000"
    },
  ]
};

const documentsSlice = createSlice({
  name: "Sdeals",
  initialState,
  reducers: {
    addDeal: (state, action) => {
      // Yangi dealga avtomatik ID qo'shamiz
      const newDeal = {
        ...action.payload,
        id: state.circumferences.length > 0 ? Math.max(...state.circumferences.map(deal => deal.id)) + 1 : 1
      };
      state.circumferences.push(newDeal);
    },
    // Qo'shimcha reducerlar
    updateDeal: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const existingDeal = state.circumferences.find(deal => deal.id === id);
      if (existingDeal) {
        Object.assign(existingDeal, updatedData);
      }
    },
    deleteDeal: (state, action) => {
      state.circumferences = state.circumferences.filter(deal => deal.id !== action.payload);
    }
  }
});

export const { addDeal, updateDeal, deleteDeal } = documentsSlice.actions;

export default documentsSlice.reducer;