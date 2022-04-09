import React, { useRef, useState } from "react";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"; */
import CloseIcon from "@mui/icons-material/Close";

import AddIcon from "@mui/icons-material/Add";
const AddCard = ({ idList }) => {
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
                    onClick={() => setOpen(false)}
                >
                    <AddIcon
                        fontSize="small"
                        className="cursor-pointer mr-[3px]"
                    />
                    <p className="">Add a card</p>
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
                        className="hover:bg-[#026aa7] bg-[#0079bf] text-white h-8 w-20 rounded-sm"
                        onClick={handleSpanInput}
                    >
                        Add card
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

/* 

 <div className="bg-[#EBECF0] ">
                    <div className="mb-2">
                        <input
                            type="search"
                            name="text"
                            id="text"
                            onBlur={() => handleBlur()}
                            placeholder={"Enter a title for this card..."}
                            className="w-full h-11 rounded-md px-2 text-black"
                            value={cardOrListText.text}
                            onChange={handleChange}
                            autoFocus
                        />
                    </div>
                    <div className="flex justify-between items-center ">
                        <div className="flex justify-between w-full">
                            <button className="hover:bg-[#026aa7] bg-[#0079bf] text-white h-8 w-20 rounded-sm">
                                Add card
                            </button>
                            <div className="hover:bg-[#ddd] w-8 h-8 flex justify-center items-center text-black">
                              
                            </div>
                        </div>
                    </div>
                </div>

    const handleChange = (e) => {
        setCardOrListText({
            ...cardOrListText,
            [e.target.name]: e.target.value,
        });
    };



*/

/* 

TEXT AREA HERMOSO

  <textarea
                        name="text"
                        id="text"
                        className="w-full h-[66px] rounded-[3px] text-[#172b4d] outline-none px-2 py-1 resize-none shadow-[0_0_16px_-8px_#000000aa]  "
                        placeholder={"Enter a title for this card..."}
                        autoFocus
                        value={cardOrListText.text}
                        onChange={handleChange}
                        onBlur={() => handleBlur()}
                    />



*/
