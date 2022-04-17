import { TextareaAutosize } from "@mui/material";
import React from "react";
import Oval from "./assets/Oval.jpg";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
const InputComent = () => {
    return (
        <div className="w-full min-h-[144px] flex flex-col bg-[white] p-6">
            <TextareaAutosize
                className="w-full border-2  border-[#67727E] rounded-[8px] mb-6 px-5 py-3 resize-none"
                placeholder="Agrega un comentario"
                minRows={3}
            />
            <div className="flex justify-between items-center ">
                <img
                    src={Oval}
                    alt=""
                    className="rounded-[50%] w-[40px] h-[40px]"
                />
                <div className="flex items-center gap-3">
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            cursor: "default",
                            height: "48px",
                            width: "184px",
                        }}
                        /* className="mt-2 cursor-default h-[48px] w-[104px]" */
                    >
                        <label
                            htmlFor="img"
                            className="flex items-center w-full justify-center cursor-pointer"
                        >
                            {/* el input no cubre todo el button */}
                            {/* Adjuntar archivo (opcional) */}
                            <input
                                id="img"
                                name="img"
                                type="file"
                                className="hidden"
                                /* accept=".png,.jpeg,.jpg" */
                            />
                            <AttachFileIcon /> (opcional)
                        </label>
                    </Button>
                    {/* esto podría ser un checkbox, radiusbutton o algo que afirme que subió un archivo, sería bueno que dijera que tipo de archivo subió pero podría romper la ui xd o poner el nombre pero despues de ciertos caracteres poner .... */}
                    <p>0 archivos</p>
                </div>
                <button className="h-[48px] w-[104px] bg-[#5357B6] rounded-[8px] text-white font-semibold">
                    SEND
                </button>
            </div>
        </div>
    );
};

export default InputComent;
