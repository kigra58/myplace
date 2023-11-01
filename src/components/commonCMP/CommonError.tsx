
interface IProps{
    isError:boolean;
    message:string
}

const CommonError= ({isError,message}:IProps) => {
    if(isError && message!==""){
        return <p className='text-danger'>{ message } </p>
    };
    return "";
};

export default CommonError;