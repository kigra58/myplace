import { useState } from 'react'
import { CodingEndpoints } from '../constant';

import axios from 'axios';
import Toast from '../components/Toast/Toast';

const useSaveProblem = ({title,category,code}:{title:string;category:string;code:string,}) => {
  const [saveLoading,setSaveLoading]=useState(false);
  
  const onSubmit = async (problemId?:string) => {
    try {
        setSaveLoading(true);
      const { data } = await axios.post(`${CodingEndpoints.CREATE_NEW_PROBLEM}`,
        { code, title, category,problemId }
      );
      if (data && data.success) {
        console.log("=====================,data",data.success,data.message)
        return <Toast success={data.success} message={data.message} />;
      }
      setSaveLoading(false);
      return <Toast success={data.success} message={data.message} />;
    } catch (error) {
      console.error(error);
      setSaveLoading(false);
    }
    setSaveLoading(false);
  };

  return {saveLoading,onSubmit}
}

export default useSaveProblem;