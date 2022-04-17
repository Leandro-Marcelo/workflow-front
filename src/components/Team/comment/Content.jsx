import { TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import Comment from "./Comment";
import InputComent from "./InputComent";
import LabelPlacement from "./LabelPlacement";
import ListControls from "./ListControls";

const Content = () => {
    const initialState = {
        name: "aca iría el valor del comentario que viene de la Data Base",
    };
    const [taskName, setTaskName] = useState(initialState);
    /* console.log(taskName); */

    const handleChange = (e) => {
        setTaskName(e.target.value);
    };

    return (
        <div className="w-full text-black ">
            <div className="flex justify-center flex-col gap-4">
                <p>Hecho por: Lean</p>
                <p>Creado: 4/17/2022 22:25:23</p>
                <p>Actualizada: 4/17/2022 22:25:23</p>
                <TextareaAutosize
                    className="w-full text-black px-5 py-3 rounded-[8px] resize-none"
                    value={taskName.name}
                    onChange={(e) => handleChange(e)}
                />
                <div>
                    <p className="text-center">Asignar Tareas</p>
                    <div className="h-[208px] overflow-y-auto">
                        <ListControls />
                    </div>
                </div>
                <Comment />
                <InputComent />
            </div>
        </div>
    );
};

export default Content;
