import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], 
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
  const newItem = action.payload;
  const existingItem = state.items.find(item => item.serviceId === newItem.serviceId);

  if (existingItem) {
    existingItem.quantity += 1;
    state.totalQuantity += 1;
    state.totalPrice += newItem.price;
  } else {
    state.items.push({ ...newItem, quantity: 1 }); // 👈 đảm bảo có quantity
    state.totalQuantity += 1;
    state.totalPrice += newItem.price;
  }
}
,

    removeFromCart: (state, action) => {
      const id = Number(action.payload);
      console.log("State items:", state.items);
console.log("ID to remove:", id);
      const itemToRemove = state.items.find(item => item.serviceId  === id);
      if (!itemToRemove) return;

      state.totalQuantity -= itemToRemove.quantity;
      state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
      state.items = state.items.filter(item => item.serviceId  !== id);
    },

    updateQuantity: (state, action) => {
  const { id, quantity } = action.payload;
  const item = state.items.find(item => item.serviceId === id);
  if (item && typeof item.quantity === 'number' && quantity > 0) {
    const diff = quantity - item.quantity;
    item.quantity = quantity;
    state.totalQuantity += diff;
    state.totalPrice += diff * item.price;
  }
},

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
