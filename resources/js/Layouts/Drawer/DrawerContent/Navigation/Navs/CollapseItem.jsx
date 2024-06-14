import * as React from "react";

export default function CollapseItem({item}) {
    function pageCurrent(url) {
        return {color: 'black', fontWeight: 600};
    }

    return <div key={item.id}>
        <a href={'url' ?? undefined} key={item.id} className="text-sm text-muted">
            <div className="accordion-body p-0 ms-5 mb-2">
                <span className="nav-link-text"
                      style={'tag' === 'submenuSidebar' ? pageCurrent() : {}}>
                    {item.title}
                </span>
            </div>
        </a>
    </div>
}
