import React from "react";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../features/team/teamSlice";
const ListTask = ({ task, index, idList }) => {
    /* console.log(`que llega acá`, card); */
    const dispatch = useDispatch();
    const removeTask = () => {
        dispatch(deleteTask({ idList, idTask: task._id }));
        /* console.log(task._id);
        console.log(idList); */
    };
    return (
        /* no nos deja crear una tarjeta sin nombre */
        <div className="">
            <Draggable
                // key y draggableId el id de la tarea
                key={task._id}
                draggableId={"task-" + String(task._id)}
                //quizas solo tiene que ser numero
                index={index}
            >
                {(provided, snapshot) => (
                    <div
                        /* esto estaba sin flex */
                        className="flex"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <div
                            className="bg-white mb-2 rounded-[3px] ml-2 py-1 px-2 w-[90%]"
                            {...provided.dragHandleProps}
                        >
                            {task.name}
                        </div>
                        {/* y este div no existía */}
                        <div
                            className="hover:bg-[#ddd] flex items-center justify-center w-10 h-8 rounded-[3px] cursor-pointer"
                            onClick={removeTask}
                        >
                            <DeleteIcon className="  text-[#6b778c] hover:text-[#172b4d]  px-1" />
                        </div>
                    </div> //Task Item
                )}
            </Draggable>
        </div>
    );
};

export default ListTask;

/* 
<div
                            className="hover:bg-[#ddd] flex items-center justify-center w-10 h-8 rounded-[3px] cursor-pointer"
                            
                        >
                        
                            <DeleteIcon className="  text-[#6b778c] hover:text-[#172b4d]  px-1" />
                        </div>



*/
