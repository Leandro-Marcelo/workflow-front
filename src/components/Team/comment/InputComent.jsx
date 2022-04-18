import { TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import Oval from "./assets/Oval.jpg";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useDispatch } from "react-redux";
import { addComment } from "../../../features/team/comments";
const InputComent = ({ task }) => {
    const dispatch = useDispatch();

    const initialState = {
        content: "",
        file: null,
    };

    const [credentials, setCredentials] = useState(initialState);

    const handleSubmit = () => {
        //como chota puedo saber que tiene dentro el formData este xd
        const comment = new FormData();
        comment.append("content", credentials.content);
        comment.append("file", credentials.file);
        dispatch(
            addComment({ idTask: task._id, idList: task.idList, comment })
        );
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeFile = (file) => {
        setCredentials({
            ...credentials,
            file: file,
        });
    };

    return (
        <div className="w-full min-h-[144px] flex flex-col bg-[white] p-6 rounded-[8px]">
            <TextareaAutosize
                className="w-full border-2  border-[#67727E] rounded-[8px] mb-6 px-5 py-3 resize-none"
                placeholder="Agrega un comentario"
                name="content"
                value={credentials.content}
                onChange={handleChange}
                minRows={3}
            />
            <div className="flex justify-between items-center ">
                <img
                    src={Oval}
                    alt=""
                    className="rounded-[50%] w-[40px] h-[40px]"
                />
                <div className="flex items-center gap-3 flex-col">
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            cursor: "default",
                            height: "48px",
                            width: "124px",
                        }}
                        /* className="mt-2 cursor-default h-[48px] w-[104px]" */
                    >
                        <label
                            htmlFor="file"
                            className="flex items-center w-full justify-center cursor-pointer"
                        >
                            <input
                                className="hidden"
                                id="file"
                                name="file"
                                type="file"
                                onChange={(e) =>
                                    handleChangeFile(e.target.files[0])
                                }
                            />
                            <AttachFileIcon /> (opcional)
                        </label>
                    </Button>
                    {/* esto podría ser un checkbox, radiusbutton o algo que afirme que subió un archivo, sería bueno que dijera que tipo de archivo subió pero podría romper la ui xd o poner el nombre pero despues de ciertos caracteres poner .... */}
                </div>
                <button
                    className="h-[38px] w-[84px] bg-[#5357B6] rounded-[8px] text-white font-semibold"
                    onClick={handleSubmit}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default InputComent;
