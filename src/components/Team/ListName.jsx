import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateListName } from "../../features/team/teamSlice";
import PanToolIcon from "@mui/icons-material/PanTool";
/* el id es para editar el titúlo de la lista */
const ListName = ({ name, idList }) => {
    /* const { updateListTitle } = useContext(APIContext); */
    const team = useSelector((state) => state.team);
    const dispatch = useDispatch();

    const initailForm = {
        name: name,
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
        dispatch(updateListName({ idList, name: listName.name }));
    };

    return (
        /* no nos deja crear una lista sin nombre */
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
            <div className="hover:bg-[#ddd] flex items-center justify-center w-10 h-8 rounded-[3px] ">
                {/* el padding de 1 es para achicarlo xd */}
                <PanToolIcon className="  text-[#6b778c] hover:text-[#172b4d]  px-1" />
            </div>
        </div>
    );
};

export default ListName;

/* 


<div className="flex justify-between py-2">
            {activeInput ? (
                <input
                    type="text"
                    name="title"
                    value={listTitle.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    className="w-full mr-0 cursor-pointer rounded-sm bg-[#EBECF0] focus:bg-[white] focus:border-2 px-2 border-blue-600 outline-none"
                />
            ) : (
                <p
                    onClick={() => setActiveInput(true)}
                    className="w-full cursor-pointer"
                >
                    {listTitle.title}
                </p>
            )}
            <div className="hover:bg-[#ddd] w-8 h-8 flex justify-center items-center">
                <FontAwesomeIcon icon={faEllipsis} className="" /> 
                <MoreHorizIcon />
            </div>
        </div>



*/
