import { useState } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useDispatch, useSelector } from "react-redux";
import { updateShowList } from "../utils/restaurantSlice";
import { FaJava } from "react-icons/fa6";
import { IoSyncCircleOutline, IoPersonCircleSharp } from "react-icons/io5";
import { PiShoppingCartBold } from "react-icons/pi";
import { RiCheckboxCircleFill,  RiCloseCircleFill, RiContactsLine } from "react-icons/ri";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { isLoggedStatus } from "../utils/cartSlice";

const Header = ()=>{

   const status = useOnline();
   const dispatch = useDispatch();
   const [ isSideBarOpen, setIsSideBarOpen] = useState(false);

   // Subscribing to the store using a selector
   let cartItems = useSelector((store)=> store.cart.items);
   let showHiddenUI = useSelector((store)=>store.restaurant.showHiddenUI);
   let isLogged = useSelector((store)=>store.cart.isLogged);

   const handleHeaderItem = ()=>{
      dispatch(updateShowList(true));
   }

   const toggleSideBar = ()=>{
      setIsSideBarOpen(!isSideBarOpen);
   }

   const handleIsSideBar = ()=>{
         setIsSideBarOpen(false);
   }
   
   return(
      <>
        <header className="flex justify-between shadow-lg w-full fixed top-0 left-0 bg-white z-20">
               <div>
                 <Link to="/"><h1 className="font-bold text-2xl p-4 m-4">
                         <FaJava className="inline text-4xl bottom-4" />
                           good<i className="text-orange-500">food</i>
                    </h1></Link>
                </div>
               { !showHiddenUI && <IoPersonCircleSharp  className="h-10 w-20 text-zinc-800 m-8 hidden sm:block" onClick={handleHeaderItem}/> }
               { !isSideBarOpen && <IoPersonCircleSharp  className="h-10 w-20 text-zinc-800 m-8 block sm:hidden" onClick={toggleSideBar}/>}
               {  showHiddenUI && <div className="items-center">
                 <ul className="flex flex-col md:flex-row m-4 p-4 font-semibold cursor-pointer space-y-2 md:space-y-0 md:space-x-4">
                    <li className="px-4"> Internet Status: {
                      (status == true) ? < RiCheckboxCircleFill className="inline text-green-600" /> : < RiCloseCircleFill className="inline text-red-600" />
                    }</li>
                    <li className="pr-4 hover:text-orange-500 "><Link to="/about"><IoSyncCircleOutline  className="inline text-lg m-0"/>About-Us</Link></li>
                    <li className="px-4 hover:text-orange-500 "><Link to="/contact"><RiContactsLine  className="inline text-xl m-0" /> Contact </Link></li>
                    <li className="px-4 hover:text-orange-500 "><Link to="/cart"><PiShoppingCartBold className="inline text-xl m-0"/> Cart[ { cartItems.length ? cartItems.length : null} ]</Link></li>
                    { isLogged ? <button className="px-4 hover:text-orange-500 " 
                                    onClick={()=>{
                                              signOut(auth)
                                              .then(()=>{
                                                 dispatch(isLoggedStatus(false));
                                                 toast.success("You are logout!");
                                                })
                                              .catch((err)=>{
                                               console.log(err);
                                               toast.error("Logout failed!");});
                                    }}> Logout </button>
                               : <li className="px-4 hover:text-orange-500 "><Link to="/login">Login</Link></li>}
                  </ul>
             </div>
             }
             {isSideBarOpen &&(
                     <div className="absolute right-0 w-48 h-screen bg-white text-black text-semibold shadow-lg">
                     <ul>
                       <li className="px-4 my-4"> Internet Status: {
                      (status == true) ? < RiCheckboxCircleFill className="inline text-green-600" />
                                       : < RiCloseCircleFill className="inline text-red-600" />
                       }</li>
                       <li onClick={handleIsSideBar} className="px-4 my-4 hover:text-orange-500 "><Link to="/about">
                                  <IoSyncCircleOutline  className="inline text-lg m-0"/>About-Us</Link>
                      </li>
                       <li onClick={handleIsSideBar} className="px-4  my-4 hover:text-orange-500 "><Link to="/contact">
                                  <RiContactsLine  className="inline text-xl m-0" /> Contact </Link>
                       </li>
                       <li onClick={handleIsSideBar} className="px-4  my-4 hover:text-orange-500 "><Link to="/cart">
                                  <PiShoppingCartBold className="inline text-xl m-0"/> Cart[ { cartItems.length ? cartItems.length : null} ]</Link>
                       </li>
                       { isLogged ? <button className="px-4 hover:text-orange-500 " 
                                    onClick={()=>{
                                              signOut(auth)
                                              .then(()=>{
                                                 dispatch(isLoggedStatus(false));
                                                 toast.success("You are logout!");
                                                })
                                              .catch((err)=>{
                                               console.log(err);
                                               toast.error("Logout failed!");});
                                    }}> Logout </button>
                               : <li onClick={handleIsSideBar}  className="px-4 hover:text-orange-500 "><Link to="/login">Login</Link></li>}
                     </ul>
                   </div>
             )}
       </header>
     </>
    )
 };

 export default Header;