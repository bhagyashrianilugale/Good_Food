import UserClass from "../components/UserClass";
import { UserContext } from '../utils/UserContext';

import React from 'react'

const About = () => {
  return (
     <>
        <div className="text-center mt-[10%]">
         <div>
               <UserContext.Consumer>
                    {({loggedUser})=><h1 className="font-bold">Current User: { loggedUser }</h1>}
               </UserContext.Consumer>
        </div>
        <h1 className="font-bold">About Us</h1>
            <p>Here is an about information</p>
            <UserClass  name="Bhagyashri"/>
        </div>
     </>
  )
}

export default About;


// class About extends Component {
//     // constructor(){
//     //     super();
//     // }
// //    async componentDidMount(){
        
// //     }
    
//     render(){ return(

// <div className="bg-white min-h-screen mt-[5%]">
//       {/* Header */}
//       <header className="bg-white text-orange-500 text-center py-6 border-b border-gray-200">
//         <h1 className="text-4xl font-bold">About Us</h1>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
//         {/* Welcome Message */}
//         <section className="mb-10">
//           <h2 className="text-2xl font-bold mb-4 text-orange-500">Welcome to good Food!</h2>
//           <p className="text-orange-500">
//             At good Food, we bring food lovers and restaurants together with a seamless, easy-to-use food ordering app. Our mission is to make ordering food simple, fast, and enjoyable.
//           </p>
//         </section>

//         {/* Who We Are */}
//         <section className="mb-10">
//           <h2 className="text-2xl font-bold mb-4 text-orange-500">Who We Are</h2>
//           <p className="text-orange-500">
//             A team of food enthusiasts and tech experts, dedicated to enhancing your dining experience by connecting you with a variety of local and international cuisines.
//           </p>
//         </section>

//         {/* Why Choose Us */}
//         <section className="mb-10">
//           <h2 className="text-2xl font-bold mb-4 text-orange-500">Why Choose Us</h2>
//           <ul className="list-disc pl-5 space-y-2 text-orange-500">
//             <li><strong>Variety:</strong> Extensive menu options.</li>
//             <li><strong>Convenience:</strong> User-friendly interface and real-time tracking.</li>
//             <li><strong>Quality:</strong> Partnering with top-rated restaurants.</li>
//             <li><strong>Support:</strong> Dedicated customer service.</li>
//           </ul>
//         </section>

//         {/* Vision Statement */}
//         <section>
//           <h2 className="text-2xl font-bold mb-4 text-orange-500">Our Vision</h2>
//           <p className="text-orange-500">
//             Thank you for choosing good Food – delivering happiness, one meal at a time.
//           </p>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white text-orange-500 text-center py-6 border-t border-gray-200">
//         <p>Contact Information</p>
//         <p>Social Media Links</p>
//       </footer>
//     </div>
  














//         // return (
//         // <>
//         //     <div className="text-center mt-[10%]">
//         //         <div>
//         //             <UserContext.Consumer>
//         //                     {({loggedUser})=><h1 className="font-bold">Current User: { loggedUser }</h1>}
//         //             </UserContext.Consumer>
//         //         </div>
//         //         <h1 className="font-bold">About Us</h1>
//         //         <p>Here is an about information</p>
//         //          <UserClass  name="Bhagyashri"/>
//         //     </div>
//         // </>
//         // )

// )}
   
// }

// export default About;