import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Editor from "@monaco-editor/react";
import axios from "axios";
import lodash from "lodash";
import Themes from "./themes.json";

import { COMPILER_URL, FONTSIZE, FONT_SIZE, LANGUAGES, THEME } from "../../../helper/constant";
import { CodingEndpoints } from "../../../routes/routes";

import InputOutputCMP from "./InputOutputCMP";
import useForm from "../../../hooks/useForm";
import useCompiler from "../../../hooks/useCompiler";
import useSaveProblem from "../../../hooks/useSaveProblem";
import CommonSelect from "../../commonCMP/CommonSelect";





interface ICompiler {
  info: string;
  language: string;
}

const CodeEditor: React.FC = () => {
  const params = useParams();
  const [compilerList, setCompilerList] = useState<ICompiler[]>();
  const [changeLang, setChangeLang] = useState("");
  const [prevData, setPrevData] = useState({
    title: "",
    category: "",
  });

  const {formData:themeState,onChangeHandler:themeChangeHandler}=useForm({
    theme: Themes[1].value,
    fontSize: FONT_SIZE[0],
  });

  const {
    compilerLoading,
    compilerOutput,
    compilerData,
    setCompilerOutput,
    compileHandler,
    setCompilerData,
  } = useCompiler({
    code: "",
    language: "js",
    input: "",
  });

  const { saveLoading, onSubmit } = useSaveProblem({
    title: prevData.title,
    code: compilerData.code,
    category: prevData.category,
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
   * LANGUAGE HANDLER
   * @param e
   */
  const selectLanguageHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value}=e.target
    if (value) {
      setChangeLang(value);
      setCompilerData({ ...compilerData, language: value, input: "" });
      setCompilerOutput("");
    }
  };


  /**
   * GET PROBLEMS DETAILS
   * @param problemId
   */
  const getProblemDetails = (problemId: string): void => {
    axios
      .get(`${CodingEndpoints.PROBLEM_DETAILS?.replace(":id", problemId)}`)
      .then(({ data }) => {
        if (data && data.success) {
          setCompilerData({ ...compilerData, code: data.data.code });
          setPrevData({
            ...prevData,
            title: data.data.title,
            category: data.data.category,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (COMPILER_URL) {
      getList(COMPILER_URL.concat("/list"));
    }
    if (params && params.id) {
      getProblemDetails(params.id);
    }
  }, []);

  return (
    <div>
      <div className="row col-md-8 mt-3 p-2">
        {/* LANGUAGES SELECT  */}
        <CommonSelect
          divClass="col-md-3"
          onChange={(e) => selectLanguageHandler(e)}
          name="languages"
          arrData={compilerList as any[]}
          selectEle="js"
          from={LANGUAGES}
        />

        {/* THEME SELECT    */}
        <CommonSelect
          divClass="col-md-3"
          onChange={(e) => themeChangeHandler(e)}
          name="theme"
          arrData={Themes}
          selectEle={themeState.theme}
          from={THEME}
        />

        {/* FONT SIZE  */}
        <CommonSelect
          divClass="col-md-1"
          onChange={(e) => themeChangeHandler(e)}
          name="fontSize"
          arrData={FONT_SIZE}
          selectEle={themeState.fontSize}
          from={FONTSIZE}
        />

        {/* SHOW TITLE  */}
        <div className="col-sm-5">
          <h6>
            <b>{`${lodash.upperFirst(prevData?.title)}  { ${lodash.upperFirst(
              prevData?.category
            )} }`}</b>
          </h6>
        </div>
      </div>

      <div className="row p-1">
        <div className="col-md-9">
          <Editor
            height="85vh"
            defaultLanguage={"javascript"}
            language={changeLang}
            // defaultValue={changeLang==="py"? "# Write your code": "// write your code"}
            value={compilerData.code}
            theme={themeState.theme}
            options={{ fontSize: themeState.fontSize }}
            onChange={(val) =>
              val && setCompilerData({ ...compilerData, code: val })
            }
          />
        </div>
        <InputOutputCMP
          saveLoading={saveLoading}
          compileHandler={compileHandler}
          compilerLoading={compilerLoading}
          compilerOutput={compilerOutput}
          onSubmit={onSubmit}
          problemId={params.id}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
