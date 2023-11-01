import React from 'react'
import { useParams } from 'react-router-dom';
import { convert } from "html-to-text";
import useFeth from '../../../hooks/useFetch';
import { ROUTES } from '../../../routes/routes';


const ReadBlog:React.FC = () => {
    const params=useParams();
    const {data,loading}= useFeth(`${ROUTES.BLOG_LIST}`,"await");
    console.log("===============yyyyyyyyyy",data)
  return (
    <div>ReadBlog</div>
  )
}

export default ReadBlog