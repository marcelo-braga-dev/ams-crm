import { Link as InertiaLink } from '@inertiajs/react'
import React from "react";

const Link = ({href, label, variant}) => {
    return <InertiaLink href={href}>
        <button className={`btn btn-${variant ?? 'primary'} mb-0`}>{label}</button>
    </InertiaLink>
}

export default Link
