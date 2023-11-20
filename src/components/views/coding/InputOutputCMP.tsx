import React from "react";

interface IProp {
  compilerOutput: string;
  saveLoading: boolean;
  problemId?: string;
  compilerLoading: boolean;
  compileHandler: () => void;
  onSubmit: (id?: string) => void;
}

const InputOutputCMP: React.FC<IProp> = ({
  compilerOutput,
  compilerLoading,
  saveLoading,
  problemId,
  compileHandler,
  onSubmit,
}) => {
  return (
    <div className="col-md-3 ">
      <textarea
        style={{ height: 227 }}
        className="form-control shadow-sm"
        maxLength={10}
        placeholder="INPUT"
      />
      <br />
      <textarea
        style={{ height: 240 }}
        className={`form-control shadow-sm ${compilerOutput.match("Error")&& "text-danger"}`} 
        maxLength={10}
        placeholder="OUTPUT"
        value={compilerOutput}
      />
      <br />
      {/* COMPILE CODE  */}
      <button className="btn btn-success" disabled={compilerLoading} onClick={() => compileHandler()}>
        COMPILE CODE
        {compilerLoading && (
          <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </button>
      {/* SAVE CODE  */}
      <button
        className="btn btn-dark mx-3"
        type="button"
        disabled={saveLoading}
        onClick={() => (problemId ? onSubmit(problemId) : onSubmit())}
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
