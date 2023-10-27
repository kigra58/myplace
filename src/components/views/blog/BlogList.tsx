import React from "react";
import useFeth from "../../../hooks/useFetch";
import { BlogEndpoints } from "../../../routes/routes";

const BlogList: React.FC = () => {

  const {data, loading}=useFeth(`${BlogEndpoints.BLOG_LIST}`);

  console.log("PPPPPPPPPPPPPPPPPPPP",data);

  return (
    <div className="container mt-5">
     
      <div className="row">
        {data &&
          data.length > 0 ?
          data.map((it:{created_ts:Date,title:string,content:string},) => {
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
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            Last updated 3 mins ago
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
