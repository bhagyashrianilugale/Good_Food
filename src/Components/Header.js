import { useState } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useDispatch, useSelector } from "react-redux";
import { updateShowList } from "../utils/restaurantSlice";
import { FaJava } from "react-icons/fa6";
import { IoSyncCircleOutline, IoPersonCircleSharp } from "react-icons/io5";
import { PiShoppingCartBold } from "react-icons/pi";
import { RiCheckboxCircleFill,  RiCloseCircleFill, RiContactsLine } from "react-icons/ri";



const Header = ()=>{

   const status = useOnline();
   const dispatch = useDispatch();

   // Subscribing to the store using a selector
   let cartItems = useSelector((store)=> store.cart.items);
   let showHiddenUI = useSelector((store)=>store.restaurant.showHiddenUI);


   const handleHeaderItem = ()=>{
      dispatch(updateShowList(true));
   }
   
   return(
      <>
        <header className=" flex justify-between shadow-lg w-full fixed top-0 left-0 bg-white z-20">
               <div>
                 <Link to="/"><h1 className="font-bold text-2xl p-4 m-4">
                         <FaJava className="inline text-4xl bottom-4" />
                           good<i className="text-orange-500">food</i>
                    </h1></Link>
                </div>
               { !showHiddenUI && <IoPersonCircleSharp  className="h-10 w-20 text-zinc-800 m-8" onClick={handleHeaderItem}/> }
               {  showHiddenUI && <div className="items-center">
                 <ul className="flex m-4 p-4 font-semibold cursor-pointer">
                    <li className="px-4"> Internet Status: {
                      (status == true) ? < RiCheckboxCircleFill className="inline text-green-600" /> : < RiCloseCircleFill className="inline text-red-600" />
                    }</li>
                    <li className="pr-4 hover:text-orange-500 "><Link to="/about"><IoSyncCircleOutline  className="inline text-lg m-0"/>About-Us</Link></li>
                    <li className="px-4 hover:text-orange-500 "><Link to="/contact"><RiContactsLine  className="inline text-xl m-0" /> Contact </Link></li>
                    <li className="px-4 hover:text-orange-500 "><Link to="/cart"><PiShoppingCartBold className="inline text-xl m-0"/> Cart[ { cartItems.length ? cartItems.length : null} ]</Link></li>
                    <li className="px-4 hover:text-orange-500 "><Link to="/login">LogIn </Link></li>
                    </ul>
             </div>
             }
       </header>
     </>
    )
 };

 export default Header;