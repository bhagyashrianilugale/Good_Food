import { RestaurantCard } from "./RestaurantCard";
import { useEffect, useContext } from "react";
import { Shimmer1 } from "./Shimmer";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { withPromotedLabel } from "./RestaurantCard";
import { SWIGGY_URL } from "../utils/constant";
import { UserContext }from "../utils/UserContext";
import Mind from "./Mind";
import Toprestaurantchain from "./Toprestaurantchain";
import { addMindItems, addfilteredRestaurants, addlistOfRestaurants, updateSearchText } from "../utils/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import { BG_IMG_URL } from "../utils/constant";


const Body = () => {

  const dispatch = useDispatch();
  // Subscribing to the store using a selector
  const {listOfRestaurant, filteredRestaurant, restaurantSearchText}= useSelector((store)=>store.restaurant);
  const mindItem = useSelector((store)=>store.restaurant. mindItems);
  const status = useOnline(); // To check if the user is online or not
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard); // TO add the recommended label to the restaurant card
  const { loggedUser, SetUserName } = useContext(UserContext);
  console.log(mindItem);
  useEffect(()=>{
     fetchData();
  }, []);

  const fetchData = async ()=>{
      // To get the data from the Swiggy's api
      const response = await fetch(SWIGGY_URL);
      const jsonData = await response.json();
      // Dispatch action to add original list of restaurants on Reduxstore
      dispatch(addlistOfRestaurants(jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants));
      // Dispatch action to add copy of listOfRestaurants for searching/filtering restaurants on Reduxstore
      dispatch(addfilteredRestaurants(jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants));
      // Dispathc action to add mindItems on Reduxstore
      dispatch(addMindItems(jsonData?.data?.cards[0]?.card?.card?.imageGridCards?.info));
    
}
 
  // To check if the user is online or not
  if (status === false) return <h1 className="m-auto font-bold"> You're in Offline mode !!! </h1>;

  return listOfRestaurant?.length == undefined ? (
    <Shimmer1 />
  ) : (
    <>
    <div className="w-11/12 m-auto">
      <div className="p-4 my-8 h-80 bg-gradient-to-t from-violet-300 rounded-3xl">
        <div className="flex justify-around">
        <div className=" rounded-l-2xl border-black">
          <input
            type="text"
            className="rounded-lg border border-black w-80 h-10 text-center bg-green-50"
            placeholder="Search restaurant here..."
            value={ restaurantSearchText }
            onChange={(e) => dispatch(updateSearchText(e.target.value))}
          />
          <button
            className=" p-2 m-2 font-semibold hover:text-orange-500"
            onClick={() => {
              const text = restaurantSearchText.toLowerCase();
              {/*Filter the RestaurantCard and update the util for that we need search text */}
              const filtered = listOfRestaurant?.filter((res) =>{
                if( res?.info?.name.toLowerCase().includes(text) ){
                  return res;
                }
               }
              );
              dispatch(addfilteredRestaurants(filtered));
            }}>
            Search{" "}
          </button>
       </div>

      <div className="filter">
          <input
            type="text"
            className="rounded-lg border border-black w-80 h-10 text-center bg-green-50"
            value={loggedUser}
            onChange={(e)=>{
               SetUserName(e.target.value);
            }}
          />
           <button
            className="p-4 m-1 hover:text-orange-500 font-semibold"
            onClick={() => {
              const filteredList = listOfRestaurant?.filter(
                (res) => res.info.avgRating > 4
              );
              dispatch(addfilteredRestaurants(filteredList));
              console.log("button was clicked");
            }}
          >
            {" "}
            Top Rated Restaurant{" "}
          </button>
          </div>
        </div>
        <div className="flex justify-around mt-10">
             <h1 className="text-4xl  font-extrabold">Order Food <br/>
                 Online in <br/>
                 Nashik</h1>
            <div className="h-80 w-80">
               <img src={ BG_IMG_URL }></img>
            </div>
          </div>
      </div>
        <h1 className="font-bold text-2xl">What's on your mind?</h1>
      <div  className="flex overflow-x-scroll no-scrollbar m-6 p-4">
              {mindItem?.map((item, index)=><Mind key = { index } imageId = {item.imageId} itemLink = {item.action.link}/>)}
      </div>
      <h1 className="font-bold text-2xl my-8">Restaurants with online food delivery in Nashik</h1>
      <div className=" flex flex-wrap cursor-pointer ">
        {filteredRestaurant?.map((restaurant) => {
          return <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            
            {/* {if the restaurant is promoted then show promoted Restaurant card...} */}
            {
              restaurant.info.avgRating > 4.3
              ? <RestaurantCardPromoted restauList={ restaurant }/>
              : <RestaurantCard restauList={ restaurant }/> 
            }
          </Link>
        })}
      </div>
      <Toprestaurantchain/>
    </div>
  </>
  );
};
export default Body;
