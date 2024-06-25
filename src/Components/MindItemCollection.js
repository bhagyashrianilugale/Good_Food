import { useEffect, useState } from "react";
import { RestaurantCard } from "./RestaurantCard";
import { useParams } from "react-router-dom";
// import { RestaurantCard } from "./RestaurantCard";

const MindItemCollection = ()=>{
   const [ mindItem, setMindItem ] = useState();
   
   return (
              <div className="flex flex-wrap">
                   <div>Mind Items COlletions</div>
                   {mindItem?.map((itemInfo)=><RestaurantCard restauList={ itemInfo?.card?.card }/>)}
              </div>
   )
};

export default MindItemCollection;