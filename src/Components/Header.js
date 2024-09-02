import { useState } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useDispatch, useSelector } from "react-redux";
import { updateShowList } from "../utils/restaurantSlice";
import { FaJava } from "react-icons/fa6";
import { IoSyncCircleOutline, IoPersonCircleSharp } from "react-icons/io5";
import { RiCheckboxCircleFill,  RiCloseCircleFill, RiContactsLine } from "react-icons/ri";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { isLoggedStatus } from "../utils/cartSlice";
import { GoXCircle } from "react-icons/go";
import { BsCart2 } from "react-icons/bs";


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
                 <Link to="/">
                     <h1 className="font-bold text-2xl p-4 sm:text-3xl px-1 sm:p-2 my-2">
                         <FaJava className="inline text-4xl sm:text-5xl bottom-1"/>
                           good<i className="text-orange-500">food</i>
                    </h1>
                </Link>
                </div>
               { !showHiddenUI && <IoPersonCircleSharp  
                                   className="h-10 w-20 text-zinc-800 hidden my-6 md:block" 
                                   onClick={ handleHeaderItem }/> }
               { !isSideBarOpen && <IoPersonCircleSharp  
                                    className="h-10 w-20 text-zinc-800 my-6 block md:hidden" 
                                    onClick={ toggleSideBar }/>}
               { showHiddenUI && <div className="items-center">
                                  <ul className="flex m-2 p-4 font-semibold cursor-pointer space-y-2 md:space-y-0 md:space-x-4">
                    <li className="px-4 md:px-4"> 
                                      Internet Status: {
                      (status == true) ? < RiCheckboxCircleFill className="inline text-green-600" /> : < RiCloseCircleFill className="inline text-red-600" />
                    }</li>
                    <li className="px-4  md:pr-4 hover:text-orange-500 "><Link to="/about"><IoSyncCircleOutline  className="inline text-lg m-0"/>About-Us</Link></li>
                    <li className="px-4  md:px-4 hover:text-orange-500 "><Link to="/contact"><RiContactsLine  className="inline text-xl m-0" /> Contact </Link></li>
                    <li className="px-4  md:px-4 hover:text-orange-500 "><Link to="/cart"><span className="bg-orange-500 text-sm -my-2 text-white px-2 rounded-full absolute">{ cartItems.length ? cartItems.length : null}</span>
                                          <BsCart2 className="inline text-xl m-0 relative"/> Cart</Link>
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
                               : <li className="px-4 md:px-4 hover:text-orange-500 "><Link to="/login">Login</Link></li>}
                  </ul>
             </div>
             }
             {isSideBarOpen &&(
                     <div className="absolute right-0 w-48 h-screen bg-white text-black text-semibold shadow-lg">
                      <GoXCircle className=" text-right text-2xl font-bold mx-1 my-2" onClick={handleIsSideBar}/>
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
                                  <span className="bg-orange-500  text-sm -my-3 text-white px-2 rounded-full absolute">
                                     { cartItems.length ? cartItems.length : null}</span>
                                     <BsCart2 className="inline text-xl m-0 relative"/> Cart</Link>
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