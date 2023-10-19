import React, { useEffect, useState } from "react";
import axios from "axios";
import { COMPILER_URL, CodingEndpoints, firstELe, lastELe } from "../../constant";
import Editor from "@monaco-editor/react";
import Themes from "./themes.json";
import lodash from "lodash";
import Toast from "../Navbar/Toast";


interface ICategory{
  category:string;
}


const AddProblem: React.FC = () => {
  const [categoryList,setCotegoryList]=useState<ICategory[]>([])
  const [compilerList,setCompilerList]=useState([])
  const [loading,setLoading]=useState(false);
  const [changeText, setChangeText] = useState({
    title: "",
    category: "",
    language: "",
    code: "",
    thema: "vs-dark",
  });


const onSubmit= async () => {
    try {
      setLoading(true);
      const {title,category,code}=changeText;
      const {data}=await axios.post(`${CodingEndpoints.CREATE_NEW_PROBLEM}`,
      {code,title,category});
      if(data && data.success){
        return <Toast success={data.success} message={data.message} />;
      }
      <Toast success={data.success} message={data.message} />;
      setLoading(false);
      
    } catch (error) {
      console.error(error);
      setLoading(false);
    };
    setLoading(false);
}



  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>|any
  ) => {
    const { name, value } = e.target;
    if (value!== "") {
      setChangeText((pre) => {
        return { ...pre, [name]: value };
      });
      if(value===lastELe.category){
        const oldEle=document.getElementById("categorySelect");
        const newELe=document.createElement("input");
        newELe.setAttribute("class","form-control shadow-sm");
        newELe.setAttribute("name","category");
        newELe.setAttribute("type","text");
        newELe.setAttribute("placeholder","Enter Category");
        newELe.setAttribute("value",changeText.category);
        newELe.addEventListener("change",(e)=>onChangeHandler(e))
        oldEle?.replaceWith(newELe);
      }
    }
  };

  
  /**
   * GET COMPILER LIST
   * @param url
   */
  const getCompilerList = (url: string) => {
    axios.get(url)
      .then(({ data }) => {
        if (data && data.status === 200) {
          setCompilerList(data.supportedLanguages);
        }
      })
      .catch((err) => console.error(err));
  };


  /**
   * GET COMPILER LIST
   * @param url
   */
  const getCategoryList = (url: string) => {
    axios.get(url)
      .then(({ data }) => {
        if (data && data.success) {
          data.data.unshift(firstELe);
          data.data.push(lastELe);
          setCotegoryList(data.data);
        }
      })
      .catch((err) => console.error(err));
  };



 useEffect(()=>{
  getCompilerList(COMPILER_URL.concat("/list"))
  getCategoryList(`${CodingEndpoints.PROBELM_CATEGORY}`)
 },[])

//  console.log("==============category",changeText?.category)

  return (
    <div className="container">
      <div className="row mt-5">
         {/* CATEGORY  */}
        <div className="col-md-3" >
          <select id="categorySelect"
            value={changeText.category}
            onChange={(e) => onChangeHandler(e)}
            className="form-control shadow-sm"
            name="category"
          >
            {categoryList &&
              categoryList.length > 0 &&
              categoryList.map((it: {category:string}, index) =>(
                <option selected={it.category===firstELe.category}
                  key={index} value={it.category}>              
                  {lodash.upperFirst(it.category)}
                </option>
              ))}
          </select>
         
        </div>

        {/* TITLE  */}
        <div className="col-md-4">
          <input
            name="title"
            value={changeText.title}
            className="form-control shadow-sm"
            onChange={(e) => onChangeHandler(e)}
            type="text"
            placeholder="Enter Title"
          />
        </div>

        {/* LANGUAGES SELECT  */}
        <div className="col-md-2">
          <select
            defaultValue="vs-dark"
            onChange={(e) => onChangeHandler(e)}
            className="form-control shadow-sm"
            name="languages"
          >
            {compilerList &&
              compilerList.length > 0 &&
              compilerList.map((it: { language: string }, index) => (
                <option selected={it.language==="js"}
                 key={index} value={it.language}>
                  {lodash.upperCase(it.language)}
                </option>
              ))}
          </select>
        </div>

        {/* THEME SELECT    */}
        <div className="col-md-2">
          <select
            onChange={(e) => onChangeHandler(e)}
            className="form-control shadow-sm"
            name="Themes"
          >
            {Themes &&
              Themes.length > 0 &&
              Themes.map((it, index) => (
                <option selected={it.value==="vs-dark"} key={index} value={it.value}>
                  {it.name}
                </option>
              ))}
          </select>
        </div>

          {/* SUBMIT BUTTON  */}
        <div className="col-md-1">
            <button className="btn btn-dark" onClick={()=>onSubmit()}> Submit 
             {loading && (
               <div className="spinner-grow spinner-grow-sm" role="status">
               <span className="visually-hidden">Loading...</span>
             </div>
             )}
            </button>
        </div>
      </div>
   
      {/* CODE EDITOR  */}
    <div className="mt-5">
        <Editor
          height="85vh"
          defaultLanguage={"javascript"}
          language={changeText.language}
          value={changeText.code}
          theme={changeText.thema}
          onChange={(val) => val && setChangeText({ ...changeText, code: val })}
        />
    </div>
  </div>
  );
};

export default AddProblem;
