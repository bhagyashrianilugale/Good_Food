import { RestaurantCard } from "../Components/RestaurantCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { withPromotedLabel } from "../Components/RestaurantCard";
import Mind from "../Components/Mind";
import Toprestaurantchain from "../Components/Toprestaurantchain";
import { addMindItems, addfilteredRestaurants, addlistOfRestaurants } from "../utils/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import Shimmer from "../Components/Shimmer";
import Search from "../Components/Search";
import { RxCross1 } from "react-icons/rx";
import  Background_img from "../assets/Background_img.jpg";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
const SWIGGY_URL =  process.env.REACT_APP_SWIGGY_URL;

const Body = () => {
  
    const dispatch = useDispatch();
    const { listOfRestaurant, filteredRestaurant } = useSelector((store) => store.restaurant);
    const mindItem = useSelector((store) => store.restaurant.mindItems);
    const showHiddenUI = useSelector((store) => store.restaurant.showHiddenUI);
    const status = useOnline();
    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
    const [activeFilters, setActiveFilters] = useState({
        fastDelivery: false,
        price300to600: false,
        lessThan300: false,
        hotOffers: false,
        highRatings: false
    });

    const fetchData = async () => {
        const response = await fetch(SWIGGY_URL);
        const jsonData = await response.json();
        dispatch(addlistOfRestaurants(jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants));
        dispatch(addfilteredRestaurants(jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants));
        dispatch(addMindItems(jsonData?.data?.cards[0]?.card?.card?.imageGridCards?.info));
    };

    const handleFilter = (filterName, filterCondition) => {
        const items = listOfRestaurant?.filter(filterCondition);
        if (items?.length) {
            dispatch(addfilteredRestaurants(items));
            setActiveFilters((prev) => ({ ...prev, [filterName]: true }));
        }
    };

    const handleCross = (filterName) => {
        dispatch(addfilteredRestaurants(listOfRestaurant));
        setActiveFilters((prev) => ({ ...prev, [filterName]: false }));
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (status == false) return <h1 className="m-auto font-bold text-2xl text-center">You're in Offline mode !!!</h1>;

    return listOfRestaurant?.length ? (
        <>
          <div className="px-4 w-full my-8 h-80 -mb-16
                               rounded-b-3xl mt-[6%] hidden md:block sm:hidden hero_section">
                    <div className="h-60 w-[40%] mx-[60%] mt-10 opacity-95">
                          <h1 className="font-bold mx-6 text-center text-4xl pt-[20%]">
                              Best <i className="text-orange-500"> food</i> for your taste
                          </h1>
                          <i className="font-bold text-2xl mx-[16%] underline">&quot; Choose, Order & TakeOut &quot;</i>
                    </div>
               </div>
               <div className="w-full md:w-11/12 m-auto">
                   {/**Mind Items Section */}
                   {/* <IoIosArrowDropleftCircle 
                              className="w-5 h-5 text-orange-500 z-50"
                              onClick={()=>(this.scrollLeft +=100)}/> */}
                   <div className="flex mx-12 mt-[40%] sm:mt-[20%] md:mt-0">
                         <div className="flex overflow-x-scroll no-scrollbar">
                           { mindItem?.map((item, index) => (
                             <Mind key={index} imageId={item.imageId} 
                                               itemLink={item.action.link} 
                                               itemName={item.action.text} />
                            ))}
                         </div>
                   </div>
                 {/* <IoIosArrowDroprightCircle 
                              className="w-5 h-5 text-orange-500 z-50"
                              onClick={()=>(this.scrollRight +=100)}/>
            */}
                {/**Restaurants with online food delivery Section */}
                <h1 className="font-bold text-xl text-center sm:text-2xl md:my-8 md:mx-4 py-8 ml-4">
                         Restaurants with online food delivery<br/>
                           <i className="text-orange-500 underline">&quot; Freshness in every bite &quot;</i>
                </h1>
                <div className="flex">
                    <div className="flex justify-evenly w-full overflow-y-hidden overflow-x-scroll no-scrollbar">
                      <Search />
                          <button className="rounded-xl h-8 px-2 mx-4 bg-white shadow-sm border-2 border-black w-min-40 flex">
                            <p
                                className="px-1"
                                onClick={() => handleFilter('price300to600', (itemInfo) => 300 < itemInfo?.info?.costForTwo?.slice(1, 4) < 600)}
                            >
                                Rs.300-Rs.600
                            </p>
                            {activeFilters.price300to600 && <span onClick={() => handleCross('price300to600')}>
                                     <RxCross1 className="pt-2 text-xl" /></span>}
                        </button>

                        <button className="rounded-xl h-8 px-2 bg-white shadow-sm border-2 border-black w-min-40 flex">
                            <p
                                className="px-1"
                                onClick={() => handleFilter('lessThan300', (itemInfo) => itemInfo?.info?.costForTwo?.slice(1, 4) < 300)}
                            >
                                Less than Rs.300
                            </p>
                            {activeFilters.lessThan300 && <span onClick={() => handleCross('lessThan300')}>
                                     <RxCross1 className="pt-2 text-xl"/></span>}
                        </button>

                        <button className="rounded-xl h-8 px-2 bg-white shadow-sm border-2 border-black w-min-40 flex">
                            <p
                                className="px-1"
                                onClick={() => handleFilter('fastDelivery', (itemInfo) => itemInfo?.info?.sla?.deliveryTime < 35)}
                            >
                                Fast delivery
                            </p>
                            {activeFilters.fastDelivery && <span onClick={() => handleCross('fastDelivery')}>
                                      <RxCross1 className="pt-2 text-xl" /></span>}
                        </button>

                        <button className="rounded-xl h-8 px-2 bg-white shadow-sm border-2 border-black w-min-40 flex">
                            <p
                                className="px-1"
                                onClick={() => handleFilter('hotOffers', (itemInfo) =>itemInfo?.info?.aggregatedDiscountInfoV3?.header?.slice(0,2) > 20)}
                            >
                                Hot offers
                            </p>
                            {activeFilters.hotOffers && <span onClick={() => handleCross('hotOffers')}>
                                       <RxCross1 className="pt-2 text-xl" /></span>}
                        </button>

                        <button className="rounded-xl h-8 px-2 bg-white shadow-sm border-2 border-black w-min-40 flex">
                            <p
                                className="px-1"
                                onClick={() => handleFilter('highRatings', (itemInfo) => 4.0 < itemInfo?.info?.avgRating)}
                            >
                                Ratings 4.0+
                            </p>
                            {activeFilters.highRatings && <span onClick={() => handleCross('highRatings')}>
                                     <RxCross1 className="pt-2 text-xl" /></span>}
                        </button>
                    </div>
                </div>

                <div className="flex md:w-11.5/12 flex-wrap cursor-pointer py-[5%] border-b-2">
                    {filteredRestaurant.length !== undefined && filteredRestaurant.map((restaurant) => (
                        <Link
                            key={restaurant.info.id}
                            to={"/restaurants/" + restaurant.info.id}
                        >
                            {restaurant.info.avgRating > 4.3
                                ? <RestaurantCardPromoted restauList={restaurant} />
                                : <RestaurantCard restauList={restaurant} />}
                        </Link>
                    ))}
                </div>
                <div>
                    <h1 className="font-bold text-xl text-center sm:text-2xl md:my-6 md:mx-4 py-4 ml-4">
                         Top restaurants chain for you<br/>
                           <i className="text-orange-500 underline">&quot; Healthy food for busy people &quot;</i>
                    </h1>
                   {/* <h1 className="font-bold text-xl sm:text-2xl md:text-3xl w-10/12 ml-4 sm:w-full md:w-10/12">
                              Top restaurant chains in for you</h1> */}
                    <Toprestaurantchain />
                </div>
            </div>
        </>
    ) : <Shimmer />;
};

export default Body;
