import axios from "axios";
import { useState } from "react";
import { COMPILER_URL } from "../helper/constant";

interface IProps {
  code: string;
  fileType: string;
  input: string;
}

const useCompiler = (propsData: IProps) => {
  const [compilerLoading, setCompilerLoading] = useState(false);
  const [compilerOutput, setCompilerOutput] = useState("");
  const [compilerData, setCompilerData] = useState(propsData);

  /**
   * CHECK COMPILER
   * @param args
   */
  const compileHandler = async () => {
    try {
      setCompilerLoading(true);
      const { data } = await axios.post(`${COMPILER_URL}`, compilerData);
      if (
        // data &&
        // data.status === 200 &&
        // data.error === "" &&
        // data.output !== ""
        data &&
        data.success
      ) {
        // setCompilerOutput(data.output);
        setCompilerOutput(data.data);
      }
      setCompilerLoading(false);
    } catch (error) {
      console.error(error);
    }
    setCompilerLoading(false);
  };

  return {
    setCompilerOutput,
    compileHandler,
    setCompilerData,
    compilerLoading,
    compilerOutput,
    compilerData,
  };
};

export default useCompiler;
