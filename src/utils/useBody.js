import { useState, useEffect } from 'react';
import { SWIGGY_URL } from './constant';

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

