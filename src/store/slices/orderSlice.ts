import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  amount: number;
  items: Item[];
}
interface Item {
  id: number;
  name: string;
  ownerName: string;
  ownerId: number;
  cost: number;
}
export const initialState: OrderState = {
  amount: 0,
  items: [],
};
interface AddServicePayload {
  item: Item;
}

interface RemoveServicePayload {
  id: number;
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addService(state, action: PayloadAction<AddServicePayload>) {
      const itemExists = state.items.some(
        (item) => item.id === action.payload.item.id
      );
      if (!itemExists) {
        state.amount = (state.amount ?? 0) + 1;
        state.items.push(action.payload.item);
      }
    },
    removeService(state, action: PayloadAction<RemoveServicePayload>) {
      state.amount = (state.amount ?? 0) - 1;
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    removeOrder(state) {
      state.amount = 0;
      state.items = [];
    },
  },
});

export const { addService, removeService, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
