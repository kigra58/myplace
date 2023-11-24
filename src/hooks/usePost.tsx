import  {  useState } from 'react'
import axios from 'axios';
import { tostMsg } from '../helper/helper';
import { login } from '../rtk/reducer';
import { useDispatch } from 'react-redux';

const usePost = ({url,payload,from}:{url:string,payload:{}|[],from?:string}) => {
  const [responeData,setResponseData]=useState([])
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<unknown>(null);
  const dispatch = useDispatch();

  const postData=async()=>{
    try {
        setLoading(true);
        const {data}=await axios.post(url,payload);
        if(data && data.success){
            setResponseData(data.data);
            if(from==="login"){
              dispatch(login(data.data));
              localStorage.setItem("ATK",JSON.stringify(data.data))
            }
            if(from==="signup"){
              tostMsg(data.success,data.message);
            }
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