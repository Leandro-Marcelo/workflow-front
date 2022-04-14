import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

export default function ImageAvatars({ member, role, Leader, idTeam }) {
    const { name, email, img, _id } = member;
    const dispatch = useDispatch();
    /*  const expelUser = () => {
        dispatch(deleteMember({ idTeam, _id }));
    }; */
    const PF = process.env.APIREST;
    return (
        <div className="grid grid-cols-5 justify-between w-full gap-12 mb-4">
            <div className="flex items-center">
                <p>{email}</p>
            </div>
            <div className="flex items-center">
                <p>Rol: {role}</p>
            </div>
            <div className="flex items-center">
                <Avatar
                    alt={name ? name : ""}
                    src={
                        `https://workflow-347205.rj.r.appspot.com${img}`
                            ? `https://workflow-347205.rj.r.appspot.com${img}`
                            : ""
                    }
                />
            </div>
            <div className="flex items-center">
                <p>{name}</p>
            </div>
            {/* <div className="flex items-center">
                {Leader._id !== member._id ? (
                    <Button variant="outlined" color="error">
                        Expulsar
                    </Button>
                ) : (
                    <Button variant="outlined" className="cursor-default">
                        Leader
                    </Button>
                )}
            </div> */}
        </div>
    );
}

/* 
    <Stack direction="row" spacing={2}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </Stack>


*/
