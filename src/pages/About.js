import React from 'react';

const About = () => {

   return (
       <div className="h-full mt-[7%]">
           <div className="flex-1 flex bg-orange-500 text-white">
                    <div className="p-6 m-auto  mt-[1%] w-[40%]">
                        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                        <p className="text-lg px-auto">At Good-Food, our mission is to bring happiness and delight 
                                         to every moment. We aim to be a cherished part of your celebrations and a 
                                         trusted companion in satisfying your cravings. With each meal, we strive to 
                                         make special occasions unforgettable and everyday moments extraordinary. 
                                         At Good-Food, we don't just serve food; we deliver happiness.</p>
                   </div>
                   <div className="mt-8">
                        <img 
                           src={require("../assets/Delivery-boy.jpg")}
                            className="w-60 mx-40 transform cursor-pointer transition-transform duration-500 scale-x-[-1] hover:-translate-x-20"
                        />
                    </div>
            </div>
           <div className="flex-1 flex bg-white text-orange-500">
               <div className="mt-8">
                        <img 
                            src={require("../assets/Delivery-boy.jpg")}                            
                            className="w-60 mx-40 cursor-pointer  transform transition-transform duration-500 hover:translate-x-20"
                        />
                </div>
               <div className="p-6 m-auto w-[40%] text-left">
                   <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                   <p className="text-lg">To become the culinary bridge that brings diverse flavors to every 
                                       doorstep, fostering a global community where every meal is a celebration 
                                       of taste, convenience, and cultural connection.
                   </p>
               </div>
            </div>
       </div>
   );
}

export default About;


