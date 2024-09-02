import axios from "axios";
import toast  from "react-hot-toast";
import config from "../config/config";
import { BlogEndpoints } from "../routes/routes";

export const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const convertBase64ToBlog = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl;
};

export const defaultCodeHandler = (arg: string): string => {
  switch (arg) {
    case "py":
      return `print("Hello world")` ;
    case "java":
      return `class code{
          public static void main(String[] args) {
              // Write Java code here
              System.out.println("Hello, World!");
          }
      }`;
    case "cpp":
      return `#include <iostream>
        using namespace std;
        int main() {
            // Write C++ code here
            cout << "Hello world!";
            return 0;
        }`;

    default:
      return `
      // Write Javascript code here
      console.log("Hello world !")`;
  }
};

export const tostMsg=(success:boolean,msg:string)=>{
  const option={
    // icon: '👏',
    icon: success ? '✔️':`❌`,
    style: {
      // borderRadius: '10px',
      background: '#0d6efd',
      color: '#fff',
      // with:"50px"
    },
  }
 

  success ? toast["success"](msg,option) : toast["error"](msg,option);
}


export const pushFileToS3 = async (signedUrl: string, file: Blob) => {
  const myHeaders = new Headers({
    "Content-Type": file.type,
    "x-amz-acl": "public-read",
  });
  return fetch(signedUrl, {
    method: "PUT",
    headers: myHeaders,
    body: file,
  });
};


/**
 * Generating File URL
 * @param file
 * @param filePath
 * @returns
 */
export const uploadFileOnS3 = async (file: Blob, filePath: string) => {
  const body = {
    filePath,
    fileFormat: file.type as string,
  };
  let signedUrl;
  const {data} = await axios.post(`${BlogEndpoints.GENERATE_URL}`,body);

  if (data && data.success && data.data) {
    const response = await pushFileToS3(data.data, file);
    if (response && response.url) {
      signedUrl = response?.url.split("?Content")?.[0];
    }
  }
  return signedUrl;
};

export const filePath = async (authId: number, name?: string) => {
  return `${config.bucket}/${new Date().getTime()}-${authId}-${name}`;
};

