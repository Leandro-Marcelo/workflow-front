import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { aPost } from "../../axios";
import { useDispatch } from "react-redux";
import { addList } from "../../features/team/teamSlice";

const AddList = ({ idTeam }) => {
    const initailForm = {
        name: "",
        description: "",
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

    const createList = () => {
        dispatch(addList({ idTeam, newList }));
        setNewList(initailForm);
        setOpen(true);
    };

    return (
        /* TA TODO DENTRO DE UN DIV VACIO WOTOFOK */
        <div className="">
            {open ? (
                <div
                    /* flex  bg-[#00000014] hover:bg-[#00000029]   px-3 py-2 rounded-[3px] */
                    className="flex  bg-white/30 hover:bg-white/40 px-3 py-2 rounded-[3px] "
                    onClick={() => setOpen(false)}
                >
                    <div className="flex justify-center items-center">
                        <AddIcon
                            fontSize="small"
                            /* new color #172b9d color que estaba */
                            className="text-white cursor-pointer "
                        />
                        {/* text-[#172b4d] */}
                        <p className=" cursor-pointer font-normal text-white">
                            Add another list
                        </p>
                    </div>
                </div>
            ) : (
                <div className=" bg-[#ebecf0] rounded-[3px] w-[272px] h-[80px] p-1">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onBlur={null}
                        placeholder={"Enter list title..."}
                        className="w-[264px] h-[36px] cursor-pointer rounded-[3px]  bg-[white] border-2 px-3 py-2 border-[#0079bf] outline-none text-[#172b4d] mb-1"
                        value={newList.name}
                        onChange={handleChange}
                        autoFocus
                    />
                    <div className="flex w-full items-center">
                        <button
                            className="hover:bg-[#026aa7] bg-[#0079bf] text-white h-8 w-20 rounded-[3px]"
                            onClick={createList}
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
