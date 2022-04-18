import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function BasicMenu({
    idTeam,
    idMember,
    idNewMember,
    modifyRole,
    removeMember,
    isFilteredUsers,
    addAMember,
    name,
    email,
    img,
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </div>
            {isFilteredUsers ? (
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem
                        onClick={() =>
                            addAMember(idTeam, idNewMember, name, email, img)
                        }
                    >
                        Añadir al equipo
                    </MenuItem>
                </Menu>
            ) : (
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem onClick={() => removeMember(idTeam, idMember)}>
                        Expulsarlo
                    </MenuItem>
                    <MenuItem
                        onClick={() => modifyRole(idTeam, idMember, "normal")}
                    >
                        Normal
                    </MenuItem>
                    <MenuItem
                        onClick={() =>
                            modifyRole(idTeam, idMember, "validator")
                        }
                    >
                        Validador
                    </MenuItem>
                    <MenuItem
                        onClick={() => modifyRole(idTeam, idMember, "editor")}
                    >
                        Editor
                    </MenuItem>
                </Menu>
            )}
        </div>
    );
}
