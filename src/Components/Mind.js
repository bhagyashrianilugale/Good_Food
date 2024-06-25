import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constant";
import useMind from "../utils/useMind";
import { useDispatch } from "react-redux";
import { addfilteredMindItems } from "../utils/restaurantSlice";

const Mind = ({ imageId, itemLink })=>{
     
    // Slice itemid from itemLink and pass into useMind custom hook to get filtered mind items
    const itemId = itemLink.slice(35,40);
    const filteredMindItems = useMind(itemId);
    const dispatch = useDispatch();
    dispatch(addfilteredMindItems(filteredMindItems));
     return(
        <>
           <div>
              <Link key={ itemId }
                    to= { "/collections/"+ itemId }>
                   <div className="w-40 h-40">
                        <img src={ CDN_URL + imageId }  alt="itemImg"/>
                   </div>
              </Link>
            </div>
        </>

    )
};

export  default Mind;