import {Link as InertiaLink} from '@inertiajs/react'
import React from "react";

const Link = ({href, label, variant, icon}) => {
    if (icon) return <InertiaLink href={href}>{icon}</InertiaLink>

    return <InertiaLink href={href}>
        <button className={`btn btn-${variant ?? 'primary'} mb-0`}>{label}</button>
    </InertiaLink>
}

export default Link
