import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { aPost } from "../../axios";
import { useDispatch } from "react-redux";

const AddList = ({ idTeam }) => {
    const initailForm = {
        listName: "",
        listDescription: "",
    };

    const dispatch = useDispatch();
    const [newList, setNewList] = useState(initailForm);
    const [open, setOpen] = useState(true);

    const handleChange = (e) => {
        setNewList({
            ...newList,
            [e.target.name]: e.target.value,
        });
    };

    const addList = () => {
        aPost(`/teams/${idTeam}/addList`, newList).then((res) => {
            dispatch();
        });
        setNewList(initailForm);
        setOpen(true);
    };

    return (
        /* TA TODO DENTRO DE UN DIV VACIO WOTOFOK */
        <div className="">
            {open ? (
                <div
                    /* 00000029 bg-white/30 backdrop-blur-sm*/
                    className="flex  bg-[#00000014] hover:bg-[#00000029]   px-3 py-2 rounded-[3px] "
                    onClick={() => setOpen(false)}
                >
                    <div className="flex justify-center items-center">
                        <AddIcon
                            fontSize="small"
                            className="text-[#172b4d] cursor-pointer "
                        />
                        <p className="text-[#172b4d] cursor-pointer font-normal">
                            Add another list
                        </p>
                    </div>
                </div>
            ) : (
                <div className=" bg-[#ebecf0] rounded-[3px] w-[272px] h-[80px] p-1">
                    <input
                        type="text"
                        name="listName"
                        id="listName"
                        onBlur={null}
                        placeholder={"Enter list title..."}
                        className="w-[264px] h-[36px] cursor-pointer rounded-[3px]  bg-[white] border-2 px-3 py-2 border-[#0079bf] outline-none text-[#172b4d] mb-1"
                        value={newList.listName}
                        onChange={handleChange}
                        autoFocus
                    />
                    <div className="flex w-full items-center">
                        <button
                            className="hover:bg-[#026aa7] bg-[#0079bf] text-white h-8 w-20 rounded-[3px]"
                            onClick={addList}
                        >
                            Add list
                        </button>
                        <CloseIcon
                            className="text-[#42526e] hover:text-[#172b4d] ml-2 cursor-pointer"
                            onClick={() => setOpen(!open)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddList;

/* Esto es del los otro icons<div className="hover:bg-[#ddd] w-8 h-8 flex justify-center items-center text-black"></div> */