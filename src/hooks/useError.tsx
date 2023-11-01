import  { useState } from 'react'

const useError = (fiedValue:string) => {
   const [formError,setFormError]=useState({
    isError:false,
    message:""
   });

   return {formError,setFormError};
}

export default useError;