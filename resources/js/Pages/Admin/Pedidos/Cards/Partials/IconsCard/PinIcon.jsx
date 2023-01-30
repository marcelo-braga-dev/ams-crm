import React from "react";

import EmailIcon from '@mui/icons-material/EmailSharp';
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import PushPinIcon from "@mui/icons-material/PushPin";
import {useForm} from "@inertiajs/react";

export default function PinIcon({dados}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // Toggle Icon Pin
    const {data} = useForm()
    const togglePin = (id) => {
    }
    // Toggle Icon Pin - fim

    return (
        <button onClick={() => togglePin(dados.id)}>
            {
                dados.pin ?
                    <PushPinIcon className="mx-1" color="error" variant="contained"/>
                    :
                    <PushPinIcon className="mx-1" color="disabled" variant="contained"/>
            }
        </button>
    )
}
