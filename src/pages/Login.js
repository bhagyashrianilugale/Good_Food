import React, { useRef, useState } from 'react';
import checkValidData from '../utils/validate';
import { LOGIN_PAGE_IMG } from '../utils/constant';
import PhoneInput from 'react-phone-input-2';
import { CgSpinner } from 'react-icons/cg';
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedStatus } from '../utils/cartSlice';
import { Link } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {

   const isLogged = useSelector(store=>store.cart.isLoggedStatus);
   const [ isLog, setIsLog ] = useState(false);
   const [loader, setShowLoader] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [phone, setPhone] = useState("");
   const [otp, setOtp] = useState("");
   const [user, setUser ] = useState(null);
   
   const dispatch = useDispatch();
   
   const email = useRef(null);
   const username = useRef(null);
   const navigate = useNavigate();

   const generateOTP = async(e) =>{
           e.preventDefault();
           setShowLoader(true);
           if(!isLog){
                const message = checkValidData( email.current.value, username.current.value );
                if(message){
                    setErrorMessage(message);
                    setShowLoader(false);
                    return;
                };
             }
            try{
                 const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {'size': 'invisible'});
                 const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
                 setShowLoader(false);
                 setUser(confirmation);
            }catch(err){
            setErrorMessage(err.message);
            console.log(err);
            setShowLoader(false);
          }
    };

   const verifyOTP = async (e) => {
        e.preventDefault();
        try{
          const data = await user.confirm(otp);
          if(data?.operationType=="signIn"){
              dispatch(isLoggedStatus(true));
              toast.success("You are logged Payment successful!");
              navigate("/");
              
           }}catch(err){
             setErrorMessage(err.message);
             console.log(err);
         }
    }
return(<>
        <div className="h-[70%] w-full sm:w-6/12 md:w-4/12 bg-white m-auto my-[40%] sm:my-[16%] md:my-[16%] 
                 sm:shadow sm:shadow-orange-500 md:shadow md:shadow-orange-500 p-10">
               <div className="flex justify-between">
                   <p className="text-lg">
                       <b className="text-2xl lg:text-3xl py-2">{isLog ? "Log in" : "Sign up"}</b><br />
                       or <span className="text-orange-500 font-bold text-base cursor-pointer"
                                onClick={()=>setIsLog(!isLog)}>
                                { isLog ? "create an account" : "login to your account"}
                          </span>
                   </p>
                   <img 
                       src={LOGIN_PAGE_IMG} 
                       alt="login_img"
                       className="w-[30%] h-[35%] lg:w-40 lg:h-20"
                   />
               </div>
                 {!isLog && 
                   <span>
                       <input type="text" 
                           id="username" 
                           name="username"
                           required
                           ref={username} 
                           placeholder="Name"
                           className="inline-block outline-none h-10  w-full sm:w-[96%] md:w-[96%] lg:w-[85%] border 
                                    border-zinc-200 shadow-lg shadow-gray-200 rounded-lg my-1 px-2"
                       />
                       <input type="text" 
                           id="email" 
                           name="email" 
                           ref={email}
                           required
                           placeholder="Email"
                           className="inline-block outline-none h-10 w-full  sm:w-[96%] md:w-[96%] lg:w-[85%] border 
                                    border-zinc-200 shadow-lg shadow-gray-200 rounded-lg my-1 px-2"
                       />
                   </span>
                 }
                <span>
                   <PhoneInput
                       country={"in"}
                       id="phonenumber" 
                       name="phone"
                       required
                       value={phone}
                       onChange={(phone) => setPhone("+" + phone)}
                       placeholder="Enter mobile number"
                       className="shadow-lg w-full lg:w-[85%] my-1"
                   />
                   <button type="submit" onClick={generateOTP} 
                       className="rounded-lg p-2 block h-10 w-full  sm:w-[96%] md:w-[96%] lg:w-[85%] font-semibold 
                               bg-orange-500 text-white my-4 hover:bg-orange-600"
                   >
                    {loader ? <CgSpinner className="w-8 h-8 mx-auto mb-4 animate-spin"/> : "Send OTP"}
                   </button>
                   <div id="recaptcha"></div>
                   <input type="text" 
                       name="otp"
                       value={otp}
                       onChange={(e) => setOtp(e.target.value)}
                       placeholder="Enter OTP"
                       className="inline-block outline-none h-10 w-full sm:w-[96%] md:w-[96%] lg:w-[85%] border border-zinc-200 
                                  shadow-lg shadow-gray-200 rounded-lg my-1 px-2"
                   />
                </span>
               <p className="text-orange-500 text-center font-bold px-2">{errorMessage ? errorMessage : null}</p>
               { isLogged ? <Link to="/"><span className="rounded-lg text-center p-2 block h-10 w-full sm:w-[96%]  md:w-[96%] lg:w-[85%] font-semibold bg-orange-500 
                                      text-white my-4 hover:bg-orange-600" 
                                        onClick={verifyOTP}>
                                          Verify OTP
                                         </span></Link>
                          : <span  onClick={verifyOTP} className="rounded-lg text-center p-2 block h-10 w-full sm:w-[96%]  md:w-[96%]  lg:w-[85%] 
                                 font-semibold bg-orange-500 text-white my-4 hover:bg-orange-600">
                                    Verify OTP
                           </span>}
               <p className="text-xs font-normal w-[80%]">By clicking on login, I accept the <b>
                   Terms & Conditions & Privacy Policy
               </b> 
               </p>
         </div>
       </>
   );
};

export default Login;
