import React from 'react'
import { useDispatch } from 'react-redux';
import { addMenuCategory } from '../utils/restaurantSlice';

const MenuFrame = ({onClose, data}) => {
  
  const dispatch = useDispatch();
  return (
    <>
       <div className="w-[40%] h-40 bg-black m-auto my-20 text-white overflow-y-scroll no-scrollbar p-4">
            {data?.map((category)=>(<h1 className="text-white cursor-pointer" onClick={()=> dispatch(addMenuCategory(category))}>{category?.card?.card?.title}({ category?.card?.card?.itemCards?.length})</h1>))}
            <button onClick ={onClose}>Click Me</button>
        </div>
    </>
  )
}

export default MenuFrame;
