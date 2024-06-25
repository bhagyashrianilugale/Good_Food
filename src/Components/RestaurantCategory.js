import { useDispatch } from "react-redux";
import ItemCard from "./ItemCard";
import { addShowItemIndex, removeShowItemIndex } from "../utils/restaurantSlice";
import { useEffect } from "react";

const RestaurantCategory = ({data, showItem, showIndex})=>{

    const dispatch = useDispatch();
    const handleClick = () =>{
         // Dispatch action to add showItemIndex on redux store
          dispatch(addShowItemIndex(showIndex));
    }

    useEffect(()=>{
         // Dispatch action to remove showItemIndex from redux store
         dispatch(removeShowItemIndex());
    }, []);

    return (
        <div>
            <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 cursor-pointer">
                <div className=" flex justify-between font-bold" onClick={ handleClick }>
                     <span>{data.title}({data?.itemCards?.length})</span>
                     <span>⬇️</span>
                </div>
                {showItem && <ItemCard items={data.itemCards}/>}
            </div>
        </div>
    )
};

export default RestaurantCategory;