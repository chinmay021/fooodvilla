import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";


const store = configureStore({
    reducer: {
        //name of slice : slice
        cart : cartSlice,
    }

});


export default store;



/** 
 * Create Store
 *  - configureStore() - RTK
 * 
 * Provide my store to app
 *  - <Provider store={store}> - import form react-redux
 * 
 * Slice
 * -RTK - createSlice({
 *         name: ""
 *         initialState:
 *          reducers: {
 *              addItem: ()=>{
 *               state.action.payload}         
 *          }         
 *         })
 *         export const { addItem, removeItem} = cartSlice.actions;
 *         export default cartSlice.reducer;
 * 
 * put that Slice into Store
 *          {
 *             reducer :{
 *                  cart : cartSlice,
 *                  user : userSlice,
 *              }
 *          }
 */