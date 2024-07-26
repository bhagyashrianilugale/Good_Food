import { GiHamburger } from "react-icons/gi";
import { ImSpinner2 } from "react-icons/im";

const Shimmer = ()=>{
        
return <div className="w-full h-[80%] mt-[6%]">
            <div className="bg-slate-950 w-full h-1/4">
                  <div className="py-20">
                       <ImSpinner2 
                           className="animate-spin w-24 h-24 font-thin mx-auto opacity-70 text-white"/>
                       <GiHamburger 
                           className="w-14 h-10 text-white block top-[32%] p-1  mx-[48%] absolute"/></div>
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