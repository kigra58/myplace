import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import Themes from "../../../json/themes.json";
import {
  COMPILERS,
  FONTSIZE,
  FONT_SIZE,
  LANGUAGES,
  THEME,
  firstELe,
  lastELe,
} from "../../../helper/constant";

import { CodingEndpoints } from "../../../routes/routes";
import { defaultCodeHandler } from "../../../helper/helper";
import CommonSelect from "../../commonCMP/CommonSelect";
import InputOutputCMP from "./InputOutputCMP";
import usePost from "../../../hooks/usePost";

interface ICategory {
  category: string;
}

const AddProblem: React.FC = () => {
  const [categoryList, setCotegoryList] = useState<ICategory[]>([]);

  const [changeText, setChangeText] = useState({
    title: "",
    category: "",
    language: "js",
    code: "",
    input: "",
    theme: Themes[1].value,
    fontSize: FONT_SIZE[0],
  });


  const {
    responeData,
    loading: compilerLoading,
    postData,
  } = usePost({
    url: `${CodingEndpoints.COMPILE_CODE}`,
    payload: {
      code: changeText.code,
      fileType: changeText.language,
    },
  });

  const {
    loading: saveLoading,
    postData:onSubmit,
  } = usePost({
    url: `${CodingEndpoints.CREATE_NEW_PROBLEM}`,
    payload: {
     title: changeText.title,
     code: changeText.code,
     category: changeText.category,
    },
  });



  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | any
  ) => {
    const { name, value } = e.target;
    if (value) {
      if (name === "language") {
        setChangeText({ ...changeText, code:changeText.language !== ""
        ? defaultCodeHandler(changeText.language)
        : "" });
      }
      setChangeText((pre) => {
        return { ...pre, [name]: value };
      });
      if (value === lastELe.category) {
        const oldEle = document.getElementById("categorySelect");
        const newELe = document.createElement("input");
        newELe.setAttribute("class", "form-control shadow-sm");
        newELe.setAttribute("name", "category");
        newELe.setAttribute("type", "text");
        newELe.setAttribute("placeholder", "Enter Category");
        newELe.setAttribute("value", changeText.category);
        newELe.addEventListener("change", (e) => onChangeHandler(e));
        oldEle?.replaceWith(newELe);
      }
    }
  };

  // /**
  //  * GET COMPILER LIST
  //  * @param url
  //  */
  // const getCompilerList = (url: string) => {
  //   axios
  //     .get(url)
  //     .then(({ data }) => {
  //       if (data && data.status === 200) {
  //         setCompilerList(data.supportedLanguages);
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // };

  /**
   * GET COMPILER LIST
   * @param url
   */
  const getCategoryList = (url: string) => {
    axios
      .get(url)
      .then(({ data }) => {
        if (data && data.success) {
          data.data.unshift(firstELe);
          data.data.push(lastELe);
          setCotegoryList(data.data);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // getCompilerList(COMPILER_URL.concat("/list"));
    getCategoryList(`${CodingEndpoints.PROBELM_CATEGORY}`);
  }, []);

  
  useEffect(()=>{
    setChangeText({...changeText,code:defaultCodeHandler(changeText.language)});
  },[changeText.language]);
  
 
  return (
    <div className="p-1">
      <div className="row mt-5">
        {/* CATEGORY  */}
        {categoryList && categoryList.length > 0 && (
          <CommonSelect
            divClass="col-md-2"
            onChange={(e) => onChangeHandler(e)}
            name="category"
            arrData={categoryList as any[]}
            selectEle="js"
            from="category"
          />
        )}

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
        {COMPILERS && COMPILERS.length > 0 && (
          <CommonSelect
            divClass="col-md-2"
            onChange={(e) => onChangeHandler(e)}
            name="language"
            arrData={COMPILERS}
            selectEle="js"
            from={LANGUAGES}
          />
        )}

        {/* THEME SELECT    */}
        <CommonSelect
          divClass="col-md-1"
          onChange={(e) => onChangeHandler(e)}
          name="theme"
          arrData={Themes}
          selectEle={changeText.theme}
          from={THEME}
        />

        {/* FONT SIZE  */}
        <CommonSelect
          divClass="col-md-1"
          onChange={(e) => onChangeHandler(e)}
          name="fontSize"
          arrData={FONT_SIZE}
          selectEle={changeText.fontSize}
          from={FONTSIZE}
        />
      </div>

      {/* CODE EDITOR  */}
      <div className="row p-2">
        <div className="col-md-9">
          <Editor
            height="76vh"
            defaultLanguage={"javascript"}
            language={changeText.language}
            value={ changeText.language !== ""
            ? defaultCodeHandler(changeText.language)
            : undefined}
            theme={changeText.theme}
            options={{ fontSize: changeText.fontSize }}
            onChange={(val) =>
              val && setChangeText({ ...changeText, code: val })
            }
          />
        </div>
        <InputOutputCMP
          onSubmit={onSubmit}
          compileHandler={postData}
          saveLoading={saveLoading}
          compilerOutput={`${responeData}`}
          compilerLoading={compilerLoading}
        />
      </div>
    </div>
  );
};

export default AddProblem;
