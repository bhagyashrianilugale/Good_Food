import { useSelector, useDispatch } from "react-redux";
import { clearCart, decreaseCount, increaseCount } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import { BsRecordCircle } from "react-icons/bs";
import { IoCaretUpCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import { MdOutlineLocationCity } from "react-icons/md";
import { DEFAULT_RESTAURANT_IMG } from "../utils/constant";
import { EMPTY_CART_IMG } from "../utils/constant";
import { toast } from "react-toastify";
const CDN_URL = process.env.REACT_APP_CDN_URL;

const Cart = () => {

    let items = useSelector((store) => store.cart.items);
    let restaurant = useSelector((store) => store.cart.restaurant);
    let isLogged = useSelector((store)=>store.cart.isLogged);
    const resId = restaurant?.id;

    const dispatch = useDispatch();

    const [changeText, setChangetext] = useState(false);
    const [totalPrice, setTotalPrice] = useState(null);


    const handleClearCart = () => {
        dispatch(clearCart());
        toast.warning("Cleared cart!");
    };

    const handleCount = (e, item) => {
        if (e.target.innerText === "+") {
            const id = item?.card?.info?.id;
            dispatch(increaseCount(id));
        } else if (e.target.innerText === "-") {
            const id = item?.card?.info?.id;
            dispatch(decreaseCount(id));
        }
    };

    useEffect(() => {
        setTotalPrice(
            items.reduce(
                (sum, item) =>
                    sum +
                    (item[0]?.card?.info?.price
                        ? item[0]?.card?.info?.price / 100
                        : item[0]?.card?.info?.defaultPrice / 100) *
                        item[1],
                0
            )
        );
    }, [items]);

    return ( 
        <div className="my-[36%] sm:mt-[18%]  md:mt-[18%]  lg:my-[10%]">
             <div>
                 {items?.length !== 0 ? (
                    <div className="mx-0 lg:mx-auto w-full sm:w-10/12 sm:mx-auto  md:w-10/12  md:mx-auto lg:w-6/12 p-8
                                    sm:shadow-lg md:shadow-lg lg:shadow-lg text-gray-800 rounded-lg 
                                  md:shadow-black lg:shadow-black">
                        <h1 className="text-center text-2xl lg:text-4xl mx-20 my-4 top-0 lg:my-0 font-bold">Cart</h1>
                        <div className="flex justify-between m-auto">
                            <Link to={"/restaurants/" + resId}><img
                                className="rounded-lg w-40 lg:w-[40%] h-20 lg:h-[70%] lg:p-0"
                                src={
                                    restaurant?.cloudinaryImageId
                                        ? CDN_URL + restaurant?.cloudinaryImageId
                                        : DEFAULT_RESTAURANT_IMG
                                }
                                alt="Restaurant_img"
                            /></Link>
                            <div className="my-2 lg:my-0 px-6 lg:px-2 lg:p-0">
                                <h2 className="text-xl lg:text-2xl font-bold">{restaurant?.name}</h2>
                                <p className="text-gray-500 text-sm border"> 
                                     <MdOutlineLocationCity className="inline text-cyan-700 mx-2"/>
                                     {restaurant?.city}
                                </p>
                            </div>
                        </div>
                        <div className="text-gray-800 py-2 text-left">
                            {items?.map((item, index) => (
                                <div key={index} className="flex items-center mx-0 lg:mx-16 my-1">
                                    <span className="mx-2">
                                        {item[0]?.card?.info?.itemAttribute?.vegClassifier === "VEG" ? (
                                            <BsRecordCircle className="text-green-700 inline" />
                                        ) : (
                                            <IoCaretUpCircleOutline className="text-red-700 inline" />
                                        )}
                                    </span>
                                    <span className="w-60 text-sm truncate lg:text-lg mx-2 lg:mx-4">{item[0]?.card?.info?.name}</span>
                                    <div className="bg-white shadow-lg w-80 sm:w-20  md:w-20 lg:w-20 shadow-zinc-500 text-center mx-4 h-8 
                                                   text-green-600 rounded-2xl">
                                        <button
                                            className="font-bold mx-2 my-1"
                                            onClick={(e) => handleCount(e, item[0])}
                                        >
                                            -
                                        </button>
                                        <span className="text-lg lg:text-xl">{item[1]}</span>
                                        <button
                                            className="font-bold mx-2 my-1"
                                            onClick={(e) => handleCount(e, item[0])}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="w-20 text-right mx-8">
                                        ₹
                                        {item[0]?.card?.info?.price
                                            ? Math.floor(item[0]?.card?.info?.price) / 100
                                            : Math.floor(item[0]?.card?.info?.defaultPrice) / 100}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-10 w-80 bg-gray-100 m-auto">
                              <RiDoubleQuotesL className="inline m-auto mx-1"/>
                              <input placeholder="Any suggestions? We will pass it on..." 
                              className="text-sm lg:text-lg text-center m-auto h-10 w-60 outline-none bg-gray-100"/> 
                        </div>
                        <div className="flex justify-center my-2">
                            <button
                                className="bg-white shadow-lg mx-10 w-40 text-center text-lg font-bold h-10 text-orange-500 rounded-lg shadow-zinc-500"
                                onClick={handleClearCart}>
                                Clear cart
                            </button>
                        </div>
                        <div className="border border-gray-300">
                            <div className="flex items-center p-4">
                                <input
                                    id="checked-checkbox"
                                    type="checkbox"
                                    name="checkAddress"
                                    className="w-4 h-4 text-green-600 bg-gray-100 m-4 border-gray-300 rounded my-2"
                                    onChange={() => setChangetext(!changeText)}
                                />
                                {!changeText ? (
                                    <label
                                        htmlFor="checked-checkbox"
                                        className="text-sm lg:text-lg"
                                    >
                                       <b>Opt in for No-contact Delivery</b> <br />
                                        <span className="text-zinc-400">Unwell, or avoiding contact? Please select no-contact 
                                              delivery. Partner will safely place the order outside 
                                              your door (not for COD)
                                        </span>
                                    </label>
                                ) : (
                                    <label
                                        htmlFor="checked-checkbox"
                                        className="text-sm lg:text-lg"
                                    >
                                        <b>Opt in for No-contact Delivery</b> <br />
                                         <span  className="text-zinc-400">Our delivery partner will call to confirm. 
                                               Please ensure that your address has all the required details.
                                        </span>
                                    </label>
                                )}
                            </div>
                        </div>
                        <div className="border-t border-gray-300 pt-4 mt-4 text-sm lg:text-lg m-auto">
                            <div className="grid grid-cols-2 gap-2 text-gray-800">
                                <span className="col-span-2 font-semibold text-lg">Bill Details</span>
                                <span>Item Total</span>
                                <span className="text-right">₹ {Math.floor( totalPrice )}</span>
                                <span>Delivery Fee | {restaurant?.sla?.lastMileTravelString}</span>
                                <span className="text-right">
                                    ₹{" "}
                                    {restaurant.feeDetails.amount != null
                                        ? restaurant.feeDetails.amount / 100
                                        : 30}{" "}
                                    
                                </span>
                       </div>
                            <hr className="my-2 w-full text-center"/>

                       <div className="grid grid-cols-2 gap-1 text-gray-800">
                                <span>Delivery Tip</span>
                                <span className="text-red-500 cursor-pointer text-right">Add tip</span>
                                <span>Platform fee</span>
                                <span className="text-right">₹ 5  </span>
                                <span>GST and Restaurant Charges</span>
                                <span className="text-right">₹ 101</span>
                        </div>
                        <hr  className="my-2 w-full bg-gray-900 h-0.5 m-auto"/>
                        <div className="flex justify-between w-full">
                          { !isLogged ? <button 
                                           className="bg-white shadow-lg mx-10 w-40 my-2 text-center text-lg font-bold 
                                                 h-10 text-orange-500 rounded-lg shadow-zinc-500">
                                            <Link to="/login">TO PAY</Link>
                                          </button>
                                      : <button onClick={()=>toast.success("Paymenet successful!")} 
                                          className="bg-white shadow-lg mx-0 lg:mx-10 w-40 my-2 text-center text-lg font-bold 
                                                  h-10 text-orange-500 rounded-lg shadow-zinc-500">
                                          TO PAY
                                        </button>}
                                   <p className="font-extrabold text-lg my-2">
                                    ₹{" "}
                                    {Math.floor(totalPrice) +
                                        (restaurant.feeDetails.amount / 100
                                            ? restaurant.feeDetails.amount / 100
                                            : 30) +
                                        5 +
                                        101}{" "}
                                    
                            </p>
                        </div>
                      </div>
                    </div>
                ) : (
                    <div className="text-center py-16 lg:p-0 my-10">
                        <img src={EMPTY_CART_IMG} className="h-60 w-80 m-auto" alt="Empty Cart" />
                        <p className="text-lg font-bold opacity-80">Your cart is empty</p>
                        <p className="text-sm opacity-80">You can go to home page to view more restaurants</p>
                        <Link to={"/"}>
                            <button className="p-2 rounded-lg font-semibold bg-orange-500 text-white my-2 hover:bg-orange-600">
                                SEE RESTAURANTS NEAR YOU
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
