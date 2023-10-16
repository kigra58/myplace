import React, { ChangeEvent, useState } from 'react'
import image_file from "./photo.jpg"

const API_URL="https://clipdrop-api.co/reimagine/v1/reimagine"
const API_KEY="2b99e716da1abf3953fced075f4e60daff002eaf854e144307a5aeab2195b110d08b4f0fdfefb71918fc4ba88f2f5acf"

const Test = () => {
    const [imageList, setimageList] = useState<File[]>([]);
    const fileHandleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file && file.length > 0) {
            setimageList([...imageList,...file])
        }
      };

      const onSubmit=(photo:File)=>{
        const form = new FormData();
        console.log("==============",photo)
        form.append('image_file', photo);

        console.log("=================form",form);
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'x-api-key': API_KEY,
          },
          body:form ,
        })
          .then(response => response.arrayBuffer())
          .then(buffer => {
            console.log("=================buffer",buffer);
            const blob = new Blob([buffer]);
            console.log("=================blob",blob);
            const blobURL = URL.createObjectURL(blob);
            console.log("=================blobURL",blobURL);
            const img = new Image();
            img.src = blobURL;
            document.body.appendChild(img);
        
          });
      };

 
  return (
    <div>
        <input type='file' onChange={(e)=>fileHandleChange(e)} /><br/>
        <div style={{width:350, height:250}}>
            {imageList && imageList.length>0 && imageList.map((it,index)=>{
               return(
                 <img  height={400} width={500} key={index}  src={URL.createObjectURL(it)} alt='' />
               )
            })}
        </div>
        <button type='button' onClick={()=>onSubmit(imageList[0])}> Submit </button>
    </div>
  )
}

export default Test