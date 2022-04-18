import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import Avatar from "@mui/material/Avatar";
/* no puedo obtenerlo desde el assets que tengo afuera, no acepta muchos ../ */
import Add from "./assets/add.svg";
import Remove from "./assets/remove.svg";
import Oval from "./assets/Oval.jpg";
import Edit from "./assets/Edit.svg";
import Delete from "./assets/Delete.svg";
import ModalDelete from "../../utilities/ModalDelete";

const Comment = ({ comment, deleteComment }) => {
    const PF = "http://localhost:4000";
    const [isMyComment, setIsMyComment] = useState(false);

    const handleClick = () => {
        setIsMyComment(!isMyComment);
    };

    return (
        <div className="flex max-w-[730px] bg-white mx-auto py-6 px-6 rounded-xl">
            <div className="leftbar hidden md:flex md:flex-col min-w-[40px] max-h-[100px] mr-4 bg-[#F5F6FA] rounded-xl">
                <div className="h-[33px] flex justify-center items-center">
                    <img src={Add} alt="" className="w-[11px] h-[11px]" />
                </div>
                <div className="h-[33px] flex justify-center text-[#5357B6] font-bold">
                    12
                </div>
                <div className="h-[33px] flex justify-center items-center">
                    <img src={Remove} alt="" className="w-[11px] h-[11px]" />
                </div>
            </div>
            <div className="rightbar">
                <div className="flex justify-between mb-2">
                    <div className="flex gap-4 items-center">
                        <img
                            src={
                                comment.idUser.img
                                    ? PF + comment.idUser.img
                                    : ""
                            }
                            alt=""
                            className="rounded-[50%] w-[42px] h-[42px]"
                        />
                        <p className="font-semibold text-[#334253]">
                            {comment.idUser.name}
                        </p>
                        {isMyComment && (
                            <div className=" bg-[#5357B6] text-white px-2 rounded-sm pb-[2px] flex items-center">
                                <p className="text-[14px]">you</p>
                            </div>
                        )}
                        <p className="text-[#67727E]">2 days ago</p>
                    </div>

                    {isMyComment ? (
                        <div className="hidden md:flex gap-4">
                            <div className="flex items-center gap-1">
                                <img
                                    src={Delete}
                                    alt=""
                                    className="h-[14px] w-[14px]"
                                />
                                <p className="text-[#ED6368] font-bold">
                                    Eliminar
                                </p>
                            </div>
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
                    ) : (
                        <div className="hidden md:flex gap-4 text-[#5357B6]">
                            <ReplyIcon />
                            <p className="font-bold">Reply</p>
                        </div>
                    )}
                    {/* <p>icon</p>
              <button>Reply</button> */}
                </div>
                <div className="text-[#67727E]">
                    {comment.content}
                    <button onClick={handleClick}>click me</button>
                </div>
                <div className="flex justify-between mt-4">
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
                    {isMyComment ? (
                        <div className="flex md:hidden gap-4">
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
                    ) : (
                        <div className="flex md:hidden gap-4 text-[#5357B6]">
                            <ReplyIcon />
                            <p className="font-bold">Reply</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comment;
