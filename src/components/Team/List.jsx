import React, { useState } from "react";
import AddCard from "./AddCard";
import DeleteIcon from "@mui/icons-material/Delete";
import ListTask from "./ListTask";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { deleteList, updateListName } from "../../features/team/teamSlice";
import PanToolIcon from "@mui/icons-material/PanTool";

const List = ({ list, index, idTeam }) => {
    const dispatch = useDispatch();

    const initailForm = {
        name: list.name,
    };

    const [listName, setListName] = useState(initailForm);

    const handleChange = (e) => {
        /* habría que ver como guardarlo en el backend. Agregar lo de que se guarde la edición del title aparte de clickeando afuera, tambien cuando le den al enter */
        setListName({
            ...listName,
            [e.target.name]: e.target.value,
        });
    };

    /* handleBlur y enter */
    const handleBlur = () => {
        console.log(listName.name);
        dispatch(updateListName({ idList: list._id, name: listName.name }));
    };

    const removeList = () => {
        console.log(list._id);
        console.log(idTeam);
        dispatch(deleteList({ idList: list._id, idTeam }));
    };

    /* w-[272px] bg-transparent shrink-0 mr-4 */
    return (
        <div className="shrink-0 mr-4">
            <Draggable draggableId={"column-" + String(list._id)} index={index}>
                {(provided, snapshot) => (
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="bg-[#EBECF0] text-[#172b4d] w-[272px] rounded-[3px]"
                    >
                        <div className="flex justify-between items-center pl-2 pr-1 py-1 ">
                            <input
                                type="text"
                                name="name"
                                /* este name es el que viene de la DB */
                                value={listName.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /* autoFocus */
                                className="w-full h-[24px]  cursor-pointer rounded-[3px] bg-[#EBECF0] focus:bg-[white] focus:border-2 border-[#0079bf] outline-none py-3 px-2 text-[#172b4d]"
                            />
                            <div
                                className="hover:bg-[#ddd] flex items-center justify-center w-10 h-8 rounded-[3px] "
                                {...provided.dragHandleProps}
                            >
                                {/* el padding de 1 es para achicarlo xd */}
                                <PanToolIcon className="  text-[#6b778c] hover:text-[#172b4d]  px-1" />
                            </div>
                            <div
                                className="hover:bg-[#ddd] flex items-center justify-center w-10 h-8 rounded-[3px] cursor-pointer"
                                onClick={removeList}
                            >
                                {/* el padding de 1 es para achicarlo xd */}
                                <DeleteIcon className="  text-[#6b778c] hover:text-[#172b4d]  px-1" />
                            </div>
                        </div>
                        {/* overflow-y-auto max-h-[50vh] lg:max-h-[70vh]*/}
                        <div className="max-h-[50vh] lg:max-h-[70vh] overflow-y-auto">
                            <Droppable
                                droppableId={String(list._id)}
                                type={"task"}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        // p-5 mt-5
                                        /*  className="bg-green-600" */
                                        ref={provided.innerRef}
                                        /* para que pueda entrar, este tiene que tener un height almenos, si es 0 no te va a dejar xd */
                                        className={"min-h-[1px]"}
                                    >
                                        {list.tasks.map((task, index) => {
                                            return (
                                                <ListTask
                                                    task={task}
                                                    key={task._id}
                                                    index={index}
                                                    idList={list._id}
                                                />
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <AddCard idList={list._id} />
                    </div>
                )}
            </Draggable>
        </div>
    );
};

export default List;
