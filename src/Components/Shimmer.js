import { GiHamburger } from "react-icons/gi";
import { ImSpinner2 } from "react-icons/im";

const Shimmer = ()=>{
        
return <div className="w-full h-[80%] mt-[6%]">
            <div className="bg-slate-950 w-full h-1/6 sm:h-1/6  lg:h-1/4">
                  <div className="py-20">
                       <ImSpinner2 
                           className="animate-spin block mt-20 sm:mt-20 lg:mt-0 w-24 h-24 lg:w-24 lg:h-24 font-thin mx-auto 
                                      lg:mx-auto opacity-70 text-white"/>
                       <GiHamburger 
                           className="w-12 h-8 p-1 pl-4 lg:w-14 lg:h-10 text-white block top-[28%] lg:top-[27%] sm:top-[28%] mx-[42%] lg:mx-[48%] absolute"/>
                   </div>
                   <div>
                       <p className="text-xl py-10 text-center bottom-4 text-white">Looking for great food near you...</p>
                  </div>
            </div>

            <div className="flex flex-wrap mx-auto animate-pulse">
              <div className='m-10 p-4 w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-10 p-4 w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-10 p-4 w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-10 p-4 w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-10 p-4 w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-10 p-4 w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-10 p-4 w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-10 p-4 w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-10 p-4 w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-10 p-4 w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-10 p-4 w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-10 p-4 w-[300px] bg-slate-200  rounded-lg h-60 '></div>
            </div>
       </div>
}
 
export default Shimmer;