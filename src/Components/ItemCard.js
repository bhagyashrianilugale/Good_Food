import { addItem, increaseCount, decreaseCount }  from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsRecordCircle } from "react-icons/bs";
import { IoCaretUpCircleOutline } from "react-icons/io5";
import { DEFAULT_RESTAURANT_IMG } from "../utils/constant";
import { toast } from "react-toastify";

const CDN_URL = process.env.REACT_APP_CDN_URL;

const ItemCard =({ item, restaurants }) =>{
  
  const { items } = useSelector((store)=>( store?.cart));
  const dispatch = useDispatch();
    const handleCount= (e, item) => { 
         if(e.target.innerText == "ADD"){
                               dispatch(addItem({ item: [item, 1], restaurant: restaurants }));
                               toast.success("Your delicious item added to cart!",{
                                   onClose: 1500,
                                   position: "top-center"
                               });
                               
         }if(e.target.innerText == "+"){
                              const id = item?.card?.info?.id;
                              dispatch(increaseCount(id));
                              toast.success("Your delicious item added to cart!");

         }else if(e.target.innerText == "-"){
                               const id = item?.card?.info?.id;
                               dispatch(decreaseCount(id));
                               toast.warning("Item removed!");
         }
    }

return(
        <>
         <div className="border-grey-200 border-b-2 text-left flex justify-between">
                            <div>
                                  <div className="sm:p-1 md:mx-10 mx-1 sm:mx-8 bg-white w-[16%] sm:w-[12%] md:w-[6%] 
                                                                h-8 md:h-9 -mt-0 absolute text-green-600 z-10 rounded-lg sm:rounded-xl shadow-lg shadow-zinc-500">
                                                  {items?.filter(
                                                   (itm) => (itm[0]?.card?.info?.id == item?.card?.info?.id)
                                                       ).length == 0
                                                        ? <b className="px-3 sm:px-3 md:py-1 text-xs sm:text-lg font-medium" onClick = {(e)=> handleCount(e, item) } >ADD</b>
                                                        :  (<span className="text-xs sm:text-xl">
                                                               <b className="px-2" onClick = {(e)=> handleCount(e, item) }>-</b>
                                                                {items.map((itm, index)=>(itm[0]?.card?.info?.id == item?.card?.info?.id 
                                                                                         ?<b key={ index } >{itm[1]}</b>
                                                                                         : null)
                                                                                   
                                                                )}
                                                               <b className="px-2" onClick={(e)=> handleCount(e, item) }>+</b>
                                                      </span>
                                                  )}
                                    </div>
                                    <img 
                                      src={ item?.card?.info?.imageId?.length ? CDN_URL + item?.card?.info?.imageId : DEFAULT_RESTAURANT_IMG } 
                                      className="my-4 w-20 h-20 sm:w-40 sm:h-30 md:h-40 shadow-lg -top-1 shadow-zinc-400 relative" 
                                      alt="item_card_img"/>
                            
                             </div>
                             <div className="w-9/12">
                             <div className="py-2 px-2 md:px-4">
                                              <span>
                                                 { item?.card?.info?.itemAttribute?.vegClassifier == 'VEG' 
                                                    ? <BsRecordCircle className="text-green-700 inline text-center m-1"/> 
                                                    : <IoCaretUpCircleOutline  className=" text-red-700 inline text-center m-1" />
                                                 }
                                                <p className="truncate mx-2 w-6 text-sm sm:text-lg inline text-orange-400 font-semibold">
                                                   { item?.card.info.name }
                                                </p>
                                               </span>&nbsp;
                                               <span className="m-auto">&#8377;{ item?.card.info.price  
                                                ? (item?.card.info.price)/100 
                                                : (item?.card.info.defaultPrice)/100 }
                                              </span>
                                              <hr className="w-40 sm:w-60 md:w-80 h-0.5 text-center mt-4 bg-black"/>
                                      <p className="text-xs sm:text-sm  line-clamp-2 mx-4 md:line-clamp-4">{ item?.card.info.description }</p>
                               </div>
                          </div>
                  </div>
          </>
    )
};

export default ItemCard;