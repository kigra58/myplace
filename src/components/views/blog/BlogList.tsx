import React from "react";
import useFeth from "../../../hooks/useFetch";
import { BlogEndpoints } from "../../../routes/routes";
import moment from "moment";
import lodash from "lodash";

const BlogList: React.FC = () => {

  const {data, loading}=useFeth(`${BlogEndpoints.BLOG_LIST}`,"await");

  console.log("PPPPPPPPPPPPPPPPPPPP",data);

  return (
    <div className="container mt-5">
     
      <div className="row">
        {data &&
          data.length > 0 ?
          data.map((it:{created_ts:string,title:string,content:string},) => {
            return (
              <div className="col-md-4">
                <div className="card mb-3" style={{ maxWidth: 540 }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src="..."
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{lodash.upperFirst(it?.title)}</h5>
                        <p className="card-text">
                         {it?.content}
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            {moment(it?.created_ts).format("MMM DD YYYY")}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }):loading?  <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>:"No Blogs Found"}
      </div>
    </div>
  );
};

export default BlogList;
