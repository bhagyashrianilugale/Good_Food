import React from 'react';

const About = () => {

   return (
       <div className="h-full mt-[25%] sm:mt-[16%] md:mt-[8%]">
           <div className="flex-none sm:flex sm:flex-1 bg-orange-500 text-white">
                    <div className="p-4 sm:m-auto w-[90%] sm:w-[50%] text-left">
                        <h2 className="text-lg font-bold mb-4 sm:text-xl md:text-3xl">Our Mission</h2>
                        <p className="text-sm md:text-lg px-auto">At Good-Food, our mission is to bring happiness and delight 
                                         to every moment. We aim to be a cherished part of your celebrations and a 
                                         trusted companion in satisfying your cravings. With each meal, we strive to 
                                         make special occasions unforgettable and everyday moments extraordinary. 
                                         At Good-Food, we don't just serve food; we deliver happiness.</p>
                   </div>
                   <div className="mt-8">
                        <img 
                           src={require("../assets/Delivery-boy.jpg")}
                            className="w-20 hidden sm:block sm:w-40 md:w-60 sm:mx-20 md:mx-40 transform cursor-pointer 
                                       transition-transform duration-500 scale-x-[-1] hover:-translate-x-20"
                        />
                    </div>
            </div>
           <div className="flex-none sm:flex sm:flex-1 bg-white text-orange-500">
               <div className="mt-8">
                        <img 
                            src={require("../assets/Delivery-boy.jpg")}                            
                            className="w-40 sm:w-40 mx-4 sm:mx-20 md:w-60 md:mx-40 cursor-pointer transform 
                                     transition-transform duration-500 -scale-x-[-1] hover:translate-x-20"
                        />
                </div>
               <div className="p-4 sm:m-auto w-[90%] sm:w-[50%] text-left">
                   <h2 className="text-lg font-bold mb-4 sm:text-xl md:text-3xl">Our Vision</h2>
                   <p className="text-sm md:text-lg px-auto">To become the culinary bridge that brings diverse flavors to every 
                                       doorstep, fostering a global community where every meal is a celebration 
                                       of taste, convenience, and cultural connection.
                   </p>
               </div>
            </div>
       </div>
   );
}

export default About;


