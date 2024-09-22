import React from 'react';

export default function CardBody(props) {
    const { displayNone, children } = props;

    return (
        <div
            style={{
                paddingTop: 20,
                paddingInline: 20,
                paddingBottom: 10,
                display: displayNone ? 'none' : 'block',
            }}
            {...props}
        >
            {children}
        </div>
    );
}
