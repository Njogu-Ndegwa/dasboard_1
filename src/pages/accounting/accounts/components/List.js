import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../../../../components/Page/Page';

class CreateAccount extends React.Component {
    render() {
        return (
            <Page inner>
                <p>List Account</p>
                <Link to="/accounts/add">Create</Link>
            </Page>
        );
    }
}

export default CreateAccount;