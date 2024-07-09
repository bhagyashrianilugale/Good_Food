import { Link, useRouteError } from "react-router-dom";

const Error = ()=>{
    const error = useRouteError();
    return(
        <> 
           <div className="m-auto bg-zinc-200 justify-around p-4">
            
                 <img 
                    className="border-none h-[20%] w-[40%] m-5"
                    src="https://www.creativehatti.com/wp-content/uploads/2022/11/Indian-chef-is-standing-with-wooden-board-14-small.jpg" 
                    alt="error_img"/> 
                  <div className=" absolute top-[50%] mx-20">
                       <h1 className="font-bold">Oops!!</h1>
                       <p className="text-white bold">
                              Something wents wrong yarr!</p>
                       <p className="text-2xl font-bold my-2"> {error.status}: {error.statusText}</p>
                       <div>
                           <b className="block">404 : Page Not Found</b>
                           <Link to={"/"}>
                                <button className="p-2 block rounded-sm font-semibold bg-orange-500 text-white my-2">Go to homepage</button>
                          </Link>
                       </div>
                   </div>
                  
            </div>
       </>
    )
}

export default Error;