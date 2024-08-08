import Checkbox from "@mui/material/Checkbox";
import React from "react";

const CheckboxSelected = ({id, setSelected, checkeds}) => {
    const handleCheckboxChange = (id) => {
        setSelected((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter((selectedId) => selectedId !== id);
            } else {
                return [...prevSelectedIds, id];
            }
        });
    }

    return <Checkbox checked={checkeds.includes(id)} onChange={() => handleCheckboxChange(id)}/>
}
export default CheckboxSelected
