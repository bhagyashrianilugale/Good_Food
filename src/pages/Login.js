import React, { useEffect, useRef, useState } from 'react'
import { LOGIN_PAGE_IMG } from '../utils/constant';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";

const Login = () => {
   const [ isLogged, setisLogged ] = useState(false);
   const [ phone, setPhone ] = useState(null);
  
   const otpVerification = (e)=>{
          e.preventdefault;
   }

   const otpGenerator = ()=>{
          const isPhone = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone.slice(phone.length-10));
          if(isPhone){
            
          }
   }

   useEffect(()=>{
        otpGenerator();
   }, [phone]);



  return (
     <>
       <div className="h-[70%] w-4/12 bg-white m-auto my-[10%] shadow shadow-orange-500 p-8">
               <div className="flex justify-between">
                    <p className="text-lg">
                        <b className="text-3xl py-2">{isLogged ? "Log in" : "Sign up"}</b><br/>
                        or <span className= "text-orange-500 font-bold cursor-pointer" onClick={()=>setisLogged(!isLogged)}>{isLogged ? "create an account":"login to your accout"}</span>
                    </p>
                    <img 
                       src={ LOGIN_PAGE_IMG } 
                       alt="login_img"
                       className="w-40 h-20"
                       />
               </div>
               <form className="my-8">
               <PhoneInput
                   country={"us"}
                   value={phone}
                   onChange={(phone)=>setPhone(phone)}
                   placeholder="Enter mobile number"
                   className="shadow-lg w-[70%] my-1"/>

                  { !isLogged && 
                    <span>
                      <input type="text" 
                          id="username" 
                          name="username" 
                          placeholder="Name"
                          className="inline-block outline-none h-10 w-[80%] border border-zinc-200 shadow-lg shadow-gray-200 rounded-lg my-1 px-2"/>
                      <input type="text" 
                          id="email" 
                          name="email" 
                          placeholder="Email"
                          className="inline-block outline-none h-10 w-[80%] border border-zinc-200 shadow-lg shadow-gray-200 rounded-lg my-1 px-2"/>
                  </span>
                  }
                      <input type="text" 
                          id="otp" 
                          name="otp" 
                          placeholder="Enter OTP"
                          className="inline-block outline-none h-10 w-[80%] border border-zinc-200 shadow-lg shadow-gray-200 rounded-lg my-1 px-2"/>
                       <button typ="submit" onClick={otpVerification} className="rounded-lg p-2 block h-10 w-[80%] font-semibold bg-orange-500 text-white my-4 hover:bg-orange-600">
                               Verify OTP
                      </button>
                       <p className="text-xs font-normal w-[80%]">By clicking on login, I accept the <b>
                             Terms & Conditions & Privacy Policy
                             </b> 
                      </p>
              </form>
       </div>
     </>
  )
}

export default Login;
