import React from 'react'
import { Button } from 'antd';
import Page from '../../../components/Page/Page'

class RegisterPatient extends React.Component {
    render() {
        return (
            <Page inner>
                <p>New Patient</p>
                <br />
                <Button onClick={() => { this.props.history.push("/") }}>Back to Home</Button>

            </Page>
        );
    }
}

export default RegisterPatient;