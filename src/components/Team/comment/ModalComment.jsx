import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Content from "./Content";
import CloseIcon from "@mui/icons-material/Close";
export default function TransitionsModal({ team, name, isFilteredUsers }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {/* este es el button */}
            <EditIcon
                className="  text-[#6b778c] hover:text-[#172b4d]  px-1"
                onClick={handleOpen}
            />

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
                    {/* bg-[white] */}
                    <div className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 md:w-[39%] w-[100%]  shadow-2xl rounded-[3px] bg-[#C5C6EF] h-[100vh] overflow-y-auto border-none outline-none px-4 py-4">
                        <div className="flex items-center justify-between rounded-xl mb-4">
                            {
                                <Typography
                                    id="transition-modal-title"
                                    variant="h4"
                                    component="h2"
                                    className="text-black text-center"
                                >
                                    Comment
                                </Typography>
                            }
                            <div onClick={handleClose}>
                                <CloseIcon />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Content />
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
