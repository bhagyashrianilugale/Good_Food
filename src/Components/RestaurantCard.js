import { CDN_URL } from "../utils/constant";
import { MdStars } from "react-icons/md";


export const RestaurantCard = (props)=>{

   const { restauList, className, classNameImg} = props; //  Destructing the props
   const {
       name,
       avgRating,
       cloudinaryImageId,
       locality,
       cuisines,
      } = restauList?.info;

   return(
       <div className={`w-[250px] h-80 mx-4 p-4 rounded-2xl overflow-hidden transition-transform duration-200 transform hover:scale-95 ${className}`}>
           <div className="relative">
               <img src={ CDN_URL + cloudinaryImageId} 
               alt="cart-img" 
               className={`rounded-2xl h-40 w-60 absolute${classNameImg}`}></img>
               <div className="">
                   <p className="font-extrabold text-2xl text-white bottom-0 absolute px-2 bg-gradient-to-t from-black w-full rounded-b-2xl py-2">{restauList?.info?.aggregatedDiscountInfoV3?.header}</p>
               </div>
          </div>
          <div>
            <h3 className="font-extrabold">
               { name }
            </h3>
            <p className="font-semibold"> 
               <MdStars className=" text-green-700 text-xl inline text-center mb-1" /> { avgRating } <span className="font-semibold"> . </span> <b>{restauList?.info?.sla?.slaString}</b>
            </p>
            <div className="truncate text-black text-sm opacity-50 font-bold">
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
         <div>
            <label className="bg-black text-white p-1 absolute rounded-lg ml-3 z-10">Promoted</label>
            <RestaurantCard {...props}/>
        </div>
      )
   }
 };

