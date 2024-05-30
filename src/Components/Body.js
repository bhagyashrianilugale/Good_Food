import { RestaurantCard } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { withPromotedLabel } from "./RestaurantCard";
import { SWIGGY_URL } from "../utils/constant";
import { UserContext }from "../utils/UserContext";
import Mind from "./Mind";


const Body = () => {

  const [listOfRestaurants, setListOfRestaurants] = useState([]); // original list of restaurants

  const [filteredRestaurants, setFilteredfRestaurants] = useState([]); //make a copy of listOfRestaurants for searching/filtering restaurants

  const [searchText, setSearchText] = useState(" "); //search text for filtering restaurants

  const [ mindItems, setMindItems ] = useState([]);

  const status = useOnline(); // to check if the user is online or not

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard); // to add the recommended label to the restaurant card

  const { loggedUser, SetUserName } = useContext(UserContext);

 // to get the data from the Swiggy's api

 useEffect(()=>{
     fetchData();
}, []);

const fetchData = async ()=>{

    const response = await fetch(SWIGGY_URL);
    const jsonData = await response.json();

    setListOfRestaurants(
        jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    setFilteredfRestaurants(
        jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    setMindItems(
      jsonData?.data?.cards[0]?.card?.card?.imageGridCards
    )

}
 
// to check if the user is online or not
  if (status === false) return <h1 className="m-auto font-bold"> You're in Offline mode !!! </h1>;

  return listOfRestaurants?.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="w-10/12 m-auto">
      <div className="p-4 my-8 h-80 bg-gradient-to-t from-violet-300 rounded-3xl">
        <div className="flex justify-around">
        <div className=" rounded-l-2xl border-black">
          <input
            type="text"
            className="rounded-lg border border-black w-80 h-10  bg-green-50"
            placeholder="Search restaurant here..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className=" p-2 m-2 font-semibold hover:text-orange-500"
            onClick={() => {
              const filtered = listOfRestaurants.filter((res) =>{
                 const text = searchText.toLowerCase();
                 console.log(text);
                 return res?.info?.name?.toLowerCase().includes(text);
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
         
          <input
            type="text"
            className="rounded-lg border border-black w-80 h-10  bg-green-50"
            value={loggedUser}
            onChange={(e)=>{
               SetUserName(e.target.value);
            }}
          />
           <button
            className="p-4 m-1 hover:text-orange-500 font-semibold"
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
          </div>
        </div>
        <div className="flex justify-around mt-10">
             <h1 className="text-4xl  font-extrabold">Order Food <br/>
                 Online in <br/>
                 Nashik</h1>
            <div className="h-80 w-80">
               <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1002,h_600/v1678428358/portal/m/seo_web/dweb_header.png"></img>
            </div>
          </div>
      </div>
     
      <Mind mindItemsData = {mindItems}/>

      <div className="flex flex-wrap cursor-pointer ">
        {filteredRestaurants?.map((restaurant) => (
          <Link
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
        ))}
      </div>
    </div>
  );
};
export default Body;
