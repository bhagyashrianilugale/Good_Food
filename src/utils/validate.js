import React from "react";
import { RxCrossCircled } from "react-icons/rx";



const checkValidData = ( email, username )=>{
    
  const isValidEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
  const isValidUsername = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/.test(username);
     
      if( !isValidEmail && (email.length !== 0)) return(
        <React.Fragment>
           <div className="flex m-2">
                <span className="m-1 font-extrabold"> <RxCrossCircled /> </span>  Invalid Email-id
           </div>
        </React.Fragment>
      );
      if( !isValidUsername && (username.length !== 0) ) return(
        <React.Fragment>
           <div className="flex m-2">
               <span className="m-1 font-extrabold"> <RxCrossCircled /> </span>  Invalid Username
           </div>
        </React.Fragment>
      );
     
     
      return(null)

}





export default checkValidData;