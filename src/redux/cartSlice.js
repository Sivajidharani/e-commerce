import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const idx = state.items.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        state.items[idx].quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    incrementQty: (state, action) => {
      const idx = state.items.findIndex((i) => i.id === action.payload);
      if (idx >= 0) state.items[idx].quantity += 1;
    },
    decrementQty: (state, action) => {
      const idx = state.items.findIndex((i) => i.id === action.payload);
      if (idx >= 0) {
        if (state.items[idx].quantity > 1) {
          state.items[idx].quantity -= 1;
        } else {
          state.items.splice(idx, 1);
        }
      }
    },
  },
});

export const { addToCart, incrementQty, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;
