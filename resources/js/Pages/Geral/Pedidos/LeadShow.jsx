import * as React from 'react';

import { LeadProvider } from './LeadContext.jsx';
import LeadDialog from './LeadDialog.jsx';

const LeadShow = ({ leadId, iconButton }) => {

    return (
        <LeadProvider leadId={leadId}>
            <LeadDialog iconButton={iconButton}/>
        </LeadProvider>
    );
};

export default LeadShow;
