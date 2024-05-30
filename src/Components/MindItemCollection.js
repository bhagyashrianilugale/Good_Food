import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const MindItemCollection = ()=>{

    const{ itemId } = useParams();
    const [ mindItem, SetMindItem ] = useState(null);
    console.log(itemId)

    useEffect(()=>{
          fetchData();
    }, []);

    const fetchData = async()=>{
       const response = await fetch("https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com/collections/80406?collection_id=80406&tags=layout_CCS_Tea&type=rcv2");
       const json = await response.json();
       console.log(json);

    }
   
    return (mindItem?.length == 0)
            ?  <Shimmer/>
            :  (
                <div>
                   <div>Mind Items COlletions</div>
                </div>
              )
};

export default MindItemCollection;