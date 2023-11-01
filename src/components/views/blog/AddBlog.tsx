import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import usePost from "../../../hooks/usePost";
import useForm from "../../../hooks/useForm";
import { BlogEndpoints } from "../../../routes/routes";
import { convertToBase64 } from "../../../helper/helper";
import { useParams } from "react-router-dom";
import useFeth from "../../../hooks/useFetch";

const AddBlog: React.FC = () => {
  const params = useParams();
  const [changeText, setChangeText] = useState("");
  const [fileChange, setFileChange] = useState<File>();
  const [imageUrl, setImageUrl] = useState("");

  const { formData, onChangeHandler, setFormData } = useForm({
    title: "",
    category: "",
  });

  const { data: bloginfo } = useFeth(
    `${BlogEndpoints.BLOG_DEATILS?.replace(":id", `${params.id}`)}`,
    "await"
  );

  const { loading, postData } = usePost({
    url: `${BlogEndpoints.CREATE_NEW_BLOG}`,
    payload: {
      title: formData.title,
      category: formData.category,
      content: changeText,
      thumbnail: imageUrl,
    },
  });

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files;
    if (file && file.length > 0) {
      setFileChange(file[0]);
      const base64Data = await convertToBase64(file[0]);
      setImageUrl(`${base64Data}`);
    }
  };

  console.log("================bloginfo", bloginfo);

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-md-8 ">
          <SunEditor
            defaultValue={changeText}
            onChange={(val: string) => setChangeText(val)}
            placeholder="Please type here"
            width="1000px"
            height="600px"
          />
        </div>
        <div className="col-md-4" style={{ width: 425 }}>
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
          {/* PREVIEW THUMBNAIL  */}
          <div
            className="mt-4 shadow rounded-3"
            style={{ height: 254, width: 400 }}
          >
            {fileChange && (
              <img
                loading="lazy"
                width="400"
                height="350"
                className="img-thumbnail shadow"
                src={URL.createObjectURL(fileChange)}
                alt="thumbnail"
              />
            )}
          </div>
          <div className="mt-5">
            <input
              name="title"
              className="form-control shadow-sm"
              onChange={(e) => fileChangeHandler(e)}
              type="file"
              placeholder="Enter Title"
            />
          </div>
          <div className="mt-4">
            <button
              disabled={loading}
              onClick={() => {
                postData();
                setChangeText("");
                setFormData({
                  title: "",
                  category: "",
                });
              }}
              className="btn btn-outline-dark shadow col-sm-12 "
            >
              Submit
              {loading && (
                <div className="spinner-grow spinner-grow-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
