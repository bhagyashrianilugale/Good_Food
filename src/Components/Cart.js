import { useSelector, useDispatch } from "react-redux";
import { clearCart, decreaseCount, increaseCount } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import { BsRecordCircle } from "react-icons/bs";
import { IoCaretUpCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import { MdOutlineLocationCity } from "react-icons/md";
import { DEFAULT_IMG_URL } from "../utils/constant";
import { EMPTY_CART_IMG } from "../utils/constant";
const CDN_URL = process.env.REACT_APP_CDN_URL;

const Cart = () => {

    let items = useSelector((store) => store.cart.items);
    let restaurant = useSelector((store) => store.cart.restaurant);
    const resId = restaurant?.id;

    const dispatch = useDispatch();

    const [changeText, setChangetext] = useState(false);
    const [totalPrice, setTotalPrice] = useState(null);


    const handleClearCart = () => {
        dispatch(clearCart());
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
        <div className="p-10 mt-[10%]">
             <div className="m-auto w-5/12 p-4 shadow-lg text-gray-800 bg-white rounded-lg hover:shadow-orange-400">
                <h1 className="p-2 rounded-sm w-[20%] my-2 m-auto font-semibold bg-orange-500 text-center text-white">Cart</h1>

                  {items?.length !== 0 ? (
                    <div>
                        <div className="flex justify-evenly items-center m-auto">
                            <img
                                className="w-[40%] h-20 rounded-lg mr-4"
                                src={
                                    restaurant?.cloudinaryImageId
                                        ? CDN_URL + restaurant?.cloudinaryImageId
                                        : DEFAULT_IMG_URL
                                }
                                alt="Restaurant_img"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">{restaurant?.name}</h2>
                                <p className="text-gray-500 text-sm border"> 
                                     <MdOutlineLocationCity className="inline text-cyan-700 mx-2"/>
                                     {restaurant?.city}
                                </p>
                            </div>
                        </div>
                        <div className="m-auto p-4 text-gray-800 bg-white my-2 h-40 overflow-y-scroll no-scrollbar">
                            {items?.map((item, index) => (
                                <div key={index} className="flex items-center my-1">
                                    <span className="mr-2">
                                        {item[0]?.card?.info?.itemAttribute?.vegClassifier === "VEG" ? (
                                            <BsRecordCircle className="text-green-700 inline" />
                                        ) : (
                                            <IoCaretUpCircleOutline className="text-red-700 inline" />
                                        )}
                                    </span>
                                    <span className="w-60 text-sm">{item[0]?.card?.info?.name}</span>
                                    <div className="bg-white shadow-sm shadow-zinc-500 mx-10 mt-2 w-40 text-center h-10 text-orange-500 rounded-lg">
                                        <button
                                            className="mx-2 w-5 font-bold my-1"
                                            onClick={(e) => handleCount(e, item[0])}
                                        >
                                            -
                                        </button>
                                        <span className="text-lg">{item[1]}</span>
                                        <button
                                            className="mx-2 w-5 font-bold my-1"
                                            onClick={(e) => handleCount(e, item[0])}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="w-20 text-right">
                                        ₹
                                        {item[0]?.card?.info?.price
                                            ? item[0]?.card?.info?.price / 100
                                            : item[0]?.card?.info?.defaultPrice / 100}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-10 w-80 bg-gray-100 m-auto">
                              <RiDoubleQuotesL className="inline m-auto mx-1"/>
                              <input placeholder="Any suggestions? We will pass it on..." 
                              className="text-sm  text-center m-auto h-10 w-60 outline-none bg-gray-100"/> 
                        </div>
                        <div className="flex justify-between my-4">
                            <button
                                className="bg-white shadow-lg mx-10 mt-2 w-40 text-center h-10 text-orange-500 rounded-lg hover:shadow-zinc-500"
                                onClick={handleClearCart}
                            >
                                Clear cart
                            </button>
                            <Link to={"/restaurants/" + resId}>
                                <button className="bg-white shadow-lg mx-10 mt-2 w-40 text-center h-10 text-orange-500 rounded-lg hover:shadow-zinc-500">
                                    Add more items
                                </button>
                            </Link>
                        </div>
                        <div className="border border-gray-300 py-4">
                            <div className="flex items-center p-2 mb-4">
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
                                        className="text-sm"
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
                                        className="text-sm"
                                    >
                                        <b>Opt in for No-contact Delivery</b> <br />
                                         <span  className="text-zinc-400">Our delivery partner will call to confirm. 
                                               Please ensure that your address has all the required details.
                                        </span>
                                    </label>
                                )}
                            </div>
                        </div>
                        <div className="border-t border-gray-300 pt-4 mt-4 text-xs m-auto">
                            <div className="grid grid-cols-2 gap-2 text-gray-800">
                                <span className="col-span-2 font-semibold text-lg">Bill Details</span>
                                <span>Item Total</span>
                                <span className="text-right">₹ {totalPrice}</span>
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
                              <b className="font-semibold cursor-pointer">TO PAY</b>
                              <p className="font-semibold">
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
                    <div className="text-center">
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
