import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import useLocalStorage from "../../../hooks/useLocalStorage";

const UiEditor: React.FC = () => {
  const [docSRC, setDocSRC] = useState("");
  const [htmlCode, setHTMLCode] = useLocalStorage("css", "");
  const [cssCode, setCSSCode] = useLocalStorage("html", "");
  const [jsCode, setJSCode] = useLocalStorage("js", "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDocSRC(`
      <html>
       <body>
        ${htmlCode}
       </body>
       <style>
       ${cssCode}
       </style>
       <script>
        ${jsCode}
       </script>
      </html>
     `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-4">
          <div className="card text-dark bg-light mb-3">
            <div className="card-header">HTML</div>
            <Editor
              height="40vh"
              defaultLanguage="html"
              language="html"
              value={htmlCode}
              theme="vs-dark"
              onChange={(val) => val && setHTMLCode(val)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-dark bg-light mb-3">
            <div className="card-header">CSS</div>
            <Editor
              height="40vh"
              defaultLanguage="css"
              language="css"
              value={cssCode}
              theme="vs-dark"
              onChange={(val) => val && setCSSCode(val)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-dark bg-light mb-3">
            <div className="card-header">JS</div>
            <Editor
              height="40vh"
              defaultLanguage="javascript"
              language="javascript"
              value={jsCode}
              theme="vs-dark"
              onChange={(val) => val && setJSCode(val)}
            />
          </div>
        </div>
      </div>
      {/* OUTPUT  */}
      <div style={{ height: 340 }}>
        <iframe
          srcDoc={docSRC}
          title="OUTPUT"
          width="100%"
          height="100%"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
};

export default UiEditor;
