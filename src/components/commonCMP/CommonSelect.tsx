import lodash from "lodash";
import React from "react";
import { CATEGORY, FONTSIZE, LANGUAGES, THEME } from "../../constant";

interface IIterator {
  name: string;
  value: string;
};

interface ICategory{
    category:string
};
interface ICompiler{
    language:string
};


interface IProps {
  divClass: string;
  arrData: any[];
  name: string;
  selectEle: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  from:string
};

const CommonSelect: React.FC<IProps> = ({
  divClass,
  arrData,
  name,
  selectEle,
  onChange,
  from
}) => {
  

//   console.log("================typeeeeeeee", from);

  return (
    <div className={divClass}>
      <select id="categorySelect"
        onChange={(e) => onChange(e)}
        className="form-control shadow-sm"
        name={name}
      >
        {from === THEME &&
          arrData &&
          arrData.length > 0 &&
          arrData.map((it: IIterator, index) => {
            return (
              <option
                key={index}
                selected={it.value === selectEle}
                value={it.value}
              >
                {it.name}
              </option>
            );
        })}

        {from===CATEGORY  &&
          arrData &&
          arrData.length > 0 &&
          arrData.map((it: ICategory, index) => {
            return (
              <option
                key={index}
                selected={it.category === selectEle}
                value={it.category}
              >
                {it.category}
              </option>
            );
        })}
        {from===LANGUAGES &&
          arrData &&
          arrData.length > 0 &&
          arrData.map((it: ICompiler, index) => {
            return (
              <option
                key={index}
                selected={it.language === selectEle}
                value={it.language}
              >
                {lodash.upperCase(it.language)}
              </option>
            );
        })}
  
        {from === FONTSIZE &&
          arrData &&
          arrData.length > 0 &&
          arrData.map((it: number, index) => {
            return (
              <option
                key={index}
                selected={it === Number(selectEle)}
                value={it}
              >
                {it}
              </option>
            );
        })}
      </select>
    </div>
  );
};

export default CommonSelect;
