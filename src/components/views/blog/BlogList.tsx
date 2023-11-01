import React from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import lodash from "lodash";
import useFeth from "../../../hooks/useFetch";
import { convert } from "html-to-text";

import { BlogEndpoints, ROUTES } from "../../../routes/routes";

const BlogList: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useFeth(`${BlogEndpoints.BLOG_LIST}`, "await");

  console.log("PPPPPPPPPPPPPPPPPPPP", data);

  return (
    <div className="container mt-5">
      <div className="mb-4 ">
        <button
          className="btn btn-outline-dark"
          onClick={() => navigate(ROUTES.ADD_BLOG)}
        >
          Add Blog{" "}
        </button>
      </div>
      <div className="row">
        {data && data.length > 0 ? (
          data.map(
            (it: {
              thumbnail: string;
              created_at: string;
              title: string;
              content: string;
            }) => {
              return (
                <div className="col-md-4">
                  <div className="card"  >
                    <img loading="lazy" height="200" width="250" src={it.thumbnail} 
                      className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">
                        {lodash.upperFirst(it?.title)}
                      </h5>
                      <p className="card-text">
                        {it && it.content !== ""
                          ? convert(it?.content)
                              .substring(0, 30)
                              .concat(" . . .")
                          : ""}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          {moment(it?.created_at).format("MMM DD YYYY")}
                        </small>
                      </p>
                      <Link to="#" className="card-link">Read More .. </Link>
                    </div>
                  </div>
                </div>
              );
            }
          )
        ) : loading ? (
          <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "No Blogs Found"
        )}
      </div>
    </div>
  );
};

export default BlogList;
