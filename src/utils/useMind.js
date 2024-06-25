import { useEffect, useState } from "react";

const useMind = (itemId)=>{

     const [ mindItem, setMindItem ] = useState();

     useEffect(()=>{
        getMindItems();
    },[]);

   const getMindItems = async()=>{
        const response = await fetch("https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D18.61610%26lng%3D73.72860%26collection%3D"+itemId+"%26tags%3Dfilters%3D%26type%3Drcv2");               
        const json =     await response?.json();
        const Data = json?.data?.cards;
        const filteredItem = Data?.filter((i)=>i.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.Restaurant");
        setMindItem(filteredItem);
    }
    return mindItem;
};

export default useMind;