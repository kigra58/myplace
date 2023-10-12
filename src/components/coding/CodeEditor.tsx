import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import Themes from "./themes.json";

interface ILangData {
  code: string;
  language: string;
  input: string;
}

interface ICompiler {
  info: string;
  language: string;
}

const URL = "https://api.codex.jaagrav.in";
const CodeEditor: React.FC = () => {
  const [output, setOutput] = useState("");
  const [changeTheme, setChangeTheme] = useState("");
  const [changeLang, setChangeLang] = useState("");
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState({
    code: "",
    language: "js",
    input: "",
  });
  const [compilerList, setCompilerList] = useState<ICompiler[]>();

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

  const selectLanguageHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      setChangeLang(e.target.value);
      setList({ ...list, language: e.target.value });
    }
    console.log("================Languageeeee");
  };
  const selectThemeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      setChangeTheme(e.target.value);
      console.log("================Thema", e.target.value);
    }
  };

  useEffect(() => {
    if (URL) {
      getList(URL.concat("/list"));
    }
  }, []);
  console.log("list==============changeLang", changeLang);

  return (
    <div>
      <div className="row col-md-8 mt-4 p-1">
        <div className="col-sm-3">
          {/* LANGUAGES SELECT  */}
          <select
            defaultValue="vs-dark"
            onChange={(e) => selectLanguageHandler(e)}
            className="form-control"
            name="Languages"
          >
            {compilerList &&
              compilerList.length > 0 &&
              compilerList.map((it, index) => (
                <option key={index} value={it.language}>
                  {it.language}
                </option>
              ))}
            ;
          </select>
        </div>
        <div className="col-sm-3">
          {/* THEME SELECT    */}
          <select
            defaultValue={Themes[0].value}
            onChange={(e) => selectThemeHandler(e)}
            className="form-control"
            name="Themes"
          >
            {Themes &&
              Themes.length > 0 &&
              Themes.map((it, index) => (
                <option key={index} value={it.value}>
                  {" "}
                  {it.name}{" "}
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
        <div className="col-md-3">
          <textarea
            className="form-control"
            maxLength={10}
            placeholder="INPUT"
          />{" "}
          <br />
          <textarea
            className="form-control"
            maxLength={10}
            placeholder="OUTPUT"
            value={output}
          />
          <br />
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
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
