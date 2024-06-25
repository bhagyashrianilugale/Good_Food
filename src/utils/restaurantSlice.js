import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: "restaurant",

    initialState : {
          listOfRestaurant: null,
          filteredRestaurant: null,
          filteredMindItems: null,
          mindItems: null,
          restaurantSearchText: "",
          showItemIndex: null,
    },

    reducers: {
        addlistOfRestaurants: (state, action)=>{
            state.listOfRestaurant = action.payload;
        },

       addfilteredRestaurants: (state, action)=>{
            state.filteredRestaurant = action.payload;
       },

       addMindItems: (state, action)=>{
           state.mindItems = action.payload;
       },

       addfilteredMindItems: (state, action)=>{
        state.filteredMindItems = action.payload;
      },
       
       updateSearchText: (state, action)=>{
           state.restaurantSearchText = action.payload;
       },

       addShowItemIndex: (state, action)=>{
            state.showItemIndex = action.payload;
       },
       
       removeShowItemIndex: (state, action)=>{
           state.showItemIndex = null;
       }
    }

});


export const { addlistOfRestaurants, addfilteredRestaurants,  addMindItems, addfilteredMindItems, updateSearchText, addShowItemIndex, removeShowItemIndex } = restaurantSlice.actions;

export default restaurantSlice.reducer;