import Shimmer from "./Shimmer";
import { Link, useParams } from "react-router-dom";
import useRestaurant from "../utils/useRestaurant";
import RestaurantCategory from "./RestaurantCategory";
import { useSelector } from "react-redux";
import { MdStars } from "react-icons/md";
import OfferCard from "./OfferCard";
import { LuShoppingBag } from "react-icons/lu";
import { PiLineSegmentFill } from "react-icons/pi";
import { IoBicycle } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";
import { DEFAULT_RESTAURANT_IMG } from "../utils/constant";
const CDN_URL = process.env.REACT_APP_CDN_URL;

const RestaurantMenu = ()=>{

    const { resId }  = useParams(); //to fetch the restaurant id from url

    const showItemIndex = useSelector((store)=>store?.restaurant?.showItemIndex);
    const cartItems = useSelector((store)=> store.cart.items);

    const resInfo = useRestaurant(resId);
   
    if(resInfo == null) return <Shimmer/>;
    const { name, 
            avgRatingString, 
            costForTwoMessage, 
            totalRatingsString, 
            city,
            areaName, 
            sla,
            cloudinaryImageId } = resInfo?.cards[2]?.card?.card?.info;
   const categories = (resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)?.filter(
        (c)=>{
             return c?.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" 
                    || c?.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" 
       });

return (
      <>
        <div className="text-center lg:p-6 mt-[35%]  sm:mt-[18%] md:mt-[18%] lg:mt-[10%] relative">              
             <h2 className="font-bold text-2xl lg:text-3xl">{name}</h2>
                <div className=" bg-gradient-to-t from-gray-200 p-4 rounded-xl w-full lg:w-6/12 m-auto">
                   <div className="h-80  sm:h-60 md:h-60 lg:h-38 w-full rounded-xl bg-gray-50 border m-auto sm:flex  md:flex lg:flex justify-between">
                        <div className="m-1">
                             <p className="font-bold my-2 mx-4 text-left lg:mx-4">
                               <MdStars className="text-green-700 text-xl inline text-start mb-1" />
                               {avgRatingString} ( {totalRatingsString} ) &#x2022;&nbsp; { costForTwoMessage }
                             </p> 
                             <h3 className="text-orange-600 text-lg font-semibold text-start mx-4">
                                 < TiLocation className="text-purple-700 inline text-2xl m-auto"/> {city}</h3>
                             <div className="flex mx-2">
                                <PiLineSegmentFill  className="-rotate-45 text-zinc-500 my-2 lg:my-6 text-4xl lg:text-4xl"/>
                                 <p className="my-1 lg:my-4"><b>Outlet</b> &nbsp; <span className="text-zinc-600 text-sm">{ areaName } </span><br/>
                                 <b className="flex flex-start">< IoBicycle className="mx-2 my-1" /> {sla.slaString?.toLowerCase()} </b>
                                </p>
                            </div>
                         </div>
                         <img src={cloudinaryImageId ? CDN_URL+cloudinaryImageId : DEFAULT_RESTAURANT_IMG  }
                              className="w-[80%] sm:w-60 sm:m-6 sm:p-0 sm:h-[80%] md:w-60 md:m-6 md:p-0 md:h-[80%] mx-10 h-40 lg:w-60 lg:h-[80%] lg:m-6 lg:p-0 shadow-lg shadow-slate-400 rounded-lg 
                                        hover:scale-105 transition-all duration-500 cursor-pointer"/>
                      </div>
                </div>
              <h1 className="text-center m-2 p-2 text-xl font-extrabold">Deals for you</h1>
              <OfferCard resId = { resId }/>
              {categories?.map((category, index)=>{
                           return <RestaurantCategory 
                           key = { category?.card?.card?.title }
                           data = { category?.card?.card }
                           showItem={ index == showItemIndex ? true : false }
                           showIndex = { index }
                           restaurant = {resInfo?.cards[2]?.card?.card?.info}
                 />
              })}
               { cartItems?.length !== 0 ? (
				                      <div className="h-20 w-full mr-[20%] lg:w-6/12 lg:mx-[23%] flex justify-between p-4 lg:my-2 
                                          bg-lime-600 text-white fixed top-[90%] z-40">
					                       <h4 className="text-sm">{cartItems?.length} item added</h4>
					                            <Link to="/cart">
						                                  <h3 className="text-sm font-bold">VIEW CART <LuShoppingBag className="text-white font-semibold p-0.5 mr-4 text-center text-xl inline lg:m-0"/></h3>
					                            </Link>
                              </div> ): null 
               }
            </div>
        </>
    )
};

export default RestaurantMenu;