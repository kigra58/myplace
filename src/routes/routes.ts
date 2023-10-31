const BASE_URL = process.env.REACT_APP_BASE_URL;
export const ROUTES = {
  HOME:"/",
  LOGIN:"/login",
  PROBLEMS: "/problems",
  MCQ: "/mcq-list",
  CREATE_NEW_PROBLEM: "/create-new-problem",
  CREATE_NEW_MCQ: "/create-mcq",
  COMPILER: "/compiler/:id",
  SUBMIT_SOLUTION:"/submit-solution",
  ADD_BLOG:"/create-blog",
  BLOG_LIST:"/blog-list",
  STUDENT_DASHBOARD:"/student-dashboard",
  COMPANY_DASHBOARD:"/company-dashboard",
  TEST_DETAILS:"/test-deatils/:id",
  TEST_LIST:"/test-list"
};

export const CodingEndpoints = {
  CREATE_NEW_PROBLEM: BASE_URL?.concat("coding"),
  PROBLEMS: BASE_URL?.concat("coding").concat(ROUTES.PROBLEMS),
  PROBLEM_DETAILS: BASE_URL?.concat("coding/problem-details/:id"),
  PROBELM_CATEGORY: BASE_URL?.concat("coding/problem-category"),
 
};

export const AuthEndpoints = {
  LOGIN: BASE_URL?.concat("user/login"),
  SIGNUP: BASE_URL?.concat("user/signup")
};



export const CompanyEndpoints = {
  COMPANY_DASHBOARD: BASE_URL?.concat("company").concat(ROUTES.COMPANY_DASHBOARD),
};


export const StudentEndpoints = {
  STUDENT_DASHBOARD: BASE_URL?.concat("test").concat(ROUTES.STUDENT_DASHBOARD),
  TEST_LIST: BASE_URL?.concat("test").concat(ROUTES.TEST_LIST),
  TEST_DEATILS: BASE_URL?.concat("test").concat(ROUTES.TEST_DETAILS),
};


export const BlogEndpoints={
  CREATE_NEW_BLOG:BASE_URL?.concat("blog").concat(ROUTES.ADD_BLOG),
  BLOG_LIST:BASE_URL?.concat("blog").concat(ROUTES.BLOG_LIST)
};


export const TestEndpoints={
  SUBMIT_SOLUTION: BASE_URL?.concat("test").concat(ROUTES.SUBMIT_SOLUTION),
  GET_USER_SOLUTION: BASE_URL?.concat("test/user-solution"),
  MCQ_LIST: BASE_URL?.concat("test").concat(ROUTES.MCQ),
  CREATE_NEW_MCQ: BASE_URL?.concat("test").concat(ROUTES.CREATE_NEW_MCQ),
};