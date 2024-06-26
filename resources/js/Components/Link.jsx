import { Link as InertiaLink } from '@inertiajs/react'

const Link = ({href, children}) => {
    return <InertiaLink href={href}>{children}</InertiaLink>
}

export default Link
