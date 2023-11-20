import  { useEffect, useState } from 'react'

const PRIFIX='ui-compiler'

const useLocalStorage = (key:string,initialValue:any) => {
    const prefixedKey=PRIFIX+key;
    const [value,setValue]=useState(()=>{
      const jsonValue=localStorage.getItem(prefixedKey);
      if(jsonValue!==null){
        return JSON.parse(jsonValue);
      }
      if(typeof initialValue==="function"){
        return initialValue()
      }else{
        return initialValue;
      }
  });

  useEffect(()=>{

  },[prefixedKey,value]);


  return {value,setValue};
}

export default useLocalStorage