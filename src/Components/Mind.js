import { Link } from "react-router-dom";

const Mind = (props)=>{
    const { mindItemsData} = props;
     return(
        <div>
           <h1 className="font-bold text-2xl mx-12">What's on your mind?</h1>
           <div className="flex overflow-x-scroll   no-scrollbar m-6 p-4">
                {mindItemsData.info.map((item)=>{
                return(
                <Link key={item.id}
                    to= {"/collections/"+ item.id}>
                   <div className="w-20 h-20 m-2">
                      <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/"+item.imageId}  alt="itemImg"/>
                   </div>
                </Link>
                )
            })}
             </div>
        </div>

    )
};

export  default Mind;