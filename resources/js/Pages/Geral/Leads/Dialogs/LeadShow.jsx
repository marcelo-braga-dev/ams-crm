import * as React from 'react';

import { LeadProvider } from './LeadContext.jsx';
import LeadDialog from './LeadDialog.jsx';

const LeadShow = ({ leadId, iconButton, action }) => {

    return (
        <LeadProvider>
            <LeadDialog iconButton={iconButton} action={action} leadId={leadId}/>
        </LeadProvider>
    );
};

export default LeadShow;
