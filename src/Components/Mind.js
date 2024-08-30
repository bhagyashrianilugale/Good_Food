import { Link } from "react-router-dom";
const CDN_URL = process.env.REACT_APP_CDN_URL;

const Mind = ({ imageId, itemLink, itemName })=>{
  // Slice itemid from itemLink and pass into useMind custom hook to get filtered mind items
    const resId = itemLink.slice(35,40);
   
   return(
        <>
          <div>
             <Link key={ resId }
                    to= { "/collections/"+ resId +"/"+ itemName }>
                   <div className="w-20 h-[4%] md:w-40 md:h-[10%]">
                        <img src={ CDN_URL + imageId }  alt="itemImg"/>
                   </div>
              </Link>
          </div>
      </>

    )
};

export  default Mind;