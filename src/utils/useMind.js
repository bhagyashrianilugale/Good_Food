import { useState } from "react";

const useMind = (itemId)=>{

     const [ mindItem, setMindItem ] = useState();

     const getMindItems = async()=>{
        const response = await fetch("https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D18.61610%26lng%3D73."+itemId+"%26collection%3D83633%26tags%3Dfilters%3D%26type%3Drcv2");               
        const json =  await response?.json();
        const items =  await json?.data?.cards;
        setMindItem(items);
    }
    getMindItems();
    
    return mindItem;

};

export default useMind;