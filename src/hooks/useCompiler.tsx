import axios from "axios";
import { useState } from "react";
import { COMPILER_URL } from "../constant";

interface IProps {
  code: string;
  language: string;
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

  return {
    compilerLoading,
    compilerOutput,
    setCompilerOutput,
    compileHandler,
    compilerData,
    setCompilerData,
  };
};

export default useCompiler;
