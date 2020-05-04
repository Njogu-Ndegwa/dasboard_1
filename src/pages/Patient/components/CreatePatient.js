import React from "react";

import $ from "jquery";

import JarvisWidget from "../../../common/widgets/components/JarvisWidget";
import UiValidate from "../../../common/forms/validation/UiValidate";
import Wizard from "../../../common/forms/wizards/Wizard";

import {WidgetGrid} from "../../../common";
import PatientIdentifier from "./PatientIdentifier";
import PersonContact from "./PersonContact";
import PatientAction from "./PatientAction";
import PersonAddress from "./PersonAddress";
import {withRouter} from "react-router";
import {message, notification, Card, Row, Modal} from "antd";
import IdTypeAction from "../../organization/components/PatientIdentification/IdTypeActions";

const {confirm} = Modal;

const validateOptions = {
    highlight: function (element) {
        $(element)
            .closest(".form-group")
            .removeClass("has-success")
            .addClass("has-error");
    },
    unhighlight: function (element) {
        $(element)
            .closest(".form-group")
            .removeClass("has-error")
            .addClass("has-success");
    },
    errorElement: "span",
    errorClass: "help-block"
};
export default class CreatePatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifiers: [{id_type: "", identification_value: ""}],
            contact: [{email: "", telephone: "", mobile: ""}],
            address: [
                {
                    line1: "",
                    line2: "",
                    town: "",
                    county: "",
                    postal_code: "",
                    country: ""
                }
            ],
            identificationType: []
        };
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
            this.setState({identifiers}, () => console.log(this.state.identifiers));
        }
        if (
            ["email", "telephone", "mobile"].includes(
                e.target.getAttribute("fieldname")
            )
        ) {
            let contact = [...this.state.contact];
            contact[e.target.dataset.id][e.target.getAttribute("fieldname")] =
                e.target.value; //.toUpperCase();
            this.setState({contact}, () => console.log(this.state.contact));
        }
        if (
            ["line1", "line2", "town", "county", "postal_code", "country"].includes(
                e.target.getAttribute("fieldname")
            )
        ) {
            let address = [...this.state.address];
            address[e.target.dataset.id][e.target.getAttribute("fieldname")] =
                e.target.value; //.toUpperCase();
            this.setState({address}, () => console.log(this.state.address));
        } else {
            this.setState({[e.target.name]: e.target.value /*.toUpperCase() */});
        }
    };

    //addUser={this.addUser.bind(this)}
    onWizardComplete(data) {
        console.log(this.state);
        PatientAction.createPatient(this.state)
            .then(response => {
                console.log("Create patient response", response);
                if (response.status == 201) {
                    //message.info("Patient details succesfully submitted");
                    this.showConfirm(response);
                } else {
                    message.error("An error occurred while submitting patient details");
                }
            })
            .catch(error => {
                message.error("Error parsing create patient response");
            });
    }


    showConfirm = (response) => {
        Modal.success({
            title: 'Success',
            content: 'Patient details successfully submitted \n Given No. &{response.data.patient_number}',
            onOk() {
                // return new Promise((resolve, reject) => {
                //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                // }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {
            },
        });
    }
    addClick = e => {
        this.setState(prevState => ({
            identifiers: [
                ...prevState.identifiers,
                {id_type: "", identification_value: ""}
            ]
        }));
    };
    addContactComponent = e => {
        this.setState(prevState => ({
            contact: [...prevState.contact, {email: "", telephone: "", mobile: ""}]
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
        this.setState({identifiers});
    };
    handleRemoveContactRow = idx => () => {
        const contact = [...this.state.contact];
        contact.splice(idx, 1);
        this.setState({contact});
    };
    handleRemoveAddressRow = idx => () => {
        const address = [...this.state.address];
        address.splice(idx, 1);
        this.setState({address});
    };

    componentDidMount() {
        IdTypeAction.fetchIdType().then(response => {
            if (response.error) {
                message.error(response.error);
            } else {
                this.setState({identificationType: response});
            }
        });
    }

    render() {
        let {address, contact, identifiers, identificationType} = this.state;
        return (
            <div id="content">
                <Card>
                    <WidgetGrid>
                        <div className="row">
                            <article className="col-sm-12 col-md-12 col-lg-12">
                                <JarvisWidget
                                    id="basic-wizard-widget"
                                    editbutton={false}
                                    deletebutton={false}
                                    color="light"
                                >
                                    <header>
                    <span className="widget-icon">
                      <i className="fa fa-check"/>
                    </span>

                                        <h2>Patient Registration</h2>
                                    </header>

                                    {/* widget div*/}
                                    <div>
                                        {/* widget content */}
                                        <div className="widget-body">
                                            <Row>
                                                <UiValidate options={validateOptions}>
                                                    <form
                                                        noValidate="novalidate"
                                                        onChange={this.handleChange}
                                                    >
                                                        <Wizard
                                                            className="col-sm-12"
                                                            onComplete={() => this.onWizardComplete()}
                                                        >
                                                            <div className="form-bootstrapWizard clearfix">
                                                                <ul className="bootstrapWizard">
                                                                    <li data-smart-wizard-tab="1">
                                    <span>
                                      <span className="step">1</span>
                                      <span className="title">
                                        Basic information
                                    </span>
                                    </span>
                                                                    </li>
                                                                    <li data-smart-wizard-tab="2">
                                    <span>
                                      <span className="step">2</span>
                                      <span className="title">
                                        Contact information
                                    </span>
                                    </span>
                                                                    </li>
                                                                    <li data-smart-wizard-tab="3">
                                    <span>
                                      <span className="step">3</span>
                                      <span className="title">
                                        Identity Information
                                    </span>
                                    </span>
                                                                    </li>
                                                                    <li data-smart-wizard-tab="4">
                                    <span>
                                      <span className="step">4</span>
                                      <span className="title">Confirmation</span>
                                    </span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="tab-content">
                                                                <div
                                                                    className="tab-pane"
                                                                    data-smart-wizard-pane="1"
                                                                >
                                                                    <br/>

                                                                    <h6>
                                                                        <strong>Step 1 </strong> - Basic Information
                                                                    </h6>

                                                                    <div className="row">
                                                                        <div className="col-sm-2">
                                                                            <label>Title</label>
                                                                            <div className="form-group">
                                                                                <select
                                                                                    className="form-control"
                                                                                    name="title"
                                                                                    data-smart-validate-input=""
                                                                                    data-required=""
                                                                                    data-message-required="Title is required"
                                                                                >
                                                                                    <option value="">Select</option>
                                                                                    <option value="Mr">Mr.</option>
                                                                                    <option value="Mrs">Mrs.</option>
                                                                                    <option value="Miss">Miss</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-3">
                                                                            <label>Surname</label>
                                                                            <div className="form-group">
                                                                                <input
                                                                                    className="form-control"
                                                                                    placeholder=""
                                                                                    type="text"
                                                                                    name="surname"
                                                                                    data-smart-validate-input=""
                                                                                    data-required=""
                                                                                    data-message-required="Surname is required"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-3">
                                                                            <label>Middle Name</label>
                                                                            <div className="form-group">
                                                                                <input
                                                                                    className="form-control"
                                                                                    placeholder=""
                                                                                    type="text"
                                                                                    name="middle_name"
                                                                                    data-smart-validate-input=""
                                                                                    data-required=""
                                                                                    data-message-required="Middle name field is required"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-4">
                                                                            <label>Other Names</label>
                                                                            <div className="form-group">
                                                                                <input
                                                                                    className="form-control"
                                                                                    placeholder=""
                                                                                    type="text"
                                                                                    name="given_name"
                                                                                    data-smart-validate-input=""
                                                                                    data-required=""
                                                                                    data-message-required="Other name field is required"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-sm-4">
                                                                            <label>Gender</label>
                                                                            <div className="form-group">
                                                                                <select
                                                                                    className="form-control"
                                                                                    name="patient_gender"
                                                                                    data-smart-validate-input=""
                                                                                    data-required=""
                                                                                    data-message-required="Gender field is required"
                                                                                >
                                                                                    <option value="">-Select-</option>
                                                                                    <option value="M">Male</option>
                                                                                    <option value="F">Female</option>
                                                                                    <option value="O">Other</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-4">
                                                                            <label>{["Marital Status"]}</label>
                                                                            <div className="form-group">
                                                                                <select
                                                                                    className="form-control"
                                                                                    name="marital_status"
                                                                                    data-smart-validate-input=""
                                                                                    data-required=""
                                                                                    data-message-required="Marital status is required"
                                                                                >
                                                                                    <option value="">-Select-</option>
                                                                                    <option value="MARRIED">Married
                                                                                    </option>
                                                                                    <option value="SINGLE">Single
                                                                                    </option>
                                                                                    <option value="WIDOWED">
                                                                                        Windowed
                                                                                    </option>
                                                                                    <option value="DIVORCED">
                                                                                        Divorced
                                                                                    </option>
                                                                                    <option value="COMPLICATED">
                                                                                        Complicated
                                                                                    </option>
                                                                                    <option value="OTHERS">Others
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-4">
                                                                            <label>Age</label>
                                                                            <div className="form-group">
                                                                                <input
                                                                                    className="form-control"
                                                                                    placeholder=""
                                                                                    type="number"
                                                                                    name="age"
                                                                                    data-smart-validate-input=""
                                                                                    data-required=""
                                                                                    data-message-required="Patient age is required"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-4">
                                                                            <label>{["Blood Type"]}</label>
                                                                            <div className="form-group">
                                                                                <select
                                                                                    className="form-control"
                                                                                    name="blood_type"
                                                                                    data-smart-validate-input=""
                                                                                    data-required=""
                                                                                    data-message-required="Blood type is required"
                                                                                >
                                                                                    <option value="UnKnown">UnKnown
                                                                                    </option>
                                                                                    <option value="A+">A+</option>
                                                                                    <option value="A-">A-</option>
                                                                                    <option value="B+">B+</option>
                                                                                    <option value="B-">B-</option>
                                                                                    <option value="O+">O+</option>
                                                                                    <option value="O-">O-</option>
                                                                                    <option value="AB+">AB+</option>
                                                                                    <option value="AB-">AB-</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="tab-pane"
                                                                    data-smart-wizard-pane="2"
                                                                >


                                                                    <Row>
                                                                        <br/>
                                                                        <h6>
                                                                            <strong>&nbsp; Contact Details</strong>
                                                                        </h6>
                                                                        <PersonContact
                                                                            onContactRemove={
                                                                                this.handleRemoveContactRow
                                                                            }
                                                                            contact={contact}
                                                                        />
                                                                        <br/>
                                                                        <button
                                                                            className="btn btn-primary btn-sm"
                                                                            type="button"
                                                                            onClick={this.addContactComponent.bind(
                                                                                this
                                                                            )}
                                                                        >
                                                                            New Contact
                                                                        </button>
                                                                    </Row>
                                                                    <Row>
                                                                        <h6>
                                                                            <strong>&nbsp; Address Details</strong>
                                                                        </h6>
                                                                        <PersonAddress
                                                                            onAddressRemove={
                                                                                this.handleRemoveAddressRow
                                                                            }
                                                                            address={address}
                                                                        />
                                                                        <br/>
                                                                    </Row>
                                                                    <div className="row">
                                                                        <button
                                                                            className="btn btn-primary  btn-sm"
                                                                            type="button"
                                                                            onClick={this.addAddressComponent.bind(
                                                                                this
                                                                            )}
                                                                        >
                                                                            New Address
                                                                        </button>
                                                                    </div>


                                                                </div>
                                                                <div
                                                                    className="tab-pane"
                                                                    data-smart-wizard-pane="3"
                                                                >
                                                                    <br/>

                                                                    <h6>
                                                                        <strong>Step 3</strong> - ID Information
                                                                    </h6>

                                                                    <Row>
                                                                        <PatientIdentifier
                                                                            onDeletePatientIdentifier={
                                                                                this.handleRemoveIdentificationRow
                                                                            }
                                                                            identifiers={identifiers}
                                                                            identificationType={identificationType}
                                                                        />
                                                                        <button
                                                                            className="btn btn-primary  btn-sm"
                                                                            type="button"
                                                                            onClick={this.addClick.bind(this)}
                                                                        >
                                                                            Add Id
                                                                        </button>
                                                                    </Row>
                                                                </div>
                                                                <div
                                                                    className="tab-pane"
                                                                    data-smart-wizard-pane="4"
                                                                >
                                                                    <br/>

                                                                    <h3>
                                                                        <strong>Step 4</strong> - Confirm Submit
                                                                    </h3>
                                                                    <br/>

                                                                    <h1 className="text-center text-success">
                                                                        <strong>
                                                                            <i className="fa fa-check fa-lg"/> Complete
                                                                        </strong>
                                                                    </h1>
                                                                    <h4 className="text-center">
                                                                        Click next to finish
                                                                    </h4>
                                                                    <br/>
                                                                    <br/>
                                                                </div>

                                                                <div className="form-actions">
                                                                    <Row>
                                                                        <div className="col-sm-12">
                                                                            <ul className="list-unstyled pager wizard no-margin">
                                                                                <li
                                                                                    className="previous"
                                                                                    data-smart-wizard-prev=""
                                                                                >
                                                                                    <button
                                                                                        className="btn btn-lg btn-default pull-left">
                                                                                        Previous
                                                                                    </button>
                                                                                </li>
                                                                                <li
                                                                                    className="next"
                                                                                    data-smart-wizard-next=""
                                                                                >
                                                                                    <button
                                                                                        className="btn btn-lg txt-color-darken pull-right">
                                                                                        Next
                                                                                    </button>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </Row>
                                                                </div>
                                                            </div>
                                                        </Wizard>
                                                    </form>
                                                </UiValidate>
                                            </Row>
                                        </div>
                                        {/* end widget content */}
                                    </div>
                                    {/* end widget div */}
                                </JarvisWidget>
                            </article>
                        </div>
                    </WidgetGrid>

                </Card>
            </div>
        );
    }
}
/*
const mapStateToProps = (state) => ({
  patientData: state.appointment.appointmentTypes
  //  postAppointmentTypes: userInfo => dispatch(postAppointmentTypes(userInfo))
});

export default connect(mapStateToProps)(CreatePatient);

*/
