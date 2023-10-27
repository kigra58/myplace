import axios from 'axios';
import  { useEffect, useState } from 'react'

const usePost = ({url,payload}:{url:string,payload:{}|[]}) => {
  const [responeData,setResponseData]=useState([])
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<unknown>(null);

  const postData=async(postUrl:string,postPayload:{}|[])=>{
    try {
        setLoading(true);
        const {data}=await axios.post(postUrl,postPayload);
        if(data && data.success){
            setResponseData(data.data);
        }
        setLoading(false);
    } catch (error) {
        console.error(error);
        setError(error);
    };
    setLoading(false);
  };

  useEffect(()=>{
    if(url!=="" && payload){
        postData(url,payload);
    }
  });

  return {responeData,loading,error};
}

export default usePost;