import { useEffect, useState } from 'react'
import axios from 'axios';
const useFeth = (url:string) => {
  const [data,setData]=useState([])
   /**
   * GET COMPILER LIST
   * @param url
   */
  const getList = (url: string) => {
    axios.get(url).then(({ data }) => {
        // console.log("===================Responseeeeee",data)
        if (data && data.status) {
          setData(data);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(()=>{
    if(url!==""){
        getList(url)
    }
  },[])
  return {data}
}

export default useFeth;