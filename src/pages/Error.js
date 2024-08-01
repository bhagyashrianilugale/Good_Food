import { Link, useRouteError } from "react-router-dom";
import { ERROR_IMG } from "../utils/constant";
import { FaArrowRightLong } from "react-icons/fa6";

const Error = ()=>{
    const error = useRouteError();
    return(
        <>  
         <div>
           <div className="m-auto justify-around p-4">
                  <img 
                    className="border-none h-[20%] w-[40%] m-auto"
                    src={ ERROR_IMG } 
                    alt="error_img"/> 
                  <div className="m-auto w-4/12">
                       <h1 className="font-bold text-center">Oops!!</h1>
                       <p className="text-Orange bold text-center">
                              Something wents wrong</p>
                       <p className="text-2xl font-bold my-2 text-center">404 : Page Not Found</p>
                       <Link to={"/"}>
                                <button className="p-2 block rounded-sm font-semibold bg-orange-500 text-white my-2 mx-auto">Go to homepage</button>
                       </Link>
                       <Link to={"/contact"} className="text-lg font-semibold inline">
                            Contact support <FaArrowRightLong/>
                       </Link>
                       
                   </div>
                 </div>
          </div>
       </>
    )
}

export default Error;