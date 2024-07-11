import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: "restaurant",

    initialState : {
          listOfRestaurant: null,
          filteredRestaurant: null,
          mindItems: null,
          restaurantSearchText: "",
          showItemIndex: "0",
          showHiddenUI : false,
          menuCategory : ""
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

         addMenuCategory: (state, action)=>{
         state.menuCategory = action.payload;
        },

        updateSearchText: (state, action)=>{
           state.restaurantSearchText = action.payload;
        },
 
         removeSearchText: (state, action)=>{
           state.restaurantSearchText = action.payload;
        },
       
         updateShowList: (state, action)=>{
          state.showHiddenUI= action.payload;
        },

         addShowItemIndex: (state, action)=>{
            state.showItemIndex = action.payload;
       },
       
         removeShowItemIndex: (state)=>{
           state.showItemIndex = null;
       }
    }

});


export const { addlistOfRestaurants, 
               addfilteredRestaurants,  
               addMindItems,
               addMenuCategory, 
               updateSearchText,
               removeSearchText,
               updateShowList,
               addShowItemIndex, 
               removeShowItemIndex} = restaurantSlice.actions;

export default restaurantSlice.reducer;