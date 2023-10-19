import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COMPILER_URL, CodingEndpoints, FONT_SIZE } from "../../constant";
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
  const params = useParams();
  const [compilerList, setCompilerList] = useState<ICompiler[]>();
  const [changeTheme, setChangeTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(FONT_SIZE[0]);
  const [changeLang, setChangeLang] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [prevData, setPrevData] = useState({
    title: "",
    category: "",
  });
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
      const { data } = await axios.post(`${COMPILER_URL}`, args);
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
      setList({ ...list, language: e.target.value, input: "" });
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
  const getProblemDetails = (problemId: string) => {
    axios
      .get(`${CodingEndpoints.PROBLEM_DETAILS?.replace(":id", problemId)}`)
      .then(({ data }) => {
        if (data && data.success) {
          setList({ ...list, code: data.data.code });
          setPrevData({
            ...prevData,
            title: data.data.title,
            category: data.data.category,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  /**
   *  UPDATE CODE
   * @param id
   * @param code
   */
  const updateCode = async (id: string | undefined, code: string) => {
    try {
      setSaveLoading(true);
      if (id !== "" && code !== "") {
        const { data } = await axios.post(
          `${CodingEndpoints.CREATE_NEW_PROBLEM}`,
          {
            problemId: id,
            code,
          }
        );
        if (data && data.success) {
          <Toast success={data.success} message={data.message} />;
        }
        <Toast success={data.success} message={data.message} />;
        setSaveLoading(false);
      }
      setSaveLoading(false);
    } catch (error) {
      console.error(error);
    }
    setSaveLoading(false);
  };

  const fontChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value) {
      setFontSize(Number(value));
    }
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
        <div className="col-sm-3">
          <select
            onChange={(e) => selectLanguageHandler(e)}
            className="form-control shadow-sm"
            name="Languages"
          >
            {compilerList &&
              compilerList.length > 0 &&
              compilerList.map((it, index) => (
                <option
                  key={index}
                  selected={it.language === "js"}
                  value={it.language}
                >
                  {lodash.upperCase(it.language)}
                </option>
              ))}
          </select>
        </div>

        {/* THEME SELECT    */}
        <div className="col-sm-3">
          <select
            onChange={(e) => selectThemeHandler(e)}
            className="form-control shadow-sm"
            name="Themes"
          >
            {Themes &&
              Themes.length > 0 &&
              Themes.map((it, index) => (
                <option
                  selected={it.value === "vs-dark"}
                  key={index}
                  value={it.value}
                >
                  {it.name}
                </option>
              ))}
            ;
          </select>
        </div>
        <div className="col-sm-1">
          <select
            onChange={(e) => fontChangeHandler(e)}
            className="form-control shadow-sm"
            name="fontSize"
          >
            {FONT_SIZE.map((it) => (
              <option selected={it === fontSize} key={it} value={it}>
                {it}
              </option>
            ))}
          </select>
        </div>

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
            value={list.code}
            theme={changeTheme}
            options={{ fontSize }}
            onChange={(val) => val && setList({ ...list, code: val })}
          />
        </div>
        <div className="col-md-3 ">
          <textarea
            style={{ height: 240 }}
            className="form-control shadow-sm"
            maxLength={10}
            placeholder="INPUT"
          />{" "}
          <br />
          <textarea
            style={{ height: 280 }}
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
            onClick={() => updateCode(params.id, list.code)}
          >
            SAVE CODE
            {saveLoading && (
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
