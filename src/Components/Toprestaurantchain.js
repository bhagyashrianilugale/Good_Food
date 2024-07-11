import React from 'react'
import useBody from '../utils/useBody';
import Shimmer from './Shimmer';
import { RestaurantCard } from './RestaurantCard';
import { Link } from 'react-router-dom';

const Toprestaurantchain = () => {

 const json = useBody();
 const result = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
 return result?.length == 0 ? (<Shimmer/>) : (
      <>
         <div className='flex overflow-x-scroll no-scrollbar border-b-2'>
           { result?.map((restaurant, index)=>{
                         return <div  key = {index}>
                               <Link key ={ restaurant.id } to = {"/restaurants/" + restaurant.info.id }>
                                   <RestaurantCard 
                                        restauList = { restaurant } 
                                        className = {"m-2 w-[300px] h-[300px] rounded-lg p-6"}
                                        classNameImg = {"w-[80%]"}/></Link>
            
                    </div>}
              )}
        </div>
    </>
  )
}

export default Toprestaurantchain;
