/* import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function FormControlLabelPosition() {
    const initialState = {
        assigned: "",
    };

    const [checkbox, setCheckbox] = React.useState(initialState);
    const handleChange = (e) => {
        console.log(e.target);
        // setCheckbox({ ...checkbox, [e.target.name]: e.target.checkbox });
    };

    return (
        <FormControl>
            <FormLabel>Asignar tareas</FormLabel>
            <FormGroup column>
                <FormControlLabel
                    value="start"
                    control={<Checkbox onChange={(e) => handleChange(e)} />}
                    label="Start"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="start"
                    control={<Checkbox />}
                    label="Start"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="start"
                    control={<Checkbox />}
                    label="Start"
                    labelPlacement="start"
                />
            </FormGroup>
        </FormControl>
    );
}
 */
