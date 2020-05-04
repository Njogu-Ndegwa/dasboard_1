import React from 'react';
import { Trans, } from '@lingui/macro';
import Page from '../../components/Page/Page'

class Dashboard extends React.Component {

    render() {
        return (
            <Page inner>
                This should display Dashboard
            <br />
                <Trans>Dashboard</Trans>
                Map Routing for this particular functions here
        </Page>
        );
    }
}

export default Dashboard;