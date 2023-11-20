import React, { useEffect, useState } from 'react'
import useForm from '../../../hooks/useForm';
import Editor from "@monaco-editor/react";


const UiEditor:React.FC = () => {
    const [docSRC,setDocSRC]=useState("")
    const {formData:changeText,onChangeHandler,setFormData}=useForm({
        html: "",
        css: "",
        js:""
    });



   useEffect(()=>{
     const timeout=setTimeout(()=>{
      setDocSRC(`
      <html>
       <body>
        ${changeText.html}
       </body>
       <style>
       ${changeText.css}
       </style>
       <script>
        ${changeText.js}
       </script>
      </html>
     `);
     },250);
     return ()=> clearTimeout(timeout);
   },[changeText]);

  return (
    <div >
       <div className="row"> 
         <div className="col-md-4">
         <Editor
            height="50vh"
            defaultLanguage="html"
            language="html"
            value={changeText.html}
            theme="vs-dark"
            onChange={(val) =>
              val && setFormData({ ...changeText, html: val })
            }
          />
         </div>
         <div className="col-md-4">
         <Editor
            height="50vh"
            defaultLanguage="css"
            language="css"
            value={changeText.css}
            theme="vs-dark"
            onChange={(val) =>
              val && setFormData({ ...changeText, css: val })
            }
          />
         </div>
         <div className="col-md-4">
         <Editor
            height="50vh"
            defaultLanguage="javascript"
            language="javascript"
            value={changeText.js}
            theme="vs-dark"
            onChange={(val) =>
              val && setFormData({ ...changeText, js: val })
            }
          />
         </div>
       </div>
       {/* OUTPUT  */}
       <div  style={{height:340}} >
      <iframe 
       srcDoc={docSRC}
       title='OUTPUT'
       width="100%"
       height="100%"
       sandbox='allow-script'
      />
       </div>
    </div>
  )
}

export default UiEditor