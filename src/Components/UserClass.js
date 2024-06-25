import React from "react";


class UserClass extends React.Component{

  constructor(props){
      super(props);
      console.log("child constructor");

      this.state = {
         userInfo: {
            name:"Bhagyashri"
         }
    }
}
 
async componentDidMount(){
        const Data = await fetch("https://api.github.com/users/bhagyashrianilugale");
        let Json = await Data.json();
        this.setState({
            userInfo: Json
        });
    this.timer = setInterval(()=>{
        console.log("Bhagyashri");
    },1000);

}

 componentDidUpdate(){
    console.log("child component did update called");
 }

 componentWillUnmount(){
     console.log("child component unmount");
     clearInterval(this.timer);
 }

 render(){
        const { name, avatar_url} = this.state.userInfo;
        {console.log( `child render`)}
        return (
            
            <div>
                <div>
                   <h1>Name: {this.state.userInfo.name}</h1>
                   <h3>Contact: bhagyashriugale6970@gmail.com</h3>
                </div>
                <div className="shadow-lg max-w-xs mt-4 mx-auto p-4">
                   <img src={avatar_url}></img>
                 </div>
            </div>
        )
    }

};

export default UserClass;