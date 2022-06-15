import React from "react";
import { useParams }  from "react-router-dom";

export const Details = () => {
    const params = useParams<{ code: string }>();
    console.log(params.code);
    return (<p>{params.code}</p>);
}