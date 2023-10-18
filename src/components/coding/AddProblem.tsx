import React, { useEffect, useState } from "react";
import axios from "axios";
import { COMPILER_URL } from "../../constant";
import Editor from "@monaco-editor/react";
import Themes from "./themes.json";
import lodash from "lodash";
import Modal from "../Modal/Modal";


const AddProblem: React.FC = () => {
  const [categoryList,setCotegoryList]=useState([])
  const [compilerList,setCompilerList]=useState([])
  const [isOpenModal,setIsOpenModal]=useState(false);
  const [changeText, setChangeText] = useState({
    title: "",
    category: "",
    language: "",
    code: "",
    thema: "",
  });





  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (value!== "") {
      setChangeText((pre) => {
        return { ...pre, [name]: value };
      });
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
          const firstELe={
            category:"Select Category"
          };
          const lastELe={
            category:"Add New Category"
          };
          data.data.unshift(firstELe);
          data.data.push(lastELe);
          setCotegoryList(data.data);
        }
      })
      .catch((err) => console.error(err));
  };

  const addNewCategory=()=>{
    setIsOpenModal(true);
  }

 useEffect(()=>{
  getCompilerList(COMPILER_URL.concat("/list"))
  getCategoryList("http://localhost:3005/api/coding/problem-category")
 },[])
 
 console.log("==================ffffffff",changeText)

  return (
    <div className="container">
      <div className="row mt-5">
         {/* CATEGORY  */}
        <div className="col-md-3">
          <select
            value={changeText.category}
            onChange={(e) => onChangeHandler(e)}
            className="form-control shadow-sm"
            name="category"
          >
            {categoryList &&
              categoryList.length > 0 &&
              categoryList.map((it: { _id:string,category:string }, index) =>(
                <option key={index} value={it._id}>
                  {it.category==="Add New Category" ? <button type="button"
                   onClick={()=>addNewCategory()} >
                  {it.category}</button> : lodash.upperFirst(it.category)}
                </option>
              ))}
          </select>
        </div>

        {/* TITLE  */}
        <div className="col-md-3">
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
        <div className="col-md-3">
          <select
            defaultValue="vs-dark"
            onChange={(e) => onChangeHandler(e)}
            className="form-control shadow-sm"
            name="languages"
          >
            {compilerList &&
              compilerList.length > 0 &&
              compilerList.map((it: { language: string }, index) => (
                <option key={index} value={it.language}>
                  {lodash.upperCase(it.language)}
                </option>
              ))}
          </select>
        </div>

        {/* THEME SELECT    */}
        <div className="col-md-3">
          <select
            defaultValue={Themes[0].value}
            onChange={(e) => onChangeHandler(e)}
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
    <Modal title="Add New Category" from="addProblem" />
  </div>
  );
};

export default AddProblem;
