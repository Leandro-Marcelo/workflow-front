import React from "react";

const ListTask = ({ task }) => {
    /* console.log(`que llega acá`, card); */
    return (
        /* no nos deja crear una tarjeta sin nombre */
        <div className="">
            {task && (
                <div className="bg-white mb-2 rounded-[3px] mx-2 py-1 px-2">
                    {task.name}
                </div>
            )}
        </div>
    );
};

export default ListTask;
