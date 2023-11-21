import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Editor from "@monaco-editor/react";
import axios from "axios";
import lodash from "lodash";
import Themes from "../../../json/themes.json";

import {
  COMPILERS,
  // COMPILER_URL,
  FONTSIZE,
  FONT_SIZE,
  LANGUAGES,
  THEME,
} from "../../../helper/constant";
import { CodingEndpoints } from "../../../routes/routes";

import InputOutputCMP from "./InputOutputCMP";
import useForm from "../../../hooks/useForm";
// import useCompiler from "../../../hooks/useCompiler";
// import useSaveProblem from "../../../hooks/useSaveProblem";
import CommonSelect from "../../commonCMP/CommonSelect";
import usePost from "../../../hooks/usePost";

// interface ICompiler {
//   info: string;
//   language: string;
// }

const CodeEditor: React.FC = () => {
  const params = useParams();
  // const [compilerList, setCompilerList] = useState<ICompiler[]>();
  const [changeLang, setChangeLang] = useState("");
  const [prevData, setPrevData] = useState({
    title: "",
    category: "",
  });

  const { formData, onChangeHandler: themeChangeHandler ,setFormData} = useForm(
    {
      theme: Themes[1].value,
      fontSize: FONT_SIZE[0],
      code:"",
      language:"js"
    }
  );

  // const {
  //   compilerLoading,
  //   compilerOutput,
  //   compilerData,
  //   setCompilerOutput,
  //   compileHandler,
  //   setCompilerData,
  // } = useCompiler({
  //   code: "",
  //   fileType: "js",
  //   input: "",
  // });
    
  const {
    responeData,
    loading: compilerLoading,
    postData,
  } = usePost({
    url: `${CodingEndpoints.COMPILE_CODE}`,
    payload: {
      code: formData.code,
      fileType: formData.language,
    },
  });

  
  const {
    loading: saveLoading,
    postData:onSubmit,
  } = usePost({
    url: `${CodingEndpoints.CREATE_NEW_PROBLEM}`,
    payload: {
    title: prevData.title,
    code: formData.code,
    category: prevData.category,
    },
  });

  /**
   * GET COMPILER LIST
   * @param url
   */
  // const getList = (url: string) => {
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
   * LANGUAGE HANDLER
   * @param e
   */
  const selectLanguageHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value) {
      setChangeLang(value);
      setFormData({ ...formData, fileType: value,  });
      // setCompilerOutput("");
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
          setFormData({ ...formData, code: data.data.code });
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
    // if (COMPILER_URL) {
    //   getList(COMPILER_URL.concat("/list"));
    // }
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
          name="language"
          arrData={COMPILERS as any[]}
          selectEle="js"
          from={LANGUAGES}
        />

        {/* THEME SELECT    */}
        <CommonSelect
          divClass="col-md-3"
          onChange={(e) => themeChangeHandler(e)}
          name="theme"
          arrData={Themes}
          selectEle={formData.theme}
          from={THEME}
        />

        {/* FONT SIZE  */}
        <CommonSelect
          divClass="col-md-1"
          onChange={(e) => themeChangeHandler(e)}
          name="fontSize"
          arrData={FONT_SIZE}
          selectEle={formData.fontSize}
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
            height="76vh"
            defaultLanguage={"javascript"}
            language={changeLang}
            // defaultValue={changeLang==="py"? "# Write your code": "// write your code"}
            value={formData.code}
            theme={formData.theme}
            options={{ fontSize: formData.fontSize }}
            onChange={(val) =>
              val && setFormData({ ...formData, code: val })
            }
          />
        </div>
        <InputOutputCMP
          saveLoading={saveLoading}
          compileHandler={postData}
          compilerLoading={compilerLoading}
          compilerOutput={`${responeData}`}
          onSubmit={onSubmit}
          problemId={params.id}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
