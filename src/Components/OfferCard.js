import React from 'react'
import useRestaurant from '../utils/useRestaurant';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const OfferCard = ({resId}) => {
    const resInfo = useRestaurant(resId);
    const offers = resInfo?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers;
return (
     <>
         <div className="flex sm:w-3/4 md:w-6/12 w-full overflow-x-scroll no-scrollbar m-auto">
               { offers?.map((offer, index)=> <div key={index} className="w-[80%] sm:w-[60%] md:w-[40%] h-[8%] sm:h-[14%] md:h-[20%] flex 
                                                        mx-8 sm:mx-6 text-black border border-x-gray-600 p-2 rounded-3xl">
                                                 <img className="w-10 h-10 m-2" src={CDN_URL + offer.info.offerLogo}/>
                                                 <div className="px-1 py-2 w-60 h-8">
                                                     <h1 className="font-extrabold text-sm text-left">{offer.info.header}</h1>
                                                      <p className="font-bold text-xs text-gray-400 text-left">{offer.info.couponCode}</p>
                                                 </div>
                            
                      </div>) }
         </div>
    </>
  )
}

export default OfferCard;
