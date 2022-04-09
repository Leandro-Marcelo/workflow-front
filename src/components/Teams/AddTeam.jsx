import * as React from "react";
import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";
import Stack from "@mui/material/Stack";

export default function IconLabelButtons({ handleOpen }) {
    /* Puedo hacer este button reutilizable y pasarle un icon como props, tambien lo que debe decir obvio xd? en este caso el icon es un componente o tiene la forma de las abre y cierra del coso */
    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="contained"
                endIcon={<GroupsIcon />}
                onClick={handleOpen}
            >
                Agregar Team
            </Button>
        </Stack>
    );
}
