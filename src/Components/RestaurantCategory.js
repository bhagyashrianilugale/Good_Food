import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./ItemCard";
import { addShowItemIndex, removeShowItemIndex } from "../utils/restaurantSlice";
import { useEffect } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";



const RestaurantCategory = ({data, showItem, showIndex, restaurant})=>{
    const dispatch = useDispatch();
    console.log(showItem);
    const handleClick = () =>{
         // Dispatch action to add showItemIndex on redux store
           dispatch(addShowItemIndex(showIndex));
    };


    useEffect(()=>{
         // Dispatch action to remove showItemIndex from redux store
          dispatch(removeShowItemIndex());
    }, []);

    return (
        <>
            <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 cursor-pointer">
                <div className=" flex justify-between font-bold" onClick={ handleClick }>
                     <span>{data.title } ({ data?.itemCards?.length})</span>
                     <span>{showItem ? <BiSolidUpArrow /> :  <BiSolidDownArrow />}</span>
                </div>
                { showItem && data?.itemCards?.map((item)=>( <ItemCard key={ item?.card.info.id }  item = { item } restaurants = {restaurant}/> ))}
            </div>
        </>
    )
};

export default RestaurantCategory;