import { useEffect } from "react";

const User = (props)=>{
    const { name } = props;

    useEffect(()=>{
});
    return(
        <div className="user">
              <h1>Name: {name}</h1>
              <h3>Contact: bhagyashriugale6970@gmail.com</h3>
        </div>

    )
};

export default User;