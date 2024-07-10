import { addItem, increaseCount, decreaseCount }  from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsRecordCircle } from "react-icons/bs";
import { IoCaretUpCircleOutline } from "react-icons/io5";
import { DEFAULT_IMG_URL } from "../utils/constant";
const CDN_URL = process.env.REACT_APP_CDN_URL;

const ItemCard =({ item, restaurants }) =>{
  
  const {items, restaurant } = useSelector((store)=>( store.cart));
  const dispatch = useDispatch();

    const handleCount= (e, item) => { 
         if(e.target.innerText == "Add +"){
                               dispatch(addItem({ item: [item, 1], restaurant: restaurants }));
                               
         }if(e.target.innerText == "+"){
                              const id = item?.card?.info?.id;
                              dispatch(increaseCount(id));

         }else if(e.target.innerText == "-"){
                               const id = item?.card?.info?.id;
                               dispatch(decreaseCount(id));
         }
    }

return(
        <>
            <div className="p-2 m-2 border-grey-200 border-b-2 text-left flex justify-between">
                        <div className="w-9/12">
                                 <div className="py-2 font-medium">
                                           <span>
                                             {item?.card?.info?.itemAttribute?.vegClassifier == 'VEG' 
                                                    ? <BsRecordCircle className="text-green-700 inline text-center m-1"/> 
                                                    : <IoCaretUpCircleOutline  className=" text-red-700 inline text-center m-1" />
                                             }
                                             { item?.card.info.name }
                                           </span>
                                             <br/> 
                                             <div className="mx-5">&#8377;{ item?.card.info.price  
                                                ? (item?.card.info.price)/100 
                                                : (item?.card.info.defaultPrice)/100 }
                                             </div>
                                        </div>
                                          <p className="text-xs px-4">{ item?.card.info.description }</p>
                                 </div>
                                 <div className="w-3/12 rounded-lg">
                                           <img src={ item?.card.info.imageId ? (CDN_URL + item?.card.info.imageId) : DEFAULT_IMG_URL } 
                                                className="rounded-lg w-full h-[60%] mt-5 relative" 
                                                alt="item_card_img"/> 
                                                <div className="p-2 bg-white shadow-lg mx-10 w-25 h-10 -mt-3 absolute text-green-500 rounded-lg hover:shadow-black">
                                                {items?.filter(
                                                   (itm) => (itm[0]?.card?.info?.id == item?.card?.info?.id)
                                                       ).length == 0
                                                        ? <button className="mx-2" onClick = {(e)=> handleCount(e, item) } >Add +</button>
                                                        :  ( <div>
                                                               <button className="mx-2" onClick = {(e)=> handleCount(e, item) }>-</button>
                                                                {items.map((itm, index)=>(itm[0]?.card?.info?.id == item?.card?.info?.id 
                                                                                         ?<span key={ index }>{itm[1]}</span>
                                                                                         : null)
                                                                                   
                                                                )}
                                                               <button className="mx-2" onClick={(e)=> handleCount(e, item) }>+</button>
                                                             </div>
                                                          )
                                                    }
                                   </div>

                          </div>
                </div>
          </>
    )
};

export default ItemCard;