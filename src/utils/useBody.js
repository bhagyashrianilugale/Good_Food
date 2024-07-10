import { useState, useEffect } from 'react';
const SWIGGY_URL =  process.env.REACT_APP_SWIGGY_URL


const useBody = () =>{ 

    const [data, setData] = useState([]);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async ()=>{
      const getData= await fetch(SWIGGY_URL);
      const json = await getData.json();
      setData(json);
   }

  return data;

}

export default useBody;

