import { LOGO_URL } from "../utils/constant";
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { UserContext } from "../utils/UserContext";
import { useSelector } from "react-redux";


const Header = ()=>{
   const [ btnText, setBtnText] = useState("LogIn");

   const { loggedUser } = useContext(UserContext);

   const status = useOnline();

   // Subscribing to the store using a selector

   let cartItems = useSelector((store)=> store.cart.items);
   
   return(
       <div  className="flex justify-between bg-pink-200 shadow-lg w-12/12">
             <div className="w-20 h-20 flex">
                <img src={ LOGO_URL }alt="logoimg"/>
             </div>
             <div className="items-center">
                <ul className="flex m-4 p-4">
                    <li className="px-4">Online Status:{
                      (status == true) ? "✅" : "❌" 
                    }</li>
                    <li className="px-4"><Link to="/">Home</Link></li>
                    <li className="px-4"><Link to="/about">AboutUs</Link></li>
                    <li className="px-4"><Link to="/contact">Contact</Link></li>
                    <li className="px-4"><Link to="/grocery">Grocery</Link></li>
                    <li className="px-4 font-bold"><Link to="/cart">Cart - [{ cartItems.length} Items]</Link></li>

                    <button className="px-4" onClick={
                        ()=>{
                           btnText==="LogIn"? 
                           setBtnText("LogOut"): 
                           setBtnText("LogIn");
                        }
                         
                   }>{btnText}</button>
                   <li className="font-bold">{loggedUser}</li>
                </ul>
             </div>
       </div>
    )
 };

 export default Header;