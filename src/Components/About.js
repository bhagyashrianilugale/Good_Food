import { Component } from 'react';
import UserClass from "./UserClass";
import { UserContext } from '../utils/UserContext';

class About extends Component {
    // constructor(){
    //     super();
    // }
//    async componentDidMount(){
        
//     }
    
    render(){
        return (
            <div className="text-center">
                <div>
                    <UserContext.Consumer>
                            {({loggedUser})=><h1 className="font-bold">Current User: { loggedUser }</h1>}
                    </UserContext.Consumer>
                </div>
                <h1 className="font-bold">About Us</h1>
                <p>Here is an about information</p>
                 <UserClass  name="Bhagyashri"/>
            </div>
        )

    }
   
}

export default About;