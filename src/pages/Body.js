import { RestaurantCard } from "../Components/RestaurantCard";
import { useEffect, useContext, useState } from "react";
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
import { BG_IMG_URL } from "../utils/constant";
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
        console.log(response);
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
            {showHiddenUI && (
                <div className="px-4 w-full my-8 h-60 bg-gradient-to-t -mb-16
                               from-violet-300 rounded-3xl mt-[10%] relative hidden lg:block sm:hidden">
                    <div className="flex justify-around">
                        <h1 className="text-6xl font-extrabold opacity-80">
                            Order Food <br />
                            Online in <br />
                            Nashik
                        </h1>
                        <div className="h-60 w-[30%]">
                            <img src={BG_IMG_URL} alt="background"/>
                        </div>
                    </div>
                </div>
            )}
            <div className="w-10/12 lg:w-9/12 m-auto">
                <h1 className="font-bold text-xl lg:text-3xl sm:text-2xl inline-block mx-4
                              mt-[50%] sm:mt-[22%] md:mt-[22%] lg:mt-[14%] relative">What's on your mind?</h1>
                <div className="flex overflow-x-scroll no-scrollbar p-4 border-b-2">
                    {mindItem?.map((item, index) => (
                        <Mind key={index} imageId={item.imageId} itemLink={item.action.link} itemName={item.action.text} />
                    ))}
                </div>

                <h1 className="font-bold text-xl lg:text-3xl sm:text-2xl md:text-2xl my-4 ml-4 lg:my-8 lg:mx-4">Restaurants with online food delivery in Nashik</h1>
                <div className="flex">
                    <div className="flex overflow-x-scroll no-scrollbar lg:mx-8">
                      <Search />
                          <div className="cursor-pointer text-center text-white bg-orange-400 h-10 mx-4
                                       active:bg-orange-200 rounded-xl flex flex-between px-1">
                            <p
                                className="w-40 sm:w-40 md:w-40 lg:w-35 px-2 py-2"
                                onClick={() => handleFilter('price300to600', (itemInfo) => 300 < itemInfo?.info?.costForTwo?.slice(1, 4) < 600)}
                            >
                                Rs.300-Rs.600
                            </p>
                            {activeFilters.price300to600 && <span onClick={() => handleCross('price300to600')}>
                                     <RxCross1 className="text-lg mr-1 my-3" /></span>}
                        </div>

                        <div className="cursor-pointer text-center text-white bg-orange-400 h-10 mx-4
                                  active:bg-orange-200 rounded-xl flex flex-between px-1">
                            <p
                                className="w-40 sm:w-40 md:w-40 lg:w-35 px-2 py-2"
                                onClick={() => handleFilter('lessThan300', (itemInfo) => itemInfo?.info?.costForTwo?.slice(1, 4) < 300)}
                            >
                                Less than Rs.300
                            </p>
                            {activeFilters.lessThan300 && <span onClick={() => handleCross('lessThan300')}>
                                     <RxCross1 className="text-lg mr-1 my-3" /></span>}
                        </div>

                        <div className="cursor-pointer text-center text-white bg-orange-400 h-10 mx-4
                                  active:bg-orange-200 rounded-xl flex flex-between px-1">
                            <p
                                className="w-40  sm:w-40 md:w-40 lg:w-35 px-2 py-2"
                                onClick={() => handleFilter('fastDelivery', (itemInfo) => itemInfo?.info?.sla?.deliveryTime < 35)}
                            >
                                Fast delivery
                            </p>
                            {activeFilters.fastDelivery && <span onClick={() => handleCross('fastDelivery')}>
                                      <RxCross1 className="text-lg mr-1 my-3" /></span>}
                        </div>

                        <div className="cursor-pointer text-center text-white bg-orange-400 h-10 mx-4
                                 active:bg-orange-200 rounded-xl flex flex-between px-1">
                            <p
                                className="w-40  sm:w-40 md:w-40 lg:w-35 px-2 py-2"
                                onClick={() => handleFilter('hotOffers', (itemInfo) =>itemInfo?.info?.aggregatedDiscountInfoV3?.header?.slice(0,2) > 20)}
                            >
                                Hot offers
                            </p>
                            {activeFilters.hotOffers && <span onClick={() => handleCross('hotOffers')}>
                                       <RxCross1 className="text-lg mr-1 my-3" /></span>}
                        </div>

                        <div className="cursor-pointer text-center text-white bg-orange-400 h-10 mx-4
                                active:bg-orange-200 rounded-xl flex flex-between px-1">
                            <p
                                className="w-40 sm:w-40 md:w-40 lg:w-35 px-2 py-2"
                                onClick={() => handleFilter('highRatings', (itemInfo) => 4.0 < itemInfo?.info?.avgRating)}
                            >
                                Ratings 4.0+
                            </p>
                            {activeFilters.highRatings && <span onClick={() => handleCross('highRatings')}>
                                     <RxCross1 className="text-lg mr-1 my-3" /></span>}
                        </div>
                    </div>
                </div>

                <div className="flex lg:w-11.5/12 flex-wrap cursor-pointer mt-[5%] border-b-2">
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
                <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl md:text-2xl my-4 w-10/12 ml-4 lg:w-10/12 sm:w-full sm:ml-4">Top restaurant chains in Nashik</h1>
                <Toprestaurantchain />
            </div>
        </>
    ) : <Shimmer />;
};

export default Body;
