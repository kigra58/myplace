import { useEffect, useState } from 'react'
import axios from 'axios';
const useFeth = (url:string,fetchType?:string) => {
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<unknown>(null);

   /**
   * GET COMPILER LIST
   * @param url
   */
  const getList = (url: string) => {
    axios.get(url).then(({ data }) => {
        console.log("===================Responseeeeee",data.data)
        if (data && data.status) {
          setData(data.data);
        }
      })
      .catch((err) => {
        console.error(err)
        setError(err);
      });  
  };
 
  const fetchData=async(url:string)=>{
    try {
      setLoading(true);
      const {data}=await axios.get(url);
      if(data && data.success){
        setData(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };

  useEffect(()=>{
    if(url!=="" && fetchType==="await"){
     fetchData(url);
   }
   else if(url!=="" ){
        getList(url)
    }
  },[url]);

  if(fetchType==="await"){
    return {data,error,loading};
  }else{
    return {data,error};
  }
}

export default useFeth;