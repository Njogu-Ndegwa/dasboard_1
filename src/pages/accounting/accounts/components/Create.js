import React from 'react'
import Page from '../../../../components/Page/Page';
import { Button } from 'antd';

class CreateAccount extends React.Component {
    render() {
        return (
            <Page inner>
                <p>New Account</p>
                <br />
                <Button onClick={() => { this.props.history.push("/accounts") }}>Back to List</Button>

            </Page>
        );
    }
}

export default CreateAccount;