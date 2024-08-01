import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchText, addfilteredRestaurants, removeSearchText } from "../utils/restaurantSlice";
import { IoSearchOutline } from "react-icons/io5";



const Search = () => {

  const dispatch = useDispatch();

  // Subscribing to the store using a selector
 const {listOfRestaurant, restaurantSearchText}= useSelector((store)=>store.restaurant);

 return (
     <>
        <div className="flex w-60 mx-10 lg:mx-4 border border-orange-500 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl focus-within:shadow-lg">
                        <input
                            type="text"
                            className="h-10 w-50 px-2 text-center outline-none rounded-l-xl"
                            placeholder="Search restaurant here..."
                            value={ restaurantSearchText }
                            onChange={(e) => {
                                 dispatch(updateSearchText(e.target.value))
                                }}
                        />
                        <button
                              className="p-2 m-0"
                              onClick={() => {
                                  let text = restaurantSearchText.toLowerCase();
                                          {/*Filter the RestaurantCard and update the util for that we need search text */}
                                           const filtered = listOfRestaurant?.filter((res) =>{
                                          if( res?.info?.name.toLowerCase().includes(text)){
                                                     return res;
                                            }
                                           });
                                 filtered?.length ? dispatch(addfilteredRestaurants(filtered)) :  dispatch(addfilteredRestaurants(listOfRestaurant));
                             dispatch(removeSearchText(""));
                      }}>
                      <IoSearchOutline />{" "}
                   </button>  
               </div> 
      </>
  )
}

export default Search;
