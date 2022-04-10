import React from "react";
import { Draggable } from "react-beautiful-dnd";
const ListTask = ({ task, index }) => {
    /* console.log(`que llega acá`, card); */
    return (
        /* no nos deja crear una tarjeta sin nombre */
        <div className="">
            {task && (
                <Draggable
                    // key y draggableId el id de la tarea
                    key={task._id}
                    draggableId={String(task._id)}
                    //quizas solo tiene que ser numero
                    index={index}
                >
                    {(provided, snapshot) => (
                        <div
                            /* className=" bg-red-800" */
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div className="bg-white mb-2 rounded-[3px] mx-2 py-1 px-2">
                                {task.name}
                            </div>
                        </div> //Task Item
                    )}
                </Draggable>
            )}
        </div>
    );
};

export default ListTask;

/* 

                            <Draggable
                               // key y draggableId el id de la tarea
                                key={task._id}
                                draggableId={String(task._id)}
                                //quizas solo tiene que ser numero
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        className=" bg-green-100 text-black p-5"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        // el contenido de la tarea, el nombre xd
                                        {task.name}
                                    </div> //Task Item
                                )}
                            </Draggable>






*/

/* 


así estaba

<div className="">
            {task && (
                <div className="bg-white mb-2 rounded-[3px] mx-2 py-1 px-2">
                    {task.name}
                </div>
            )}
        </div>




*/
