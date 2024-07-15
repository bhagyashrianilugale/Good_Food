import { RestaurantCard } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const MindItemCollection = () => {
   const { resId, itemName } = useParams();
   const [mindItem, setMindItem] = useState();
   const [allItem, setAllItems] = useState();
   const [filteredMindItems, setFilteredMindItems] = useState();
   const [filterState, setFilterState] = useState({
      lessThan40Mins: false,
      rs300To600: false,
      lessThanRs300: false,
   });

   const getMindItems = async () => {
      const response = await fetch(
         "https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D18.61610%26lng%3D73.72860%26collection%3D" +
            resId +
            "%26tags%3Dlayout_CCS_" +
            itemName +
            "%26sortBy%3D%26filters%3D%26type%3Drcv2%26offset%3D0%26page_type%3Dnull"
      );
      const json = await response.json();
      setAllItems(json?.data?.cards);
      const items = await json?.data?.cards?.filter(
         (i) => i?.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
      );
      setFilteredMindItems(items);
      setMindItem(items);
   };

   const handleCross = (filterKey) => {
      setFilterState((prevState) => ({ ...prevState, [filterKey]: false }));
      setMindItem(filteredMindItems);
   };

   const applyFilter = (filterKey, filterFunction) => {
      const items = filterFunction();
      if (items?.length) {
         setMindItem(items);
         setFilterState((prevState) => ({ ...prevState, [filterKey]: true }));
      }
   };

   useEffect(() => {
      getMindItems();
   }, []);

   return mindItem?.length == undefined ? (
      <Shimmer />
   ) : (
      <>
         <div className="mt-[12%] mx-20">
            <h2 className="text-4xl px-2 font-bold opacity-80 ">{allItem[0].card.card.title}</h2>
            <p className="text-lg px-2 my-4 opacity-80">{allItem[0].card.card.description}</p>
         </div>
         <div className="flex justify-around w-6/12 mx-10">
            <div className="px-2 cursor-pointer text-center mx-2 my-1 text-white bg-orange-400 h-8 active:bg-orange-200 rounded-xl flex flex-between">
               <p
                  onClick={() => applyFilter('lessThan40Mins', () => 
                                    allItem?.filter((itemInfo) => itemInfo?.card?.card?.info?.sla?.slaString?.slice(0, 2) < 40))}
               >
                  Less than 40mins
               </p>
               {filterState.lessThan40Mins && (
                  <span onClick={() => handleCross('lessThan40Mins')} className="mx-2 my-1 text-lg">
                     <RxCross1 />
                  </span>
               )}
            </div>

            <div className="px-2 cursor-pointer text-center mx-2 my-1 text-white bg-orange-400 h-8 active:bg-orange-200 rounded-xl flex flex-between">
               <p
                  onClick={() => applyFilter('rs300To600', () => 
                                              allItem?.filter((itemInfo) =>(itemInfo?.card?.card?.info?.costForTwo?.slice(1, 4) > 300)
                                                                           &&  (itemInfo?.card?.card?.info?.costForTwo?.slice(1, 4) < 600)))}
               >
                  Rs.300-Rs.600
               </p>
               {filterState.rs300To600 && (
                  <span onClick={() => handleCross('rs300To600')} className=" mx-2 my-1 text-lg">
                     <RxCross1 />
                  </span>
               )}
            </div>

            <div className="px-2 cursor-pointer text-center mx-2 my-1 text-white bg-orange-400 h-8 active:bg-orange-200 rounded-xl flex flex-between">
               <p
                  onClick={() => applyFilter('lessThanRs300', () => 
                                               allItem?.filter((itemInfo) => itemInfo?.card?.card?.info?.costForTwo?.slice(1, 4) < 300))}
               >
                  Less than Rs.300
               </p>
               {filterState.lessThanRs300 && (
                  <span onClick={() => handleCross('lessThanRs300')} className="mx-2 my-1 text-lg">
                     <RxCross1 />
                  </span>
               )}
            </div>
         </div>

         <p className="text-2xl px-2 font-bold opacity-90 mx-20 my-4">Restaurants to explore</p>
         <div className="flex flex-wrap mx-[5%]">
            {mindItem?.map((itemInfo, index) =>(
               <Link key={index} to={"/restaurants/" + resId}>
                  <RestaurantCard restauList={itemInfo?.card?.card} />
               </Link>
             ))}
         </div>
      </>
   );
};

export default MindItemCollection;
