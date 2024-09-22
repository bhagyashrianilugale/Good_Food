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
const SWIGGY_URL =  process.env.REACT_APP_SWIGGY_URL;

const Body = () => {
    // second commit
    const dispatch = useDispatch();
    const { listOfRestaurant, filteredRestaurant } = useSelector((store) => store.restaurant);
    const mindItem = useSelector((store) => store.restaurant.mindItems);
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
          <div className="px-4 sm:w-full my-8 sm:h-80 -mb-16
                               rounded-b-3xl mt-[6%] hero_section">
                    <div className="h-40 sm:h-60 w-[70%] md:w-[40%] mx-[40%] md:mx-[60%] mt-10 opacity-95">
                          <h1 className="font-bold mx-0 md:mx-6 text-center text-sm sm:text-2xl md:text-4xl pt-[20%]">
                              Best <i className="text-orange-500"> food</i> for your taste
                          </h1>
                          <i className="font-bold text-sm sm:text-lg md:text-2xl mx-6 sm:px-[20%] md:px-0 md:mx-[16%] underline">&quot; Choose, Order & TakeOut &quot;</i>
                    </div>
               </div>
               <div className="w-full md:w-11/12 m-auto">
                   {/**Mind Items Section */}
                   
                   <div className="flex mx-14 mt-[15%] sm:mt-[3%] md:mt-0">
                         <div className="flex overflow-x-scroll no-scrollbar">
                           { mindItem?.map((item, index) => (
                             <Mind key={index} imageId={item.imageId} 
                                               itemLink={item.action.link} 
                                               itemName={item.action.text} />
                            ))}
                         </div>
                   </div>
                 
                {/**Restaurants with online food delivery Section */}
                <h1 className="font-bold text-xl text-center sm:text-2xl md:my-8 md:mx-4 py-8 ml-4">
                           Restaurants with online food delivery<br/>
                           <i className="text-orange-500 underline">&quot; Freshness in every bite &quot;</i>
                </h1>
                <div className="flex">
                    <div className="flex-none w-full overflow-x-scroll no-scrollbar sm:flex text-xs md:text-lg sm:justify-evenly">
                          <Search />
                          <button className="rounded-xl mx-[30%] my-2 sm:m-0 w-30 h-8 py-1 sm:py-0 px-2 bg-white shadow-sm border-2 border-black flex">
                            <p
                                className="px-1"
                                onClick={() => handleFilter('price300to600', (itemInfo) => 300 < itemInfo?.info?.costForTwo?.slice(1, 4) < 600)}
                            >
                                Rs.300-Rs.600
                            </p>
                            {activeFilters.price300to600 && <span onClick={() => handleCross('price300to600')}>
                                     <RxCross1 className="p-1 sm:p-0 sm:pt-2 text-xl" /></span>}
                        </button>

                        <button className="rounded-xl h-8 py-1 mx-[30%] my-2 sm:m-0  sm:py-0 px-2 bg-white shadow-sm border-2 border-black flex">
                            <p
                                className="sm:px-1"
                                onClick={() => handleFilter('lessThan300', (itemInfo) => itemInfo?.info?.costForTwo?.slice(1, 4) < 300)}
                            >
                                Less than Rs.300
                            </p>
                            {activeFilters.lessThan300 && <span onClick={() => handleCross('lessThan300')}>
                                     <RxCross1 className="p-1 sm:p-0 sm:pt-2 text-xl"/></span>}
                        </button>

                        <button className="rounded-xl h-8 py-1 mx-[30%] my-2 sm:m-0  sm:py-0 px-2 bg-white shadow-sm border-2 border-black flex">
                            <p
                                className="sm:px-1"
                                onClick={() => handleFilter('fastDelivery', (itemInfo) => itemInfo?.info?.sla?.deliveryTime < 35)}
                            >
                                Fast delivery
                            </p>
                            {activeFilters.fastDelivery && <span onClick={() => handleCross('fastDelivery')}>
                                      <RxCross1 className="p-1 sm:p-0 sm:pt-2  text-xl" /></span>}
                        </button>

                        <button className="rounded-xl h-8 py-1 mx-[30%] my-2 sm:m-0  sm:py-0 px-2 bg-white shadow-sm border-2 border-black flex">
                            <p
                                className="sm:px-1"
                                onClick={() => handleFilter('hotOffers', (itemInfo) =>itemInfo?.info?.aggregatedDiscountInfoV3?.header?.slice(0,2) > 20)}
                            >
                                Hot offers
                            </p>
                            {activeFilters.hotOffers && <span onClick={() => handleCross('hotOffers')}>
                                       <RxCross1 className="p-1 sm:p-0 sm:pt-2 text-xl" /></span>}
                        </button>

                        <button className="rounded-xl h-8 py-1 mx-[30%] my-2 sm:m-0  sm:py-0 px-2 bg-white shadow-sm border-2 border-black flex">
                            <p
                                className="sm:px-1"
                                onClick={() => handleFilter('highRatings', (itemInfo) => 4.0 < itemInfo?.info?.avgRating)}
                            >
                                Ratings 4.0+
                            </p>
                            {activeFilters.highRatings && <span onClick={() => handleCross('highRatings')}>
                                     <RxCross1 className="p-1 sm:p-0 sm:pt-2 text-xl" /></span>}
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
                  
                    <Toprestaurantchain />
                </div>
            </div>
        </>
    ) : <Shimmer />;
};

export default Body;
