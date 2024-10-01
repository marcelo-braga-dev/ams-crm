import * as React from 'react';

import { LeadProvider } from './LeadContext.jsx';
import LeadDialog from './LeadDialog.jsx';

const LeadShow = ({ leadId, iconButton, action }) => {

    return (
        <LeadProvider leadId={leadId}>
            <LeadDialog iconButton={iconButton} action={action}/>
        </LeadProvider>
    );
};

export default LeadShow;
