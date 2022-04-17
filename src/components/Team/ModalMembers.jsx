import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Member from "../Team/Member";

import Typography from "@mui/material/Typography";
import Avatar from "../utilities/Avatar";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "0.5rem",
};

export default function TransitionsModal({ team, title, isFilteredUsers }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <p
                className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1 cursor-pointer"
                onClick={handleOpen}
            >
                {title}
            </p>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 md:w-[39%] w-[80%]  shadow-2xl rounded-[3px] bg-[white] h-[642px] overflow-y-auto border-none outline-none">
                        <div className="flex items-center justify-center rounded-xl px-8 pt-8 mb-4">
                            <Typography
                                id="transition-modal-title"
                                variant="h4"
                                component="h2"
                            >
                                {title}
                            </Typography>
                        </div>
                        <div className="flex justify-center">
                            {/* la data contiene o la información de los miembros del equipo o  la información de los usuarios filtrados, es decir, esos usuarios que puedo agregar al equipo */}
                            {isFilteredUsers ? (
                                <Member
                                    team={team}
                                    isFilteredUsers={isFilteredUsers}
                                />
                            ) : (
                                <Member
                                    team={team}
                                    isFilteredUsers={isFilteredUsers}
                                />
                            )}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
