import React from "react";
import ReactDOM from 'react-dom';
import { Layout, Menu, Spin, Row, Col, Card } from 'antd';
import PatientCard from "../../../views/Patient/components/PatientCard";
import VisitsListing from "../../Visit/VisitsListing";
import PatientVitals from "../../../views/vitals/PatientVitals"
import CollectionCreateVisitForm from "../../Visit/Visit";


const { Header, Content, Footer, Sider } = Layout;

export default class PatientDashboard extends React.Component {

    state = {
        patient_data: [],
        collapsed: false,
        loading: false,
        activateVisit: true,
        activatePatientDetails: false,
        activateAllergies: false,
        activateVitals: false,
        displayVisitModal: false
    };

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                patient_data: this.props.location.state.patient_data,
            })
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    fnDisplayVisitModal = () => {
        this.setState({
            displayVisitModal: true
        });
    }

    handleLinkClick = (e) => {
        this.setState({ loading: true });
        if (e.key === "patient_details_link") {
            this.setState({
                activateVisit: false,
                activatePatientDetails: true,
                activateAllergies: false,
                activateVitals: false
            });
        }
        else if (e.key === "visit_details_link") {
            this.setState({
                activateVisit: true,
                activatePatientDetails: false,
                activateAllergies: false,
                activateVitals: false
            });
        }
        else if (e.key === "vitals_details_link") {
            this.setState({
                activateVisit: false,
                activatePatientDetails: false,
                activateAllergies: false,
                activateVitals: true
            });
        }

        else {
            this.setState({
                activateVisit: false,
                activatePatientDetails: false,
                activateAllergies: false,
                activateVitals: false
            });
        }
        this.setState({ loading: false });
    };

    closeVisitModal = () => {
        this.setState({ displayVisitModal: false });
    };

    saveVisitFormRef = VisitFormRef => {
        this.VisitFormRef = VisitFormRef;
    };

    render() {
        let { patient_data } = this.state;
        return (
            <Card bodyStyle={{ padding: '0' }}>
                <CollectionCreateVisitForm
                    wrappedComponentRef={this.saveVisitFormRef}
                    visible={this.state.displayVisitModal}
                    onCancel={this.closeVisitModal}
                    onStartDate={this.handleStartDate}
                    patient_data={patient_data}
                />
                <Row>
                    <PatientCard patient_data={patient_data} />
                </Row>
                <Row>
                    <Col span={3}>
                        <Sider>
                            <Menu theme="light" mode="inline" onClick={e => this.handleLinkClick(e)} defaultSelectedKeys={['2']}>
                                <Menu.Item key="patient_details_link">
                                    <span className="nav-text">Details</span>
                                </Menu.Item>
                                <Menu.Item key="visit_details_link">
                                    <span className="nav-text">Visits</span>
                                </Menu.Item>
                                <Menu.Item key="vitals_details_link">
                                    <span className="nav-text">Vitals</span>
                                </Menu.Item>
                                <Menu.Item key="allergies_details_link">
                                    <span className="nav-text">Allergies</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                    </Col>
                    <Col span={21}>
                        <Card bodyStyle={{ padding: '0' }}>
                            {this.state.activateVisit ? <VisitsListing onAddNewVisit={this.fnDisplayVisitModal} patient_data={patient_data} /> : null}
                            {this.state.activateVitals ? <PatientVitals patient_data={patient_data} /> : null}
                        </Card>
                    </Col>
                </Row>
            </Card>
        );
    }
}


