import { DEFAULT_RESTAURANT_IMG } from "../utils/constant";
import { IoRestaurantSharp } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { IoIosBicycle } from "react-icons/io";

const CDN_URL = process.env.REACT_APP_CDN_URL;

export const RestaurantCard = (props)=>{

   const { restauList} = props; //  Destructing the props
   const {
       name,
       avgRating,
       cloudinaryImageId,
       locality,
       cuisines,
      } = restauList?.info;

   return(
       <div className="w-[260px] h-80 mx-5 md:mx-10 my-4 shadow-xs rounded-lg hover:translate-x-4 bg-white 
                        duration-500">
               <div>
                  <img src={(CDN_URL+cloudinaryImageId)||(DEFAULT_RESTAURANT_IMG)} 
                   alt="cart-img" 
                   className="rounded-t-lg h-40 w-full shadow-lg shadow-zinc-400 relative"></img>
                   
               </div>
              <div className="p-2">
                 <h3 className="text-lg md:text-lg truncate font-bold font-serif">
                     <IoRestaurantSharp className="inline mx-2 mb-1 text-orange-500"/>{ name }
                 </h3>
                 
                 <p className="opacity-90 text-lg"> 
                 <IoStarOutline className=" text-green-700 inline mx-2 mb-1" /> 
                     { avgRating } <span> <IoIosBicycle className="inline m-1"/> {restauList?.info?.sla?.slaString}</span>
                 </p>
                <div className="line-clamp-3 text-black text-sm px-2 text-center opacity-50">
                     {cuisines.join(",")}
                     <p>{locality}</p>
                </div>
            </div>
        </div>                       
    )
 };

 export const withPromotedLabel = (RestaurantCard) =>{
   return (props)=>{
      return(
         <> 
            <div className="h-4 absolute">
               <span 
                   className="animate-ping absolute inline-flex rounded-full h-6 w-24 z-10 bg-amber-400 opacity-75 ">
               </span>
               <span 
                     className="relative inline-flex rounded-full bg-amber-400 h-6 w-24 px-4 text-white py-1 text-xs font-bold z-10">
                     PROMOTED
               </span>
            </div>
            <RestaurantCard {...props}/>
        </>
      )
   }
 };

