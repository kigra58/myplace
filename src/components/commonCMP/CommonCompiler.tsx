import React, { useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import CommonSelect from "./CommonSelect";
import useForm from "../../hooks/useForm";
import Themes from "../../json/themes.json";
import {
  COMPILERS,
  FONTSIZE,
  FONT_SIZE,
  LANGUAGES,
  THEME,
} from "../../helper/constant";
import usePost from "../../hooks/usePost";
import { CodingEndpoints } from "../../routes/routes";
import { defaultCodeHandler } from "../../helper/helper";

const CommonCompiler: React.FC = () => {
  const {
    formData,
    onChangeHandler: themeChangeHandler,
    setFormData,
  } = useForm({
    theme: Themes[1].value,
    fontSize: FONT_SIZE[0],
    code: "",
    language: "js",
  });

  const {
    responeData: compilerOutput,
    loading: compilerLoading,
    postData,
  } = usePost({
    url: `${CodingEndpoints.COMPILE_CODE}`,
    payload: {
      code: formData.code,
      fileType: formData.language,
    },
  });

  useEffect(()=>{
    const timeout = setTimeout(() => {
        localStorage.setItem("compileCode",formData.code);
    }, 250);
      return () => clearTimeout(timeout);
  },[formData.code]);

  useEffect(()=>{
    setFormData({...formData,code:defaultCodeHandler(formData.language)});
  },[formData.language]);

  return (
    <div className="container-fluid">
      <div className="row col-md-8 mt-3 p-2">
        {/* LANGUAGES SELECT  */}
        <CommonSelect
          divClass="col-md-4"
          onChange={(e) => themeChangeHandler(e)}
          name="language"
          arrData={COMPILERS as any[]}
          selectEle="js"
          from={LANGUAGES}
        />

        {/* THEME SELECT    */}
        <CommonSelect
          divClass="col-md-4"
          onChange={(e) => themeChangeHandler(e)}
          name="theme"
          arrData={Themes}
          selectEle={formData.theme}
          from={THEME}
        />

        {/* FONT SIZE  */}
        <CommonSelect
          divClass="col-md-3"
          onChange={(e) => themeChangeHandler(e)}
          name="fontSize"
          arrData={FONT_SIZE}
          selectEle={formData.fontSize}
          from={FONTSIZE}
        />
      </div>

      <div className="row p-1">
        <div className="col-md-9">
          <Editor
            height="76vh"
            defaultLanguage={"javascript"}
            language={formData.language}
            // defaultValue={changeLang==="py"? "# Write your code": "// write your code"}
            value={formData.code}
            theme={formData.theme}
            options={{ fontSize: formData.fontSize }}
            onChange={(val) => val && setFormData({ ...formData, code: val })}
          />
        </div>

        <div className="col-md-3 ">
          <textarea
            style={{ height: 227 }}
            className="form-control shadow-sm"
            maxLength={10}
            placeholder="INPUT"
          />
          <br />
          <textarea
            style={{ height: 240 }}
            className={`form-control shadow-sm ${
              `${compilerOutput}`.match("Error") && "text-danger"
            }`}
            maxLength={10}
            placeholder="OUTPUT"
            value={compilerOutput}
          />
          <br />
          {/* COMPILE CODE  */}
          <button
            className="btn btn-success"
            disabled={compilerLoading}
            onClick={() => postData()}
          >
            COMPILE CODE
            {compilerLoading && (
              <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
          {/* SAVE CODE  */}
          {/* <button
            className="btn btn-dark mx-3"
            type="button"
            onClick={() => {
                localStorage.setItem("compileCode",formData.code);
            }}
          >
            SAVE CODE
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CommonCompiler;
