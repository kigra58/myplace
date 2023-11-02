import React from "react";
import { useParams } from "react-router-dom";
import { convert } from "html-to-text";
import useFeth from "../../../hooks/useFetch";
import { BlogEndpoints } from "../../../routes/routes";
import lodash from "lodash";

const ReadBlog: React.FC = () => {
  const params = useParams();

  const { data: bloginfo, loading } = useFeth(
    `${BlogEndpoints.BLOG_DEATILS?.replace(":id",`${params.id}`)}`,
    "await"
  );

  return (
    <div className="container mt-5">
      {bloginfo &&
        bloginfo.length > 0 ?
        bloginfo.map(
          (it: { title: string; content: string; category: string }, index) => {
            return (
              <div key={index}>
                <h4> {lodash.upperFirst(it?.title)} </h4>
                <h6>{lodash.upperFirst(it?.category)} </h6>
                <p> {convert(it?.content)} </p>
              </div>
            );
          }
        ):loading ? "Loading":"Blog details not found"}
    </div>
  );
};

export default ReadBlog;
