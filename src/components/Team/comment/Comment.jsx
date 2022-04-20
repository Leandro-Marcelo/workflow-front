import React, { useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import Avatar from "@mui/material/Avatar";
/* no puedo obtenerlo desde el assets que tengo afuera, no acepta muchos ../ */
import Add from "./assets/add.svg";
import Remove from "./assets/remove.svg";
import Edit from "./assets/Edit.svg";
import { DateTime } from "luxon";
import ModalDelete from "../../utilities/ModalDelete";

const Comment = ({ comment, deleteComment, isMyComment }) => {
    const APIREST = process.env.REACT_APP_APIREST;
    /* const [isMyComment, setIsMyComment] = useState(false); */

    /* const handleClick = () => {
        setIsMyComment(!isMyComment);
    }; */

    return (
        /* lg:w-[36.5vw] */
        <div className="flex w-[100%] lg:w-[100%] bg-white mx-auto py-4 px-4 rounded-xl">
            {/* <div className="leftbar hidden md:flex md:flex-col min-w-[40px] max-h-[100px] mr-4 bg-[#F5F6FA] rounded-xl">
                <div className="h-[33px] flex justify-center items-center">
                    <img src={Add} alt="" className="w-[11px] h-[11px]" />
                </div>
                <div className="h-[33px] flex justify-center text-[#5357B6] font-bold">
                    12
                </div>
                <div className="h-[33px] flex justify-center items-center">
                    <img src={Remove} alt="" className="w-[11px] h-[11px]" />
                </div>
            </div> */}
            <div className="rightbar w-full">
                <div className="flex justify-between mb-2">
                    <div className="flex gap-4 items-center">
                        <Avatar
                            src={
                                comment.idUser.img
                                    ? APIREST + comment.idUser.img
                                    : ""
                            }
                            alt=""
                        />
                        <p className="font-semibold text-[#334253]">
                            {comment.idUser.name}
                        </p>
                        <p className="hidden md:inline-block text-[#67727E]">
                            {DateTime.fromISO(
                                comment.created_date
                            ).toLocaleString({
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                        {/* {isMyComment && (
                            <div className=" bg-[#5357B6] text-white px-2 rounded-sm pb-[2px] flex items-center">
                                <p className="text-[14px]">you</p>
                            </div>
                        )} */}
                    </div>
                    <p className="flex items-center text-[#67727E] md:hidden">
                        {DateTime.fromISO(comment.created_date).toLocaleString({
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                    {isMyComment && (
                        <div className="hidden md:flex gap-4 md:items-center">
                            <ModalDelete
                                modalTitle={
                                    "¿Estas seguro de eliminar el comentario?"
                                }
                                deleteComment={deleteComment}
                                idComment={comment._id}
                            />
                            <div className="flex items-center gap-1">
                                <img
                                    src={Edit}
                                    alt=""
                                    className="h-[14px] w-[14px]"
                                />
                                <p className="text-[#5357B6] font-bold">
                                    Editar
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="text-[#67727E]">{comment.content}</div>
                {/* aprender a como hacer que se descargue, ya que por ahora abre una nueva pagina y lo muestra, claro que dependiendo que si es una imagen puede descargarla, ojito que si el archivo no puede abrirse en una pestaña del navegador entonces se descarga */}
                {comment.fileName && (
                    <a
                        href={APIREST + comment.file}
                        rel={"noreferrer"}
                        target={"_blank"}
                        /* download={comment.fileName} */
                    >
                        {comment.fileName}
                    </a>
                )}
                {isMyComment && (
                    <div className="flex justify-end mt-4 md:hidden gap-4 items-center">
                        <ModalDelete
                            modalTitle={
                                "¿Estas seguro de eliminar el comentario?"
                            }
                            deleteComment={deleteComment}
                            idComment={comment._id}
                        />
                        <div className="flex items-center gap-1">
                            <img
                                src={Edit}
                                alt=""
                                className="h-[14px] w-[14px]"
                            />
                            <p className="text-[#5357B6] font-bold">Editar</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;

/* 
reply desktop y mobile
<div className="hidden md:flex gap-2 text-[#5357B6]">
                            <ReplyIcon />
                            <p className="font-bold">Reply</p>
                        </div>

puntuación mobile

  <div className="leftbar w-[120px] max-h-[40px] mr-4 bg-[#F5F6FA] rounded-xl flex md:hidden justify-between items-center px-4">
                        <img src={Add} alt="" className="w-[11px] h-[11px]" />
                        <div className="h-[33px] flex justify-center items-center text-[#5357B6] font-bold">
                            12
                        </div>
                        <img
                            src={Remove}
                            alt=""
                            className="w-[11px] h-[11px]"
                        />
                    </div>


*/
