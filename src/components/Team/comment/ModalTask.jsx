import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Content from "./Content";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../../features/team/teamSlice";
import {
    getComments,
    removeComment,
    viewMembersByRole,
} from "../../../features/team/comments";
import { CircularProgress } from "@mui/material";
export default function TransitionsModal({ task }) {
    const comments = useSelector((state) => state.comments);
    const team = useSelector((state) => state.team);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const updateTask2 = (form) => {
        dispatch(updateTask({ form, idTask: task._id }));
    };

    const handleClick = () => {
        handleOpen();
        dispatch(getComments({ idTask: task._id }));
        dispatch(
            viewMembersByRole({ idTeam: team.team._id, role: team.userRole })
        );
    };

    const deleteComment = (idComment) => {
        dispatch(removeComment({ idTask: task._id, idComment }));
    };

    return (
        <div>
            {/* este es el button */}
            <EditIcon
                className="  text-[#6b778c] hover:text-[#172b4d]  px-1"
                onClick={handleClick}
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
                    <div className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 md:w-[80%] lg:w-[52%]  w-[100%]  shadow-2xl rounded-[3px] bg-[#C5C6EF] h-[100vh] lg:h-[90vh] md:h-[90vh] overflow-y-auto border-none outline-none px-4 py-4">
                        <div className="flex items-center justify-between rounded-xl mb-4">
                            {
                                <Typography
                                    id="transition-modal-title"
                                    variant="h4"
                                    component="h2"
                                    className="text-[#5357B7] font-bold"
                                >
                                    Tarea
                                </Typography>
                            }
                            <div onClick={handleClose}>
                                <CloseIcon />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {comments.taskComments.comments ? (
                                <Content
                                    task={task}
                                    updateTask2={updateTask2}
                                    taskComments={comments.taskComments}
                                    deleteComment={deleteComment}
                                />
                            ) : (
                                <CircularProgress />
                            )}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
