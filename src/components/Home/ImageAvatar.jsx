import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
/* import Piba from "../../assets/img/1.jpeg"; */

export default function ImageAvatars({ img, name }) {
    const apiURL = "http://localhost:4000";
    return (
        <Stack direction="row" spacing={2}>
            {/* esto me tira problema de cors */}
            <Avatar alt={name} src={apiURL + img} />
        </Stack>
    );
}
