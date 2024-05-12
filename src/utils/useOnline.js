import { useEffect, useState } from "react"

const useOnline = ()=>{

    const [status, setStatus] = useState(true);

    useEffect(()=>{
        window.addEventListener("offline", ()=>{
           setStatus(false);
        });
    },[]);

    return status;

}

export default useOnline;