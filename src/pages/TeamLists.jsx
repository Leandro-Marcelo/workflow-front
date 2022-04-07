import React from "react";
import { useNavigate } from "react-router-dom";

const TeamLists = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        /* 92.7vh */
        <div className="h-[92.7vh] text-white px-4 py-4 bg-[#000]">
            <div className="flex ">
                <p
                    className="mr-2  bg-white/30 hover:bg-white/40 px-2 py-1"
                    onClick={goBack}
                >
                    Volver a Equipos
                </p>
                <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                    Challenge 1 - ONE
                </p>
                <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                    Mostrar Miembros
                </p>
                <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                    Agregar Miembros
                </p>
            </div>
            {/* 94% */}
            <div className="flex w-full h-[94%] justify-start  overflow-x-auto ">
                <div className="w-[272px] bg-transparent mx-2 shrink-0">
                    treello list
                </div>
                <div className="w-[272px] bg-transparent mx-2 shrink-0">
                    treello list
                </div>
                <div className="w-[272px] bg-transparent mx-2 shrink-0">
                    treello list
                </div>
                <div className="w-[272px] mx-2 shrink-0">add list</div>
            </div>
        </div>
    );
};

export default TeamLists;
