import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

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

export default function TransitionsModal({ deleteTeam, idTeam }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const teamEliminated = () => {
        deleteTeam(idTeam);
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="outlined"
                onClick={handleOpen}
                startIcon={<DeleteIcon />}
            >
                Eliminar
            </Button>
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
                                ¿Estas seguro de eliminar el equipo?
                            </Typography>
                        </Box>
                        <Box className="flex gap-4">
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
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
