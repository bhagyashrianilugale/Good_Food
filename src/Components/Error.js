import { useRouteError } from "react-router-dom";

const Error = ()=>{
    const error = useRouteError();

    console.log(error);
    return(
        <div className="m-auto">
            <h1 className="font-bold">Oops!!</h1>
            <h4 className="text-red-500">Something wents wrong yarr😸!</h4>
            <p> {error.status}: {error.statusText}</p>
        </div>
    )
}

export default Error;