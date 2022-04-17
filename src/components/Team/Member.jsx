import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import MenuMoreVertIcon from "./MenuMoreVertIcon";
import {
    addMember,
    changeRole,
    deleteMember,
} from "../../features/team/teamSlice";
import { useDispatch } from "react-redux";
export default function AlignItemsList({ team, isFilteredUsers }) {
    const PF = "http://localhost:4000";
    const dispatch = useDispatch();
    let data;
    data = isFilteredUsers ? team.filteredUsers : team.members;

    const modifyRole = (idTeam, idMember, newRole) => {
        dispatch(changeRole({ idTeam, idMember, newRole }));
    };

    const removeMember = (idTeam, idMember) => {
        dispatch(deleteMember({ idTeam, idMember }));
    };

    const addAMember = (idTeam, idNewMember) => {
        dispatch(addMember({ idTeam, idNewMember }));
    };

    return (
        <List
            /*  sx={{
                width: "100%",
                maxWidth: 330,
                bgcolor: "background.paper",
            }} */
            className="w-full max-w-[330px] md:max-w-[530px] bg-[white]"
        >
            {data.map((el) => (
                <div key={el._id._id ? el._id._id : el._id}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt=""
                                src={
                                    el._id.img
                                        ? PF + el._id.img
                                        : el.img
                                        ? PF + el.img
                                        : ""
                                }
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${
                                el._id.name
                                    ? el._id.name
                                    : el.name
                                    ? el.name
                                    : ""
                            } ${el.role ? el.role.toUpperCase() : ""}`}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {el._id.email
                                            ? el._id.email
                                            : el.email
                                            ? el.email
                                            : ""}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                        <div className="flex items-center">
                            {isFilteredUsers ? (
                                <MenuMoreVertIcon
                                    idTeam={team.team._id}
                                    idNewMember={el._id}
                                    isFilteredUsers={isFilteredUsers}
                                    addAMember={addAMember}
                                />
                            ) : (
                                <MenuMoreVertIcon
                                    idTeam={team.team._id}
                                    idMember={el._id._id}
                                    modifyRole={modifyRole}
                                    removeMember={removeMember}
                                />
                            )}
                        </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ))}
        </List>
    );
}
