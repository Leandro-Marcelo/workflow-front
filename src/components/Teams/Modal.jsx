import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CreateTeam from "./CreateTeam";
import AddTeam from "./AddTeam";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    /* mobil */
    /* width: "320px", */
    /* desktop */
    width: "420px",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
/* absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 w-[1000px] shadow-2xl rounded-[3px] bg-[white] h-[642px] overflow-y-auto border-none outline-none */

export default function TransitionsModal({ createData }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {/* <Button onClick={handleOpen}>Agregar Team</Button> */}
            <AddTeam handleOpen={handleOpen} />
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
                    <div className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 lg:w-[490px] md:w-[420px] w-[320px] bg-[white] shadow-2xl rounded-[3px] border-none outline-none">
                        <CreateTeam
                            createData={createData}
                            handleClose={handleClose}
                        />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
