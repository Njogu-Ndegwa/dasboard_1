
import React from 'react';
import ReactDOM from 'react-dom';
import { Steps, Button, message, Row, Col } from 'antd';
import { Card } from 'antd';
import PatientAction from "./PatientAction";
import PersonContact from "./PersonContact";
import PersonAddress from "./PersonAddress";
import PatientIdentifier from "./PatientIdentifier";



const { Step } = Steps;

const steps = [
    {
        title: 'Basic Info',
        content: 'BasicInfo',
    },
    {
        title: 'Contact Info',
        content: 'ContactInfo',
    },
    {
        title: 'Identity Info',
        content: 'IdentityInfo',
    },
    {
        title: 'Health Info',
        content: 'HealthInfo',
    },
];

export default class CreatePatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            identifiers: [{ id_type: "", identification_value: "" }],
            contact: [{ email: "", telephone: "", mobile: "" }],
            address: [
                {
                    line1: "",
                    line2: "",
                    town: "",
                    county: "",
                    postal_code: "",
                    country: ""
                }
            ]
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
        this.setState((prevState) => {
            return { state: prevState }
        })
    }

    handleChange = e => {
        if (
            ["id_type", "identification_value"].includes(
                e.target.getAttribute("fieldname")
            )
        ) {
            let identifiers = [...this.state.identifiers];
            identifiers[e.target.dataset.id][e.target.getAttribute("fieldname")] =
                e.target.value; //.toUpperCase();
            this.setState({ identifiers }, () => console.log(this.state.identifiers));
        }
        if (
            ["email", "telephone", "mobile"].includes(
                e.target.getAttribute("fieldname")
            )
        ) {
            let contact = [...this.state.contact];
            contact[e.target.dataset.id][e.target.getAttribute("fieldname")] =
                e.target.value; //.toUpperCase();
            this.setState({ contact }, () => console.log(this.state.contact));
        }
        if (
            ["line1", "line2", "town", "county", "postal_code", "country"].includes(
                e.target.getAttribute("fieldname")
            )
        ) {
            let address = [...this.state.address];
            address[e.target.dataset.id][e.target.getAttribute("fieldname")] =
                e.target.value; //.toUpperCase();
            this.setState({ address }, () => console.log(this.state.address));
        } else {
            this.setState({ [e.target.name]: e.target.value /*.toUpperCase() */ });
        }
    };
    //addUser={this.addUser.bind(this)}
    onWizardComplete(data) {
        console.log(this.state);
        PatientAction.createPatient(this.state)
            .then(response => {
                console.log("Create patient response", response);
                if (response.status == 201) {
                    message.info("Patient details succesfully submitted");
                } else {
                    message.error("An error occurred while submitting patient details");
                }
            })
            .catch(error => {
                console.log(error)
                message.error("Error parsing create patient response");
            });
    }
    addClick = e => {
        this.setState(prevState => ({
            identifiers: [
                ...prevState.identifiers,
                { id_type: "", identification_value: "" }
            ]
        }));
    };
    addContactComponent = e => {
        this.setState(prevState => ({
            contact: [...prevState.contact, { email: "", telephone: "", mobile: "" }]
        }));
    };
    addAddressComponent = e => {
        this.setState(prevState => ({
            address: [
                ...prevState.address,
                {
                    line1: "",
                    line2: "",
                    town: "",
                    county: "",
                    postal_code: "",
                    country: ""
                }
            ]
        }));
    };

    handleRemoveIdentificationRow = idx => () => {
        const identifiers = [...this.state.identifiers];
        identifiers.splice(idx, 1);
        this.setState({ identifiers });
    };
    handleRemoveContactRow = idx => () => {
        const contact = [...this.state.contact];
        contact.splice(idx, 1);
        this.setState({ contact });
    };
    handleRemoveAddressRow = idx => () => {
        const address = [...this.state.address];
        address.splice(idx, 1);
        this.setState({ address });
    };
    render() {
        let { address, contact, identifiers, current } = this.state;

        return (
            <div id="content">
                <Card>
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div className="steps-content">

                        {(() => {
                            if (steps[current].content === "BasicInfo") {
                                return (
                                    <div>



                                    </div>
                                )
                            } else if (steps[current].content === "ContactInfo") {
                                return (
                                    <div>
                                        <Row>
                                            <Col span={24}>
                                                <br />
                                                <h6>
                                                    <strong>Contact Details</strong>
                                                </h6>
                                                <PersonContact
                                                    onContactRemove={
                                                        this.handleRemoveContactRow
                                                    }
                                                    contact={contact}
                                                />
                                            </Col>
                                            <Col span={24} offset={20}>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    type="button"
                                                    onClick={this.addContactComponent.bind(
                                                        this
                                                    )}
                                                >
                                                    Add Contact
                                  </button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <h6>
                                                    <strong>Address Details</strong>
                                                </h6>
                                                <PersonAddress
                                                    onAddressRemove={
                                                        this.handleRemoveAddressRow
                                                    }
                                                    address={address}
                                                />
                                            </Col>
                                            <Col span={24} offset={20}>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    type="button"
                                                    onClick={this.addAddressComponent.bind(
                                                        this
                                                    )}
                                                >
                                                    Add Address
                                  </button>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            } else if (steps[current].content === "IdentityInfo") {
                                return (
                                    <div>

                                        <Row>
                                            <Col span={24}>
                                                <h6>
                                                    <strong>Address Details</strong>
                                                </h6>
                                                <PatientIdentifier
                                                    onDeletePatientIdentifier={
                                                        this.handleRemoveIdentificationRow
                                                    }
                                                    identifiers={identifiers}
                                                />
                                            </Col>
                                            <Col span={24} offset={20}>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    type="button"
                                                    onClick={this.addClick.bind(this)}
                                                >
                                                    Add Identifier
                                  </button>
                                            </Col>
                                        </Row>


                                    </div>
                                )
                            } else if (steps[current].content === "HealthInfo") {
                                return (
                                    <div>HealthInfo</div>
                                )
                            } else {
                                return (
                                    <div>catch all</div>
                                )
                            }
                        })()}


                    </div>
                    <div className="steps-action">
                        {current > 0 && (
                            <Button onClick={() => this.prev()}>
                                Previous
            </Button>
                        )}
                        {current < steps.length - 1 && (
                            <Button style={{ float: "right" }} type="primary" onClick={() => this.next()}>
                                Next
            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button style={{ marginLeft: 8 }} type="primary" onClick={() => message.success('Processing complete!')}>
                                Done
            </Button>
                        )}

                    </div>
                </Card>
            </div>
        );
    }
}          