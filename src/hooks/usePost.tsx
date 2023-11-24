import axios from 'axios';
import  {  useState } from 'react'
import { tostMsg } from '../helper/helper';

const usePost = ({url,payload}:{url:string,payload:{}|[]}) => {
  const [responeData,setResponseData]=useState([])
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<unknown>(null);

  const postData=async()=>{
    try {
        setLoading(true);
        const {data}=await axios.post(url,payload);
        if(data && data.success){
            setResponseData(data.data);
        }else{
          tostMsg(data.success,data.message);
          setLoading(false);
        }
    } catch (error) {
        console.error(error);
        setError(error);
    };
    setLoading(false);
  };

  

  return {responeData,loading,error,postData};
}

export default usePost;