import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Delete from "../Team/comment/assets/Delete.svg";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "0.5rem",
};

export default function TransitionsModal({
    deleteTeam,
    idTeam,
    modalTitle,
    deleteComment,
    idComment,
}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const removeTeam = () => {
        deleteTeam(idTeam);
        setOpen(false);
    };

    const removeComment = () => {
        deleteComment(idComment);
        setOpen(false);
    };

    return (
        <div>
            {idTeam ? (
                <Button
                    variant="outlined"
                    onClick={handleOpen}
                    startIcon={<DeleteIcon />}
                >
                    Eliminar
                </Button>
            ) : (
                <div className="flex items-center gap-1" onClick={handleOpen}>
                    <img src={Delete} alt="" className="h-[14px] w-[14px]" />
                    <p className="text-[#ED6368] font-bold">Eliminar</p>
                </div>
            )}
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
                    <Box sx={style}>
                        <Box className="flex items-center justify-between mb-4 rounded-xl">
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                {modalTitle}
                            </Typography>
                        </Box>
                        <Box className="flex gap-4">
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={idTeam ? removeTeam : removeComment}
                            >
                                Eliminar
                            </Button>
                            <Button variant="outlined" onClick={handleClose}>
                                Cancelar
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
