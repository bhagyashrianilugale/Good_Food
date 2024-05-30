import { useSelector } from "react-redux";
import ItemCard from "./ItemCard";
import { useDispatch } from "react-redux";
import { clearItem } from "../utils/cartSlice";

const Cart = ()=>{
    const cartItem = useSelector((store)=>( store.cart.items ));
    console.log(cartItem);

    const dispatch = useDispatch();

    const handleClearCart = ()=>{
          dispatch(clearItem ())
    }
    return(
        
        <div className="p-6">
             <h1 className="font-bold text-center m-4">Cart</h1>
             <div className="flex justify-center">
                      <button onClick= {handleClearCart} className="p-2 rounded-sm font-semibold bg-orange-500 text-white">Clear Cart</button>
             </div>
               <div className="border-grey-200 m-auto w-6/12">
                {cartItem.length == 0
                   ? <div>
                       <img src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png" alt="emptyCartimg"/>
                    </div>
                   : <ItemCard items={cartItem}/>
                   }
               </div>
        </div>
    )
}

export default Cart;