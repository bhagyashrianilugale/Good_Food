import Shimmer from "./Shimmer";
import { Link, useParams } from "react-router-dom";
import useRestaurant from "../utils/useRestaurant";
import RestaurantCategory from "./RestaurantCategory";
import { useSelector } from "react-redux";
import OfferCard from "./OfferCard";
import { LuShoppingBag } from "react-icons/lu";
import { PiLineSegmentFill } from "react-icons/pi";
import { IoBicycle } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";
import { DEFAULT_RESTAURANT_IMG } from "../utils/constant";
import { FaBowlFood } from "react-icons/fa6";
import { IoStarOutline } from "react-icons/io5";
import { IoFlower } from "react-icons/io5";

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
        <div className="text-center p-6 mt-[35%] sm:mt-[18%] md:mt-[8%] relative">
                <h2 className="font-bold text-2xl text-black">
                         Welcome to <br/> <i className="text-orange-500 text-bold underline">
                                 &nbsp;{name}&nbsp;<FaBowlFood className="inline text-black"/> 
                                    </i>
                </h2>
                
                <div className=" bg-gradient-to-t from-gray-200 p-2 sm:p-4 rounded-xl w-full md:w-6/12 m-auto">
                   <div className="h-65 sm:h-60 md:h-38 w-full rounded-xl bg-gray-50 border m-auto sm:flex justify-between">
                        <div>
                             <p className="font-bold p-4 sm:p-8">
                             <IoStarOutline className=" text-green-700 inline" /> 
                              &nbsp;{avgRatingString} ( {totalRatingsString} )<br/>
                                 { costForTwoMessage }
                             </p> 
                             <h3 className="text-orange-600 text-lg font-semibold">
                                 <TiLocation className="text-purple-700 inline"/> {city}</h3>
                             <div className="flex mx-4">
                                 <PiLineSegmentFill  className="-rotate-45 text-zinc-500 my-3 text-4xl"/>
                                <p className="my-1"><b>Outlet</b> &nbsp; <span className="text-zinc-600">{ areaName } </span><br/>
                                 <b className="flex flex-start">< IoBicycle className="mx-2 my-1" /> {sla.slaString?.toLowerCase()} </b>
                                </p>
                            </div>
                         </div>
                         <img src={cloudinaryImageId ? CDN_URL+cloudinaryImageId : DEFAULT_RESTAURANT_IMG  }
                              className="w-full h-60 sm:h-full sm:w-80 shadow-lg shadow-slate-400
                                         cursor-pointer"/>
                      </div>
                </div>
                <h2 className="text-center m-2 p-2 text-3xl font-bold my-4">
                      <IoFlower className="inline text-xl"/>
                          &nbsp;Menu&nbsp; 
                       <IoFlower className="inline text-xl"/></h2>
              <OfferCard resId = { resId }/>
              {categories?.map((category, index)=>{
                           return <RestaurantCategory 
                           key = { category?.card?.card?.title }
                           data = { category?.card?.card }
                           showItem={ index === showItemIndex ? true : false }
                           showIndex = { index }
                           restaurant = {resInfo?.cards[2]?.card?.card?.info}
                 />
              })}
               { cartItems?.length !== 0 ? (
				                      <div className="h-20 w-full mr-[20%] md:w-6/12 md:mx-[23%] flex justify-between p-4 md:my-2 
                                          bg-lime-600 text-white fixed top-[90%] z-40">
					                     <h4 className="text-sm">{cartItems?.length} item added</h4>
					                     <Link to="/cart">
						                      <h3 className="text-sm font-bold">VIEW CART 
                                                  <LuShoppingBag className="text-white font-semibold p-0.5 mr-4 text-center text-xl inline md:m-0"/>
                                              </h3>
					                    </Link>
                  </div> ): null 
                 }
            </div>
        </>
    )
};

export default RestaurantMenu;