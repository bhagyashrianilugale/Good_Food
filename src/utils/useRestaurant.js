import { useState, useEffect } from "react";
const MENU_URL = process.env.REACT_APP_MENU_URL;


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