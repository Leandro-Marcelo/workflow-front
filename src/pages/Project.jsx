import React from "react";
import { useParams } from "react-router-dom";

const Project = () => {
    const params = useParams();
    console.log(params);
    return (
        <div>
            <h2>Proyecto {params.proyecto}</h2>
        </div>
    );
};

export default Project;
