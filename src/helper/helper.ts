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
      consol.log("Hello world !")`;
  }
};
