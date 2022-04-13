import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

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

export default function TransitionsModal({ team }) {
    /* console.log(`team:`, team); */
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <p
                className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1 cursor-pointer"
                onClick={handleOpen}
            >
                Ver Miembros
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
                    <div className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 w-[1000px] shadow-2xl rounded-[3px] bg-[white] h-[642px] overflow-y-auto border-none outline-none">
                        <div className="flex items-center justify-between rounded-xl px-8 pt-8">
                            <Typography
                                id="transition-modal-title"
                                variant="h4"
                                component="h2"
                            >
                                Miembros del Equipo
                            </Typography>
                        </div>
                        <div className="px-8 py-8">
                            {team.members &&
                                team.members.map((member) => (
                                    <Avatar
                                        key={member?._id?._id}
                                        role={member.role}
                                        member={member._id}
                                        Leader={team.team.idLeader}
                                        idTeam={team.team._id}
                                    />
                                ))}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

/* 

<Button
                                variant="outlined"
                                color="error"
                                onClick={teamEliminated}
                            >
                                Eliminar
                            </Button>
                            <Button variant="outlined" onClick={handleClose}>
                                Cancelar
                            </Button>

<div className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 w-[1000px] shadow-2xl rounded-[3px]"></div>;



  <Box sx={style}>
                        <Box className="flex items-center justify-between mb-4 rounded-xl">
                            <Typography
                                id="transition-modal-title"
                                variant="h4"
                                component="h2"
                            >
                                Miembros del Equipo
                            </Typography>
                        </Box>
                        <div className="overflow-y-auto">
                            {members.map((member) => (
                                <Avatar
                                    key={member._id._id}
                                    role={member.role}
                                    member={member._id}
                                    Leader={Leader}
                                />
                            ))}
                        </div>
                    </Box>






*/
