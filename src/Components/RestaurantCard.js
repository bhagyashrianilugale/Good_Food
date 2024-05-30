import { useContext } from "react";
import  { UserContext }  from "../utils/UserContext";

export const RestaurantCard = (props)=>{

   const { restauList } = props //  Destructing the props

   const { loggedUser } = useContext(UserContext);
   
   const {
       locality,
       name,
       avgRating,
       cloudinaryImageId,
       costForTwo,
       cuisines,
      } = restauList?.info;
      
    
   return(
       <div className='m-6 w-[300px] 
                       h-80 rounded-lg p-6
                       hover:bg-slate-300 
                       overflow-hidden transition 
                       ease-in-out delay-150 hover:-translate-y-1 
                       hover:scale-110 duration-300'>
         <div>
             <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+cloudinaryImageId} 
             alt="cart-img" 
             className="rounded-lg h-40 w-60"></img>
         </div>
         <div className="font-semibold">
            <h3>
               { name }
            </h3>
            <p> 
               &#9733; Rating { avgRating }
            </p>
            <h4>
              { costForTwo }
            </h4>
         </div>
         <div className="flex flex-wrap">
               <h4>{cuisines.join(",")}</h4>
         </div>
           {/* <h4>User: {loggedUser}</h4> */}
         </div>                       
    )
 };

 export const withPromotedLabel = (RestaurantCard) =>{
   return (props)=>{
      return(
         <div>
            <label className="bg-black text-white p-1 absolute rounded-lg ml-3">Promoted</label>
            <RestaurantCard {...props}/>
        </div>
      )
   }
 };

