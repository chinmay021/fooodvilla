import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItemCount: 0,
  },
  reducers: {
    //action : reducer function(state, actionPayload){}
    addItem: (state, action) => {
      // the data we passed on click of add to cart is recieved in action.payload
    //   state.items.push(action.payload);
        const itemInCart = state.items.find(item => item.id === action.payload.id);
        itemInCart ? itemInCart.quantity++ : state.items.push({...action.payload, quantity: 1})
        state.totalItemCount++;
    },
    decreamentItem: (state, action) => {
      const itemInCart = state.items.find(item => item.id === action.payload.id);
      if(!itemInCart) return;
      if(itemInCart.quantity === 1){
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }else{
        itemInCart.quantity--;
      }
      state.totalItemCount--;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      state.totalItemCount--;
    }
    ,
    clearCart: (state) => {
      state.items = [];
      state.totalItemCount = 0;
    },
  },
});

export const { addItem, decreamentItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
