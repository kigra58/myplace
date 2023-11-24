export interface IProblems {
  id: number;
  title: string;
  category_id: number;
  code_id: number;
}


export interface ILangData {
  code: string;
  language: string;
  input: string;
}


export interface IUser{
  first_name:string;
  last_name:string;
  account_type:string
  _id:string
}