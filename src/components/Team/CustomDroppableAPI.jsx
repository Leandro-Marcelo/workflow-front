import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function CustomDroppableAPI({ tasks, idList }) {
    /* console.log(`que llega en tasks:`, tasks);
    console.log(`que llega en id:`, id); */
    return (
        <Droppable droppableId={String(idList)}>
            {(provided, snapshot) => (
                <div
                    /* p-5 mt-5 */
                    className="bg-green-600  p-5 mt-5 mr-10 space-y-5"
                    ref={provided.innerRef}
                >
                    {/* hace un map de las tareas que tiene, en este caso elemento */}
                    {tasks.map((task, index) => {
                        /* me tira error de Invariant failed: A Droppable requires a [string] droppableId. Provided: [number] esto se debe deber porque los id de las task se repiten xd */
                        return (
                            <Draggable
                                /* key y draggableId el id de la tarea */
                                key={task._id}
                                draggableId={String(task._id)}
                                /* quizas solo tiene que ser numero */
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        className=" bg-green-100 text-black p-5"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        {/* el contenido de la tarea, el nombre xd */}
                                        {task.name}
                                    </div> //Task Item
                                )}
                            </Draggable>
                        );
                    })}
                    {/* Task list */}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}
