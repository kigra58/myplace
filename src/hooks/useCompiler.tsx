import axios from 'axios';
import  { useState } from 'react';
import { COMPILER_URL } from '../constant';
// import { ILangData } from '../interfaces';


const useCompiler = ({code,language,input}:{
    code:string;
    language:string;
    input:string
}) => {
    const [compilerLoading,setCompilerLoading]=useState(false);
    const [compilerOutput,setCompilerOutput]=useState("");
    
    /**
     * CHECK COMPILER
     * @param args 
     */
    const compileHandler = async () => {
        try {
            setCompilerLoading(true);
          const { data } = await axios.post(`${COMPILER_URL}`, {code,language,input});
          if (
            data &&
            data.status === 200 &&
            data.error === "" &&
            data.output !== ""
          ) {
            setCompilerOutput(data.output);
          }
          setCompilerLoading(false);
        } catch (error) {
          console.error(error);
        }
        setCompilerLoading(false);
      };

     

  return {compilerLoading, compilerOutput,setCompilerOutput , compileHandler}
}

export default useCompiler