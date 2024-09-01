import { Link } from "react-router-dom";
const CDN_URL = process.env.REACT_APP_CDN_URL;

const Mind = ({ imageId, itemLink, itemName })=>{
  // Slice itemid from itemLink and pass into useMind custom hook to get filtered mind items
    const resId = itemLink.slice(35,40);
   
   return(
        <>
             <Link key={ resId }
                    to= { "/collections/"+ resId +"/"+ itemName }>
                   <div className="w-10 h-10 px-2 rounded-full bg-orange-100 shadow-orange-50 sm:w-20 sm:h-20 md:w-40 md:h-40 sm:px-4">
                        <img src={ CDN_URL + imageId }  alt="itemImg" className="enhanced-image"/>
                   </div>
              </Link>
      </>
    )
};

export  default Mind;