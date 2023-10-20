import { useState } from 'react'
import { CodingEndpoints } from '../constant';
import Toast from '../components/Navbar/Toast';
import axios from 'axios';

const useSaveProblem = ({title,category,code}:{title:string;category:string;code:string,}) => {
  const [saveLoading,setSaveLoading]=useState(false);
  
  const onSubmit = async (id?:string) => {
    try {
        setSaveLoading(true);
      const { data } = await axios.post(`${CodingEndpoints.CREATE_NEW_PROBLEM}`,
        { code, title, category,id }
      );
      if (data && data.success) {
        return <Toast success={data.success} message={data.message} />;
      }
      <Toast success={data.success} message={data.message} />;
      setSaveLoading(false);
    } catch (error) {
      console.error(error);
      setSaveLoading(false);
    }
    setSaveLoading(false);
  };

  return {saveLoading,onSubmit}
}

export default useSaveProblem;