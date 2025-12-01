// store/features/deals/dealsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  agents: [
    {
        id: 0,
        countrAgent: "customer",
        countrAgentName: "GazProm",
        countrAgentStir: "710011944",
        countrAgentPhone: "+998979777474",
        countrAgentContractsCount: 4,
        countrAgentCFSumm: "12360000",
        countrAgentTotalContractsSum: "91424200"
    },
    {
        id: 1,
        countrAgent: "customer",
        countrAgentName: "OXU",
        countrAgentStir: "631441007",
        countrAgentPhone: "+998912662636",
        countrAgentContractsCount: 7,
        countrAgentCFSumm: "36421000",
        countrAgentTotalContractsSum: "66000000"
    },
  ]
};

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    addDeal: (state, action) => {
      // Yangi dealga avtomatik ID qo'shamiz
      const newDeal = {
        ...action.payload,
        id: state.agents.length > 0 ? Math.max(...state.agents.map(agent => agent.id)) + 1 : 1
      };
      state.agents.push(newDeal);
    },
    // Qo'shimcha reducerlar
    updateDeal: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const existingDeal = state.agents.find(agent => agent.id === id);
      if (existingDeal) {
        Object.assign(existingDeal, updatedData);
      }
    },
    deleteDeal: (state, action) => {
      state.agents = state.agents.filter(agent => agent.id !== action.payload);
    }
  }
});

export const { addDeal, updateDeal, deleteDeal } = agentsSlice.actions;

export default agentsSlice.reducer;