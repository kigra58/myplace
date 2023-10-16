import React, { ChangeEvent, useState } from "react";
import photo from "./image1.jpeg";

const API_URL = "https://clipdrop-api.co/reimagine/v1/reimagine";
const API_KEY =
  "752e62e697ba3271c8f5f5bba03cc8930de9a9ea21641b4e08fdd970262fdf4c36747f030853cef67e6d648d4984303d";

const Test = () => {
  const [imageList, setimageList] = useState<File[]>([]);

  const fileHandleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setimageList([...imageList, ...file]);
    }
  };

  const onSubmit = (arg: File) => {
    const form = new FormData();
    form.append("image_file", photo);

    // console.log("==============", arg);
    console.log("==============form", form);
    // form.append("prompt", "shot of vaporwave fashion dog in miami");
    // fetch(API_URL, {
    //   method: "POST",
    //   headers: {
    //     "x-api-key": API_KEY,
    //   },
    //   body: photo,
    // })
    //   .then((response) => response.arrayBuffer())
    //   .then((buffer) => {
    //     // buffer here is a binary representation of the returned image
    //     console.log("==========buffer", buffer);
    //     const blob = new Blob([buffer], { type: "image/jpeg" });
    //     console.log("==========blob", blob);
    //     const imageUrl = URL.createObjectURL(blob);
    //     console.log("==========imageUrl", imageUrl);
    //     const img = document.createElement("img");
    //     console.log("==========img", img);
    //     img.src = imageUrl;
    //     document.body.appendChild(img);
    //   });
  };

  return (
    <div>
      <input type="file" onChange={(e) => fileHandleChange(e)} />
      <br />
      <div style={{ width: 350, height: 250 }}>
        {imageList &&
          imageList.length > 0 &&
          imageList.map((it) => {
            return (
              <img
                src={URL.createObjectURL(it)}
                className="card-img-top"
                alt="..."
              />
            );
          })}
      </div>
      {/* <img src={photo} alt="" /> */}
      <button onClick={() => onSubmit(imageList[0])}> Submit </button>
    </div>
  );
};

export default Test;
