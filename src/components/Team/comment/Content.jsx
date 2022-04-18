import { TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import Comment from "./Comment";
import InputComent from "./InputComent";
import ListControls from "./ListControls";

/* ListsControls */
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";

const Content = ({ task, updateTask2, taskComments, deleteComment }) => {
    console.log(`ALO LEAN?`, task);
    const team = useSelector((state) => state.team);
    const auth = useSelector((state) => state.auth);
    const currentUser = team.members.filter(
        (member) => auth.user.id === member._id._id && member
    );
    let collaborators;
    if (currentUser[0].role === "leader") {
        collaborators = team.members.filter(
            (member) => member.role !== "leader" && member
        );
        collaborators = collaborators.map((collaborator) => collaborator._id);
    } else {
        collaborators = team.members.filter((member) => {
            if (member.role !== "leader" && member.role !== "editor") {
                return member;
            }
        });
        collaborators = collaborators.map((collaborator) => collaborator._id);
    }

    const initialState = {
        name: task.name,
        description: task.description ? task.description : "",
        assigned: task.assigned,
    };
    const [form, setForm] = useState(initialState);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleClick = () => {
        updateTask2(form);
    };

    /* List Controls */
    /* Lo ideal sería que utilice el estado de form pero bueno */

    const handleToggle = (value) => () => {
        /* indexOf retorna -1 si es que no se encuentra en el arreglo, en caso contrario retorna el indice de donde se encuentra del arreglo */
        const currentIndex = form.assigned.indexOf(value);
        const newChecked = [...form.assigned];
        /* si el id no se encontraba en el arreglo, entonces lo agrega */
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            /* si el elemento ya se encontraba en el arreglo entonces lo quita */
            newChecked.splice(currentIndex, 1);
        }
        /* finalmente actualiza el estado */
        /*  setChecked(newChecked); */
        setForm({ ...form, assigned: newChecked });
    };

    return (
        <div className="w-full text-black ">
            <div className="flex justify-center flex-col gap-4">
                <p>Hecho por: Lean</p>
                <p>Creado: 4/17/2022 22:25:23</p>
                <p>Actualizada: 4/17/2022 22:25:23</p>
                <p>Título de la tarea</p>
                <TextareaAutosize
                    className="w-full text-black px-5 py-3 rounded-[8px] resize-none"
                    value={form.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    /*  disabled={true} */
                />

                <p>Descripción de la tarea</p>
                <TextareaAutosize
                    className="w-full text-black px-5 py-3 rounded-[8px] resize-none"
                    placeholder="Descripción"
                    value={form.description}
                    name="description"
                    onChange={(e) => handleChange(e)}
                />

                <div>
                    <p className="text-center">Asignar Tareas</p>
                    <div className="h-[208px] overflow-y-auto rounded-[8px]">
                        <List
                            dense
                            /* sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} */
                            className="bg-[white] w-full max-w-[360px] lg:max-w-[100%] "
                        >
                            {collaborators.map((collaborator) => {
                                const labelId = `checkbox-list-secondary-label-${collaborator._id}`;
                                return (
                                    <ListItem
                                        key={collaborator._id}
                                        secondaryAction={
                                            <Checkbox
                                                edge="end"
                                                onChange={handleToggle(
                                                    collaborator._id
                                                )}
                                                checked={
                                                    form.assigned.indexOf(
                                                        collaborator._id
                                                    ) !== -1
                                                }
                                                inputProps={{
                                                    "aria-labelledby": labelId,
                                                }}
                                            />
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt=""
                                                    src={collaborator.img}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                id={labelId}
                                                primary={collaborator.name}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </div>
                </div>
                {taskComments.comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        deleteComment={deleteComment}
                    />
                ))}
                <InputComent task={task} />
            </div>
            <div className="flex justify-center">
                <button
                    className="h-[48px] w-[134px] my-4 bg-[#5357B6] rounded-[8px] text-white font-semibold"
                    onClick={handleClick}
                >
                    GUARDAR
                </button>
            </div>
        </div>
    );
};

export default Content;
