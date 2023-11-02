export const convertToBase64 = (file:File) => {
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


 export const  convertBase64ToBlog=async (url:string)=>{
   const res = await fetch(url);
   const blob = await res.blob();
   const imageUrl= URL.createObjectURL(blob);
   return imageUrl;  
 } 