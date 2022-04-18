import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";

export default function CheckboxListSecondary() {
    const [checked, setChecked] = React.useState([0]);
    const handleToggle = (value) => () => {
        /* indexOf retorna -1 si es que no se encuentra en el arreglo, en caso contrario retorna el indice de donde se encuentra del arreglo */
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        /* si el id no se encontraba en el arreglo, entonces lo agrega */
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            /* si el elemento ya se encontraba en el arreglo entonces lo quita */
            newChecked.splice(currentIndex, 1);
        }
        /* finalmente actualiza el estado */
        setChecked(newChecked);
    };

    return (
        <List
            dense
            /* sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} */
            className="bg-[white] w-full max-w-[360px] lg:max-w-[100%] "
        >
            {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                    <ListItem
                        key={value}
                        secondaryAction={
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(value)}
                                checked={checked.indexOf(value) !== -1}
                                inputProps={{ "aria-labelledby": labelId }}
                            />
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${value + 1}`}
                                    src={`/static/images/avatar/${
                                        value + 1
                                    }.jpg`}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                id={labelId}
                                primary={`Line item ${value + 1}`}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
