import {Link as InertiaLink} from '@inertiajs/react'
import React from "react";

const Link = ({href, label, variant, icon, children}) => {
    if (label) return <InertiaLink href={href}>
        <button type="button" className={`btn btn-${variant ?? 'primary'} mb-0`}>{icon && <span className="me-2">{icon}</span>}{label}</button>
    </InertiaLink>

    if (icon) return <InertiaLink href={href}>{icon}</InertiaLink>

    return <InertiaLink href={href}>{children}</InertiaLink>
}

export default Link
