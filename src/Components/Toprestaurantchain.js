import React, { useContext, useEffect } from 'react'
import useBody from '../utils/useBody';
import { Shimmer2 } from './Shimmer';
import { RestaurantCard } from './RestaurantCard';

const Toprestaurantchain = () => {

 const json = useBody();
 const result = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

 return result?.length == 0 ? (<Shimmer2/>) : (
    <div>
        <h1 className="font-bold text-2xl my-4">Top restaurant chains in Nashik</h1>
         <div className='flex overflow-x-scroll no-scrollbar'>
           {
            result?.map((restaurant)=>{
                return <div key={restaurant?.info?.name}>
                             <RestaurantCard 
                              restauList = { restaurant } 
                              className = {"m-2 w-[250px] h-[300px] rounded-lg p-6 hover:transition-none transition-transform duration-200 transform hover:scale-75"}
                              classNameImg = {"w-[80%]"}/></div>
              })
           }
        </div>
    </div>
  )
}

export default Toprestaurantchain;
