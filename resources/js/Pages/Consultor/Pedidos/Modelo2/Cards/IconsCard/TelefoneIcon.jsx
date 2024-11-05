import Alert from "@mui/material/Alert";
import React from "react";
import CallIcon from "@mui/icons-material/CallSharp";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export default function TelefoneIcon({dados}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        dados.contato.telefone ?
            (<>
                <CallIcon className="mx-1 cursor-pointer" aria-describedby={id}
                          variant="contained" onClick={handleClick}/>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{p: 2}}>{dados.contato.telefone}</Typography>
                </Popover></>) :
            <CallIcon className="mx-1" color="disabled" variant="contained"/>
    )
}
