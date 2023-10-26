const BASE_URL = process.env.REACT_APP_BASE_URL;
export const ROUTES = {
  HOME:"/",
  PROBLEMS: "/problems",
  MCQ: "/mcq-list",
  CREATE_NEW_PROBLEM: "/create-new-problem",
  CREATE_NEW_MCQ: "/create-mcq",
  COMPILER: "/compiler/:id",
  SUBMIT_SOLUTION:"/submit-solution"
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



export const TestEndpoints={
  SUBMIT_SOLUTION: BASE_URL?.concat("test").concat(ROUTES.SUBMIT_SOLUTION),
  GET_USER_SOLUTION: BASE_URL?.concat("test/user-solution"),
  MCQ_LIST: BASE_URL?.concat("test").concat(ROUTES.MCQ),
  CREATE_NEW_MCQ: BASE_URL?.concat("test").concat(ROUTES.CREATE_NEW_MCQ),
}

export const COMPILER_URL = "https://api.codex.jaagrav.in";
export const ADD_PROBLEM = "addProblem";
export const FONT_SIZE = [15, 16, 17, 18, 19, 20];

export const firstELe = {
  category: "Select Category",
};
export const lastELe = {
  category: "Add New Category",
};

export const THEME="theme";
export const LANGUAGES="languages";
export const CATEGORY="category";
export const FONTSIZE="fontSize";
