import { useEffect, useState } from 'react'
import axios from 'axios';
const useFeth = (url:string) => {
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);

   /**
   * GET COMPILER LIST
   * @param url
   */
  const getList = (url: string) => {
    setLoading(true);
    axios.get(url).then(({ data }) => {
        // console.log("===================Responseeeeee",data)
        if (data && data.status) {
          setData(data);
        }
      })
      .catch((err) => {
        console.error(err)
        setLoading(false);
        setError(err);
      });
      setLoading(false);
  };

  useEffect(()=>{
    if(url!==""){
        getList(url)
    }
  },[url])
  return {data,error,loading}
}

export default useFeth;