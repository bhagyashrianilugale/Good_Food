import { GiHamburger } from "react-icons/gi";
import { ImSpinner2 } from "react-icons/im";

const Shimmer = ()=>{
        
return <div className="w-full h-[80%] mt-[6%]">
            <div className="bg-slate-950 w-full h-1/6 md:h-1/4">
                  <div className="py-20">
                       <ImSpinner2 
                           className="animate-spin block mt-20 md:mt-0 w-24 h-24 md:w-24 md:h-24 font-thin mx-auto 
                                      md:mx-auto opacity-70 text-white"/>
                       <GiHamburger 
                           className="w-12 h-10 p-1 pl-4 text-white block top-[34%] sm:top-[38%] md:top-[30%] 
                                      mx-[42%] sm:mx-[46%] md:mx-[48%] absolute"/>
                   </div>
                   <div>
                       <p className="text-lg sm:text-xl py-10 text-center bottom-4 text-white">Looking for great food near you...</p>
                  </div>
            </div>

            <div className="flex flex-wrap w-full sm:w-full md:w-11/12 sm:mx-4 md:mx-auto animate-pulse">
              <div className='m-6 md:m-10 p-4 w-[250px] md:w-[300px] bg-slate-200  rounded-lg h-60'></div>
              <div className='m-6 md:m-10 p-4 w-[250px] md:w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-6 md:m-10 p-4 w-[250px] md:w-[300px] bg-slate-200  rounded-lg h-60 '></div> 
              <div className='m-6 md:m-10 p-4 w-[250px] md:w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-6 md:m-10 p-4 w-[250px] md:w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-6 md:m-10 p-4 w-[250px] md:w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-6 md:m-10 p-4 w-[250px] md:w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-6 md:m-10 p-4 w-[250px] md:w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-6 md:m-10 p-4 w-[250px] md:w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-6 md:m-10 p-4 w-[250px] md:w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-6 md:m-10 p-4 w-[250px] md:w-[300px] bg-slate-200  rounded-lg h-60 '></div>
              <div className='m-6 md:m-10 p-4 w-[250px] md:w-[300px] bg-slate-200  rounded-lg h-60 '></div>  
            </div>
       </div>
}
 
export default Shimmer;