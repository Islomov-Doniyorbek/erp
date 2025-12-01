import { configureStore } from "@reduxjs/toolkit";
import boolsReducer from "./features/bools/isBool";
import dealsSlice from "./features/deals/dealSale";
import dealsPurchaseReducer from "./features/deals/dealPurchase";
import documentsSlice from "./features/deals/dealSaleExchanges";
import documentSlice from "./features/deals/documents";
import agentsSlice from "./features/deals/agents"

export const store = configureStore({
    reducer: {
        bools: boolsReducer,
        contracts: dealsSlice,
        SDealsDocuments: documentsSlice,
        documents: documentSlice,
        agents: agentsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
