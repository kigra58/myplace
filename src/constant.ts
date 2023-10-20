const BASE_URL = process.env.REACT_APP_BASE_URL;
export const Endpoints = {
  PROBLEMS: "/problems",
  CREATE_NEW_PROBLEM: "/create-problem",
  COMPILER: "/compiler/:id",
};

export const CodingEndpoints = {
  CREATE_NEW_PROBLEM: BASE_URL?.concat("coding/create-new-problem"),
  PROBLEMS: BASE_URL?.concat("coding/problems"),
  PROBLEM_DETAILS: BASE_URL?.concat("coding/problem-details/:id"),
  PROBELM_CATEGORY: BASE_URL?.concat("coding/problem-category"),
};

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
