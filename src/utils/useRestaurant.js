import { useState, useEffect } from "react";
import { MENU_URL } from "./constant";


const useRestaurant = (resId)=>{

    const [ resInfo, setResInfo ] = useState(null);

    useEffect(()=>{
        fetchMenu();
   }, []);

   const fetchMenu = async ()=>{

       // Get Restaurant data from api
        
        const data = await fetch(MENU_URL+resId);
        const json = await data.json();
        setResInfo(json?.data); 
   }

   return resInfo;

}

export default useRestaurant;