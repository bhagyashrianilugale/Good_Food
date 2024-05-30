import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",

    initialState: {
        items: []
    },

    reducers: {
        addItem : (state, action)=>{

            //Mutating state here
            state.items.push(action.payload); 
        },

        removeItem : (state, action)=>{

           //Mutating state here
           state.items.pop();
        },

        clearItem : (state, action)=>{
            
            //Mutating state here
            state.items.length = 0;
        },
    }

});

export const { addItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;