import { useContext } from "react";
import  { UserContext }  from "../utils/UserContext";

export const RestauCart = (props)=>{


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
       <div className='m-6 px-4 w-[200px] bg-slate-200  rounded-lg hover:bg-slate-300 overflow-hidden'>
         <div>
           <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+cloudinaryImageId} 
             alt="cart-img" 
             className="rounded-md"></img>
         </div>

         <h3 className="font-bold text-lg">
            { name }
         </h3>
         <p className="fond-bold"> 
             Rating { avgRating } &#9733;
         </p>
         <h4 className="font-thin">
              { costForTwo }
         </h4>
         <h4 className="flex-wrap  px-4  overflow-hidden">{cuisines.join(",")}</h4>
         <h4>User: {loggedUser}</h4>
       </div>                       
    )
 };

 export const withPromotedLabel = (RestauCart) =>{
   return (props)=>{
      return(
         <div>
            <label className="bg-black text-white p-1 absolute rounded-lg ml-3">Promoted</label>
            <RestauCart {...props}/>
        </div>
      )
   }
 };

