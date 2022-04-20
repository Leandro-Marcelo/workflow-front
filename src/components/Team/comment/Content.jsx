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
    const team = useSelector((state) => state.team);
    const auth = useSelector((state) => state.auth);
    const comments = useSelector((state) => state.comments);

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
                <p>Hecho por: {task.author}</p>
                <p> Creado: {new Date(task.created_at).toLocaleString()}</p>
                <p>Actualizada: {new Date(task.updated_at).toLocaleString()}</p>
                <p className="text-center text-[#5357B7] font-bold text-xl">
                    Título de la tarea
                </p>
                <TextareaAutosize
                    className="w-full text-black px-5 py-3 rounded-[8px] resize-none border-2 border-[#5357B6] outline-none"
                    value={form.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    disabled={
                        team.userRole === "validator" ||
                        team.userRole === "normal"
                            ? true
                            : false
                    }
                />

                <p className="text-center text-[#5357B7] font-bold text-xl">
                    Descripción de la tarea
                </p>
                <TextareaAutosize
                    className="w-full border-2 border-[#5357B6] outline-none rounded-[8px] px-5 py-3 resize-none"
                    placeholder="Descripción"
                    name="description"
                    value={form.description}
                    onChange={(e) => handleChange(e)}
                    minRows={3}
                    disabled={
                        team.userRole === "validator" ||
                        team.userRole === "normal"
                            ? true
                            : false
                    }
                />
                {comments.viewMembersByRole.length > 0 && (
                    <div>
                        <p className="mb-4 text-center text-[#5357B7] font-bold text-xl">
                            Asignar Tareas
                        </p>
                        <div className="h-[208px] overflow-y-auto rounded-[8px]">
                            <List
                                dense
                                /* sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} */
                                className="bg-[white] max-w-[100%]"
                            >
                                {comments.viewMembersByRole.map((member) => {
                                    const labelId = `checkbox-list-secondary-label-${member._id._id}`;
                                    return (
                                        <ListItem
                                            key={member._id._id}
                                            secondaryAction={
                                                <Checkbox
                                                    edge="end"
                                                    onChange={handleToggle(
                                                        member._id._id
                                                    )}
                                                    checked={
                                                        form.assigned.indexOf(
                                                            member._id._id
                                                        ) !== -1
                                                    }
                                                    inputProps={{
                                                        "aria-labelledby":
                                                            labelId,
                                                    }}
                                                />
                                            }
                                            disablePadding
                                        >
                                            <ListItemButton>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        alt=""
                                                        src={member._id.img}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    id={labelId}
                                                    primary={member._id.name}
                                                    className="font-semibold text-[#334253]"
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>
                    </div>
                )}
                <p className="text-center text-[#5357B7] font-bold text-xl">
                    Comentarios
                </p>
                {taskComments.comments.map((comment) => {
                    console.log(`se renderiza los comentarios`);
                    const isMyComment =
                        comment.idUser._id === auth.user.id ||
                        comment.idUser.id === auth.user.id;
                    return (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            deleteComment={deleteComment}
                            isMyComment={isMyComment}
                        />
                    );
                })}
                <InputComent task={task} />
            </div>
            {comments.viewMembersByRole.length > 0 && (
                <div className="flex justify-center">
                    <button
                        className="h-[48px] w-[154px] my-4 mr-10 bg-[#5357B6] rounded-[8px] text-white font-semibold"
                        onClick={handleClick}
                    >
                        Guardar Cambios
                    </button>
                </div>
            )}
        </div>
    );
};

export default Content;
