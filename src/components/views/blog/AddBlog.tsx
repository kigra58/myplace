import React, { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import usePost from "../../../hooks/usePost";
import useForm from "../../../hooks/useForm";
import { BlogEndpoints } from "../../../routes/routes";

const AddBlog: React.FC = () => {
  const [changeText, setChangeText] = useState("");

  const { formData, onChangeHandler,setFormData } = useForm({
    title: "",
    category: "",
  });

  const { loading,postData } = usePost({
    url: `${BlogEndpoints.CREATE_NEW_BLOG}`,
    payload: {
      title: formData.title,
      category: formData.category,
      content: changeText,
    },
  });
 


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <div className="form-floating mb-3">
            <input
              onChange={(e) => onChangeHandler(e)}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Title"
              name="title"
              value={formData.title}
            />
            <label htmlFor="floatingInput">Title</label>
          </div>
        </div>
        <div className="col-md-5">
          <div className="form-floating mb-3">
            <input
              onChange={(e) => onChangeHandler(e)}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Category"
              name="category"
              value={formData.category}
            />
            <label htmlFor="floatingInput"> Category </label>
          </div>
        </div>
      </div>
      <SunEditor
        defaultValue={changeText}
        onChange={(val: string) => setChangeText(val)}
        placeholder="Please type here"
        width="1200px"
        height="600px"
      />
      <div className="mt-2">
        <button disabled={loading} onClick={()=>{
          postData();
          setChangeText("");
          setFormData({
            title:"",
            category:""
          });
          }} className="btn btn-dark">

          Submit 
          {loading && (
          <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
