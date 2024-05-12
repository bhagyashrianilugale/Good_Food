import { RestauCart } from "./RestauCart";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link, json } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { withPromotedLabel } from "./RestauCart";
import { SWIGGY_URL } from "../utils/constant";
import { UserContext }from "../utils/UserContext";


const Body = () => {

  const [listOfRestaurants, setListOfRestaurants] = useState([]); // original list of restaurants

  const [filteredRestaurants, setFilteredfRestaurants] = useState([]); //make a copy of listOfRestaurants for searching/filtering restaurants

  const [searchText, setSearchText] = useState(" "); //search text for filtering restaurants

  const status = useOnline(); // to check if the user is online or not

  const RestaurantCartPromoted = withPromotedLabel(RestauCart); // to add the recommended label to the restaurant card

  const { loggedUser, SetUserName } = useContext(UserContext);

 // to get the data from the Swiggy's api

  useEffect(()=>{
     fetchData();
}, []);

const fetchData = async ()=>{

    const response = await fetch(SWIGGY_URL);
    const jsonData = await response.json();
    console.log(jsonData.data);


    setListOfRestaurants(
        jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setFilteredfRestaurants(
        jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
}
 
// to check if the user is online or not
  if (status === false) return <h1> You're in Offline mode !!! </h1>;

  return listOfRestaurants?.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="w-9/12 m-auto">
     
      <div className="flex items-center p-4 m-4">
        <div className=" rounded-l-2xl border-black">
          <input
            type="text"
            className="rounded-lg border border-black"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className=" p-2 m-2 font-semibold hover:text-orange-500"
            onClick={() => {
              const filtered = listOfRestaurants.filter((res) =>{
                return res.info.name.toLowerCase().includes(searchText.toLowerCase())
                }
              );
              setFilteredfRestaurants(filtered);
            }}
          >
            {/*Filter the RestaurantCard and update the util
                    for that we need search text */}
            Search{" "}
          </button>
        </div>

        <div className="filter">
          <button
            className="p-4 m-4 hover:text-orange-500 font-semibold"
            onClick={() => {
              const filteredList = listOfRestaurants?.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredfRestaurants(filteredList);
              console.log("button was clicked");
            }}
          >
            {" "}
            Top Rated Restaurant{" "}
          </button>
          <input
            type="text"
            className="rounded-lg border border-black"
            value={loggedUser}
            onChange={(e)=>{
               SetUserName(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap cursor-pointer ">
        {filteredRestaurants?.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {/* {if the restaurant is promoted then show promoted Restaurant card...} */}
            {
              restaurant.info.avgRating > 4 
              ? <RestauCart restauList={ restaurant }/>
              : <RestaurantCartPromoted restauList={ restaurant }/>
            }
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
