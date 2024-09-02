import { RestaurantCard } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoFastFoodSharp } from "react-icons/io5";

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
         <div className="mt-[36%] sm:mt-[20%] md:mt-[12%] text-center">
            <h2 className="text-3xl sm:text-4xl font-bold opacity-90">
                {allItem[0].card.card.title} <IoFastFoodSharp  className="inline mx-2 my-1"/>
            </h2>
            <i className="text-sm text-orange-500 underline sm:text-lg my-4 opacity-80">
                   &quot; {allItem[0].card.card.description} &quot;</i>
         </div>
         <p className="text-xl sm:text-3xl md:px-4 md:py-1 font-bold opacity-90 text-center my-4">Restaurants to explore</p>
         <div className="flex text-xs sm:text-lg justify-around w-full md:w-6/12 py-2 mx-auto">
            <button className="rounded-xl h-8 py-1 sm:py-0 sm:px-2 bg-white shadow-sm border-2 border-black w-min-40 flex">
               <p
                  className="px-1"
                  onClick={() => applyFilter('lessThan40Mins', () => 
                                    allItem?.filter((itemInfo) => itemInfo?.card?.card?.info?.sla?.slaString?.slice(0, 2) < 40))}
               >
                  Less than 40mins
               </p>
               {filterState.lessThan40Mins && (
                  <span onClick={() => handleCross('lessThan40Mins')}>
                     <RxCross1 className="p-1 sm:p-0 sm:pt-2  text-xl"/>
                  </span>
               )}
            </button>

            <button className="rounded-xl h-8 py-1 sm:py-0  sm:px-2 bg-white shadow-sm border-2 border-black w-min-40 flex">
               <p
                  className="px-1"
                  onClick={() => applyFilter('rs300To600', () => 
                                              allItem?.filter((itemInfo) =>(itemInfo?.card?.card?.info?.costForTwo?.slice(1, 4) > 300)
                                                                           &&  (itemInfo?.card?.card?.info?.costForTwo?.slice(1, 4) < 600)))}
               >
                  Rs.300-Rs.600
               </p>
               {filterState.rs300To600 && (
                  <span onClick={() => handleCross('rs300To600')}>
                     <RxCross1 className="p-1 sm:p-0 sm:pt-2 text-xl"/>
                  </span>
               )}
            </button>

            <button className="rounded-xl h-8 py-1 sm:py-0  sm:px-2 bg-white shadow-sm border-2 border-black w-min-40 flex">
               <p
                  className="px-1"
                  onClick={() => applyFilter('lessThanRs300', () => 
                                               allItem?.filter((itemInfo) => itemInfo?.card?.card?.info?.costForTwo?.slice(1, 4) < 300))}
               >
                  Less than Rs.300
               </p>
               {filterState.lessThanRs300 && (
                  <span onClick={() => handleCross('lessThanRs300')}>
                     <RxCross1 className="p-1 sm:p-0 sm:pt-2 text-xl"/>
                  </span>
               )}
            </button>
         </div>

         <div className="flex flex-wrap w-full overflow-x-hidden px-0 md:px-[7%] md:w-11.5/12 ">
            {mindItem?.map((itemInfo, index) =>(
               <Link key={index} to={"/restaurants/" + resId}>
                  <RestaurantCard restauList={itemInfo?.card?.card}/>
               </Link>
             ))}
         </div>
      </>
   );
};

export default MindItemCollection;