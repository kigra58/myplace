import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COMPILER_URL } from "../../constant";
import Editor from "@monaco-editor/react";
import axios from "axios";
import lodash from "lodash";
import Themes from "./themes.json";
import Toast from "../Navbar/Toast";

interface ILangData {
  code: string;
  language: string;
  input: string;
}

interface ICompiler {
  info: string;
  language: string;
}


const CodeEditor: React.FC = () => {
  const params=useParams();
  const [compilerList, setCompilerList] = useState<ICompiler[]>();
  const [changeTheme, setChangeTheme] = useState("");
  const [changeLang, setChangeLang] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [list, setList] = useState({
    code: "",
    language: "js",
    input: "",
  });


  /**
   * GET COMPILER LIST
   * @param url
   */
  const getList = (url: string) => {
    axios
      .get(url)
      .then(({ data }) => {
        if (data && data.status === 200) {
          setCompilerList(data.supportedLanguages);
        }
      })
      .catch((err) => console.error(err));
  };

  /**
   * CHECK COMPILATION
   * @param args
   */
  const compileHandler = async (args: ILangData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${URL}`, args);
      if (
        data &&
        data.status === 200 &&
        data.error === "" &&
        data.output !== ""
      ) {
        setOutput(data.output);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };


   /**
    * LANGUAGE HANDLER
    * @param e 
    */
  const selectLanguageHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      setChangeLang(e.target.value);
      setList({ ...list, language: e.target.value,input:""});
      setOutput("");

    }
  };


  /**
   * THEME HANDLER
   * @param e 
   */
  const selectThemeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      setChangeTheme(e.target.value);
    }
  };
  
  /**
   * GET PROBLEMS DETAILS
   * @param problemId 
   */
  const getProblemDetails = (problemId:string) => {
      axios.get(
        `http://localhost:3005/api/coding/problem-details/${problemId}`
      ).then(({data})=>{
        if (data && data.success) {
          setList({ ...list, code:data.data.code})
        }
      }).catch((err)=>console.error(err))
    };
   
  /**
   *  UPDATE CODE 
   * @param id 
   * @param code 
   */  
  const updateCode=async(id:string|undefined,code:string)=>{
    try {
      if(id!=="" && code!==""){
      const {data} = await axios.post(`http://localhost:3005/api/coding/create-new-problem`,{
        problemId:id,
        code
      });
      if(data && data.success){
        console.log("===============",data.message);
       return <Toast success={data.success} message={data.message} />
      }else{
       return <Toast success={data.success} message={data.message} />
      }
    }
    } catch (error) {
      console.error(error)
    };
  }  


  useEffect(() => {
    if (COMPILER_URL) {
      getList(COMPILER_URL.concat("/list"));
    }
    if(params && params.id){
      getProblemDetails(params.id)
    }
  }, []);


  return (
    <div>
      <div className="row col-md-8 mt-4 p-1">
        <div className="col-sm-3">
          {/* LANGUAGES SELECT  */}
          <select
            defaultValue="vs-dark"
            onChange={(e) => selectLanguageHandler(e)}
            className="form-control shadow-sm"
            name="Languages"
          >
            {compilerList &&
              compilerList.length > 0 &&
              compilerList.map((it, index) => (
                <option key={index} value={it.language}>
                  {lodash.upperCase(it.language)}
                </option>
              ))}
          </select>
        </div>
        <div className="col-sm-3">
          {/* THEME SELECT    */}
          <select
            defaultValue={Themes[0].value}
            onChange={(e) => selectThemeHandler(e)}
            className="form-control shadow-sm"
            name="Themes"
          >
            {Themes &&
              Themes.length > 0 &&
              Themes.map((it, index) => (
                <option key={index} value={it.value}>
                  {it.name}
                </option>
              ))}
            ;
          </select>
        </div>
      </div>
      <div className="row p-1">
        <div className="col-md-9">
          <Editor
            height="85vh"
            defaultLanguage={"javascript"}
            language={changeLang}
            // defaultValue={changeLang==="py"? "# Write your code": "// write your code"}
            value={list.code}
            theme={changeTheme}
            onChange={(val) => val && setList({ ...list, code: val })}
          />
        </div>
        <div className="col-md-3 ">
          <textarea
            style={{height:240}}
            className="form-control shadow-sm"
            maxLength={10}
            placeholder="INPUT"
          />{" "}
          <br />
          <textarea
             style={{height:280}}
            className="form-control shadow-sm"
            maxLength={10}
            placeholder="OUTPUT"
            value={output}
          />
          <br />
          {/* COMPILE CODE  */}

          <button
            className="btn btn-success"
            onClick={() => compileHandler(list)}
          >
            COMPILE CODE
            {loading && (
              <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>

          {/* SAVE CODE  */}
          <button
            className="btn btn-dark mx-5"
            type="button"
            onClick={() =>updateCode(params.id,list.code)}
          >
            SAVE CODE
            {loading && (
              <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
