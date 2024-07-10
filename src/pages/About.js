import UserClass from "../Components/UserClass";
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


