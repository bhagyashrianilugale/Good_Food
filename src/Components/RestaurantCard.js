import { MdStars } from "react-icons/md";
import { DEFAULT_IMG_URL } from "../utils/constant";
const CDN_URL = process.env.REACT_APP_CDN_URL;

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
       <div className={`w-[250px] h-100 mx-1 p-4 rounded-2xl overflow-hidden hover:transition-none transition-transform duration-200 transform hover:scale-90 ${className}`}>
           <div className="relative">
                <img src={ cloudinaryImageId ? (CDN_URL+cloudinaryImageId) : DEFAULT_IMG_URL} 
                alt="cart-img" 
                className={`rounded-2xl h-40 w-80 absolute${classNameImg}`}></img>
                <div className="">
                   <p className="font-bold text-2xl text-white bottom-0 absolute px-2 bg-gradient-to-t from-black w-full rounded-b-2xl py-2">{restauList?.info?.aggregatedDiscountInfoV3?.header}</p>
                </div>
          </div>
          <div>
            <h3 className="font-bold opacity-90">
               { name }
            </h3>
            <p className="font-bold  opacity-90"> 
               <MdStars className=" text-green-700 text-xl inline text-center mb-1" /> { avgRating } <span> . {restauList?.info?.sla?.slaString}</span>
            </p>
            <div className="truncate text-black text-sm opacity-50 font-semibold">
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
            <div className="h-4">
               <label 
                      className=" bg-amber-400 text-white text-xs font-bold p-1 absolute rounded-lg mt-6 ml-2 z-10">
                        PROMOTED
                </label> 
            </div>
            <RestaurantCard {...props}/>
        </>
      )
   }
 };

