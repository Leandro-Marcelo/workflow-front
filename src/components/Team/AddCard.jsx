import React, { useRef, useState } from "react";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"; */
import CloseIcon from "@mui/icons-material/Close";

import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../features/team/teamSlice";
const AddCard = ({ idList }) => {
    const auth = useSelector((state) => state.auth);
    const team = useSelector((state) => state.team);
    const dispatch = useDispatch();
    const spanInput = useRef();
    const handleSpanInput = () => {
        console.log(`active`);
        /* SI PRESIONA ENTER SE ENVIA ASÍ */
        if (spanInput.current.textContent === "") {
            console.log(`entre acá`);
            setOpen(true);
            return;
        }
        console.log(`este valor tengo`, spanInput.current.textContent);
        dispatch(
            addTask({
                idList,
                name: spanInput.current.textContent,
                author: auth.user.name,
            })
        );
        /*    addCard(spanInput.current.textContent, id); */
        setOpen(true);
    };

    const [open, setOpen] = useState(true);

    const handleBlur = () => {
        /*    if (cardOrListText.text === "") {
            setOpen(true);
            return;
        }
        if (type) {
            addCard(cardOrListText.text, id);
            setCardOrListText(initailForm);
        }
        setOpen(true); */
    };

    return (
        <div className="pb-2  ">
            {open ? (
                <div
                    /* flex  bg-[#00000014] hover:bg-[#00000029]   px-3 py-2 rounded-[3px]  */
                    /* flex pb-2 backdrop-blur-sm bg-white/30 */
                    className="flex items-center mx-2 px-1 text-[#6b778c] hover:text-[#172b4d] rounded-[3px] hover:bg-[#ddd] cursor-pointer "
                    onClick={() =>
                        team.userRole === "leader" || team.userRole === "editor"
                            ? setOpen(false)
                            : console.log(
                                  `no tienes rol necesario para crear una tarea, mirar el video de fatz para mandar notificaciones`
                              )
                    }
                >
                    <AddIcon
                        fontSize="small"
                        className="cursor-pointer mr-[3px]"
                    />
                    {/* Add a card */}
                    <p className="">Agregar una tarea</p>
                </div>
            ) : (
                <div className="px-2">
                    <span
                        role="search"
                        id="spanInput"
                        contentEditable
                        /* no tiene autofocus */
                        ref={spanInput}
                        onBlur={() => handleBlur()}
                        className="w-full min-h-[66px] block rounded-[3px] text-[#172b4d] outline-none px-2 py-1 shadow-[0_0_16px_-8px_#000000aa] bg-white mb-2"
                    ></span>
                    <button
                        /*  Add card */
                        className="hover:bg-[#026aa7] bg-[#0079bf] text-white h-8 w-32 rounded-sm"
                        onClick={handleSpanInput}
                    >
                        Agregar Tarea
                    </button>
                    <CloseIcon
                        className="text-[#42526e] hover:text-[#172b4d] ml-2 cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>
            )}
        </div>
    );
};

export default AddCard;
