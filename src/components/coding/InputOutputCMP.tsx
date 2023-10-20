import React from "react";

interface IProp {
  compilerOutput: string;
  compileHandler: () => void;
  compilerLoading: boolean;
  saveLoading: boolean;
  problemId?:string;
  onSubmit: (id?: string) => void;
}

const InputOutputCMP: React.FC<IProp> = ({
  compilerOutput,
  compileHandler,
  compilerLoading,
  saveLoading,
  onSubmit,
  problemId
}) => {
  return (
    <div className="col-md-3 ">
      <textarea
        style={{ height: 230 }}
        className="form-control shadow-sm"
        maxLength={10}
        placeholder="INPUT"
      />{" "}
      <br />
      <textarea
        style={{ height: 250 }}
        className="form-control shadow-sm"
        maxLength={10}
        placeholder="OUTPUT"
        value={compilerOutput}
      />
      <br />
      {/* COMPILE CODE  */}
      <button className="btn btn-success" onClick={() => compileHandler()}>
        COMPILE CODE
        {compilerLoading && (
          <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </button>
      {/* SAVE CODE  */}
      <button
        className="btn btn-dark mx-5"
        type="button"
        onClick={() => problemId ? onSubmit(problemId):onSubmit()}
      >
        SAVE CODE
        {saveLoading && (
          <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default InputOutputCMP;
