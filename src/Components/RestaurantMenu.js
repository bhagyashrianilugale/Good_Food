import { Shimmer1 } from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurant from "../utils/useRestaurant";
import RestaurantCategory from "./RestaurantCategory";
import { useSelector } from "react-redux";

const RestaurantMenu = ()=>{

    const { resId }  = useParams(); //to fetch the restaurant id from url
    const showItemIndex = useSelector((store)=>store.restaurant.showItemIndex);
    const resInfo = useRestaurant(resId);
    
    if(resInfo === null) return <Shimmer1/>;
    const {name, avgRatingString, totalRatingsString } = resInfo?.cards[2]?.card?.card?.info;
    const categories = (resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)?.filter(
        (c)=>{

          return c?.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" || c?.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
      });
    
    return (
      <div className="text-center p-6 m-6">              
             <h2 className=" font-bold text-2xl ">{name}</h2>
             <p className="font-light">
                {avgRatingString} stars &nbsp; ({totalRatingsString})
             </p>

             {categories?.map((category, index)=>{
                // Control Component
               return <RestaurantCategory 
                 key={ category?.card?.card?.title }
                 data={ category?.card?.card }
                 showItem={ index === showItemIndex? true : false }
                 showIndex = {index}
               />
             })}
        </div>
    )
};

export default RestaurantMenu;