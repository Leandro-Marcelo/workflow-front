import React from "react";
import { useParams } from "react-router-dom";

const Projects = () => {
    const params = useParams();
    console.log(params);
    return (
        <div>
            <h2>P R O Y E C T O S</h2>
        </div>
    );
};

export default Projects;
