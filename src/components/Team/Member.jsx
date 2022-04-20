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
import { useDispatch, useSelector } from "react-redux";
export default function AlignItemsList({ team, isFilteredUsers }) {
    const APIREST = process.env.REACT_APP_APIREST;
    const teamState = useSelector((state) => state.team);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let data;
    data = isFilteredUsers ? team.filteredUsers : team.members;

    const modifyRole = (idTeam, idMember, newRole) => {
        dispatch(changeRole({ idTeam, idMember, newRole }));
    };

    const removeMember = (idTeam, idMember) => {
        dispatch(deleteMember({ idTeam, idMember }));
    };

    const addAMember = (idTeam, idNewMember, name, email, img) => {
        dispatch(addMember({ idTeam, idNewMember, name, email, img }));
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
                                        ? APIREST + el._id.img
                                        : el.img
                                        ? APIREST + el.img
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
                            } ${
                                Number.isInteger(el.role)
                                    ? ""
                                    : el.role.toUpperCase()
                            }`}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                        className={
                                            el._id._id === auth.user.id
                                                ? "text-[#0079bf]"
                                                : "text-[black]"
                                        }
                                    >
                                        {el._id.email
                                            ? el._id.email
                                            : el.email
                                            ? el.email
                                            : ""}
                                    </Typography>
                                </React.Fragment>
                            }
                            className={
                                el._id._id === auth.user.id
                                    ? "text-[#0079bf]"
                                    : "text-[black]"
                            }
                        />
                        {teamState.userRole === "leader" &&
                        isFilteredUsers === false ? (
                            <MenuMoreVertIcon
                                idTeam={team.team._id}
                                idMember={el._id._id}
                                modifyRole={modifyRole}
                                removeMember={removeMember}
                                leader={true}
                            />
                        ) : teamState.userRole === "leader" &&
                          isFilteredUsers === true ? (
                            <MenuMoreVertIcon
                                idTeam={team.team._id}
                                idNewMember={el._id}
                                name={el.name}
                                email={el.email}
                                img={el.img ? el.img : ""}
                                isFilteredUsers={isFilteredUsers}
                                addAMember={addAMember}
                            />
                        ) : (
                            ""
                        )}
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ))}
        </List>
    );
}
