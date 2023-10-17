import React, { ChangeEvent, useState } from "react";
// import image_file from "./photo.jpg"

const API_BASE_URL="https://clipdrop-api.co";
const RemoveBackround="/remove-background/v1";
const ReplaceBackround="/replace-background/v1";
const TextToImage="/text-to-image/v1";
const Reimage="/reimagine/v1/reimagine";
// const RemoveText="/remove-text/v1";



const API_KEY =
  "2b99e716da1abf3953fced075f4e60daff002eaf854e144307a5aeab2195b110d08b4f0fdfefb71918fc4ba88f2f5acf";


  const feturesOption=[
    {
        name:"Select Feature ",
        value:""
    },
    {
        name:"Reimage",
        value:"reimage"
    },
    {
        name:"Remove Background",
        value:"removeBackground"
    },
    {
        name:"Replace Background",
        value:"replaceBackground"
    },
    {
        name:"Text To Image",
        value:"textToImage"
    }
  ]

const Test = () => {
  const [imageList, setimageList] = useState<File[]>([]);
  const [onSelectData,setOnSelectData]=useState("")
  const [promtText,setPromtText]=useState("")
  const [imageSRC,setImageSRC]=useState("")
  const [loading, setLoading] = useState(false);


  const fileHandleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setimageList([...imageList, ...file]);
    }
  };

  const onSelectHandler=(e: React.ChangeEvent<HTMLSelectElement>)=>{
     if(e.target.value!==""){
        setOnSelectData(e.target.value);
     }
  }

  const typePromt=(e: React.ChangeEvent<HTMLInputElement>)=>{
     if(e.target.value!==""){
        setPromtText(e.target.value);
     }
  }

  const postData=async(url:string,data:FormData)=>{
    try {
        setLoading(true);
        if(url && url!=="" && data){
           const buffer=await (await fetch(url, {
            method: "POST",
            headers: {
              "x-api-key": API_KEY,
            },
            body: data,
          })).arrayBuffer();
          if(buffer){
            console.log("=================buffer", buffer);
            const blob = new Blob([buffer]);
            console.log("=================blob", blob);
            const blobURL = URL.createObjectURL(blob);
            console.log("=================blobURL", blobURL);
            const img = new Image();
            img.src = blobURL;
            setImageSRC(img.src);
        }
        setLoading(false);
    }
    } catch (error) {
        console.error(error);
    }
    setLoading(false);
  }    

  const onSubmit = (photo: File,feature:string) => {
     switch (feature) {
        case "reimage":
             if(photo){
                 const form = new FormData();
                 form.append("image_file", photo);
                 postData(API_BASE_URL.concat(Reimage),form)
             }else{alert("Please Upload Image")};
            break;
        case "removeBackground":
            if(photo){
                const form = new FormData();
                form.append("image_file", photo);
                postData(API_BASE_URL.concat(RemoveBackround),form)
            }else{alert("Please Upload Image")};
            break;
        case "replaceBackground":
            if(photo){alert("Please Upload Image")}
            else if(promtText!==""){alert("Please Enter Prompt")}
            else{
              const form = new FormData();
              form.append("image_file", photo);
              form.append('prompt',promtText );
              postData(API_BASE_URL.concat(ReplaceBackround),form);
            };
            break;
        case "textToImage":
            if(promtText!==""){
                const form = new FormData();
                form.append('prompt',promtText );
                postData(API_BASE_URL.concat(TextToImage),form);
            }
            else{alert("Please Enter Prompt")};
            break;
        default:
            break;
     }
  };

  console.log("=====================imageSRC",imageSRC);

  return (
    <div className="container mt-5">
      <div className="row">
       {/* FEATURE SELECT  */}
      <div className="col-md-3">
         <select className="form-control" name="fetures" onChange={(e)=>onSelectHandler(e)} > 
           {feturesOption && feturesOption.length>0 && feturesOption.map((it,ind)=>(
                <option key={ind} value={it.value}>{it.name}</option>
            ))}
         </select>
      </div>


      {/* UPLOAD IMAGE  */}
      <div className="col-md-3">
        <input
          style={{ width: 300 }}
          className="form-control"
          type="file"
          disabled={onSelectData==="" || onSelectData==="textToImage"}
          onChange={(e) => fileHandleChange(e)}
        />
      </div>


        {/* PROMT TEXT  */}
       <div className="col-md-3">
          <input className="form-control"  
           placeholder=" Type Prompt"
          type="text" 
            disabled={onSelectData==="" || onSelectData==="reimage" 
            || onSelectData==="removeBackground"}
          onChange={(e)=>typePromt(e)} />
       </div>


      {/* SUBMIT BUTTON  */}
      <div className="col-md-2">
        <button
          className="btn btn-dark"
          type="button"
          onClick={() => onSubmit(imageList[0],onSelectData)}
        >
          Submit
        </button>
      </div>
      <div className="col-md-1">
        {loading && (
            <div className="spinner-border" role="status">
             <span className="visually-hidden">Loading...</span>
            </div>
          )}
      </div>
      </div> 


      <div className="row mt-5">
        <div className="col-md-6">
          {/* SHOW UPLOADED IMAGES  */}
          <div  style={{ width: 350, height: 250 }}>
            {imageList &&
              imageList.length > 0 &&
              imageList.map((it, index) => {
                return (
                  <img
                    height={400}
                    width={500}
                    key={index}
                    src={URL.createObjectURL(it)}
                    alt=""
                  />
                );
              })}
          </div>
        </div>
        <div className="col-md-6" >
          {/* SHOW RESPONSE IMAGE  */}
          {imageSRC!=="" &&(
              <img   height={400}
              width={500} src={imageSRC} alt="" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
