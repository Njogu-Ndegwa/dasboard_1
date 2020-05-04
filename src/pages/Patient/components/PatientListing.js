import React from "react";

import {BigBreadcrumbs, WidgetGrid, JarvisWidget} from "../../../common";

import PatientAction from "./PatientAction";
import CollectionCreateVisitForm from "../../Visit/Visit";
import VisitAction from "../../Visit/VisitAction";
import moment from 'moment';

import {
    Table,
    Badge,
    Menu,
    Dropdown,
    Button,
    Icon,
    message,
    Modal, Tag, Input
} from "antd";
import Popup from "./PatientPopup";
import Highlighter from "./PatientQueue";

export default class PatientListing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            patientList: [],
            popup: {
                visible: false,
                x: 0,
                y: 0
            },
            displayVisitModal: false,
            visitStartDate: "",
            selectedPatientNo: ""
        };
    }

    onRow = record => ({
        onContextMenu: event => {
            event.preventDefault();
            if (!this.state.visible) {
                const that = this;
                document.addEventListener(`click`, function onClickOutside() {
                    that.setState({popup: {visible: false}});
                    document.removeEventListener(`click`, onClickOutside);
                });
            }
            this.setState({
                popup: {
                    record,
                    visible: true,
                    x: event.pageX,
                    y: event.pageY
                }
            });
        }
    });

    componentDidMount() {
        PatientAction.fetchPatientsData().then(response => {
            if (response.error) {
                message.error(response.error);
            } else {
                this.setState({patientList: response});
            }
        });
    }

    handleMenuClick = (record, e) => {
        if (e.key === "1") {
            this.setState({
                displayVisitModal: true,
                selectedPatientNo: record.patient_number
            });
        }
    };

    closeVisitModal = () => {
        this.setState({displayVisitModal: false});
    };

    handleStartDate = (date) => {
        console.log(moment(date).format("YYYY-MM-DD hh:mm:ss"));
        this.setState({visitStartDate: moment(date).format("YYYY-MM-DD hh:mm:ss")});
    }

    handleCreateVisit = () => {
        console.log("Handling visit form ");
        const {form} = this.VisitFormRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.patient_number = this.state.selectedPatientNo;
            values.scheduled = true;
            values.start_datetime = this.state.visitStartDate;
            values.stop_datetime = "2019-09-06 05:11:08";
            console.log("Received values of visit form : ", values);
            VisitAction.createVisit(values);
            message.info("Visit was successfully created");
            form.resetFields();
            this.setState({displayVisitModal: false});

        });
    };

    saveVisitFormRef = VisitFormRef => {
        this.VisitFormRef = VisitFormRef;
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters
                         }) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: 188, marginBottom: 8, display: "block"}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{width: 90}}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? "#1890ff" : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        )
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ""});
    };

    // select the row
    onClickRow = (record, e) => {
        return {
            onClick: () => {
                this.props.history.push({
                    pathname: "/patientDashboard",
                    state: {
                        patient_data: record
                    }
                });
            }
        };
    };

    render() {
        // const menu =
        const columns = [
            {
                title: "Patient No. ",
                dataIndex: "patient_number",
                key: "patient_number",

            },
            {title: "Title", dataIndex: "title", key: "title"},
            {title: "Patient Name", dataIndex: "full_name", key: "full_name"},
            {title: "Dob", dataIndex: "date_of_birth", key: "date_of_birth"},
            {title: "Age", dataIndex: "age", key: "age"},
            {
                title: "Marital Status ",
                dataIndex: "marital_status",
                key: "marital_status"
            },
            {
                title: "Status", dataIndex: "status", key: "status",
                render: (text, record) => {
                    return (
                        record.status === 'Active' ?
                            <Tag color="green">Active</Tag>
                            :
                            <Tag color="red">In Active</Tag>
                    );
                }
            },
            {
                title: "",
                dataIndex: "",
                key: "delete",
                render: (text, record) => (
                    <Dropdown
                        overlay={
                            <Menu onClick={e => this.handleMenuClick(record, e)}>
                                <Menu.Item key="1">
                                    <Icon type="check"/>
                                    Activate Visit
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Icon type="calendar"/>
                                    Create Appointment
                                </Menu.Item>
                                <Menu.Divider/>

                                <Menu.Item key="3">
                                    <Icon type="user"/>
                                    Register Fingerprint
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Icon type="profile"/>
                                    Upload Image
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <Button size="small" color="blue">
                            Action <Icon type="down"/>
                        </Button>
                    </Dropdown>
                )
            }
        ];

        const alertOnDropDownClick = record => {
            alert(record);
        };

        const data = this.state.patientList;
        return (
            <div id="content">
                <CollectionCreateVisitForm
                    wrappedComponentRef={this.saveVisitFormRef}
                    visible={this.state.displayVisitModal}
                    onCancel={this.closeVisitModal}
                    onCreate={this.handleCreateVisit}
                    onStartDate={this.handleStartDate}
                />

                <WidgetGrid>
                    <div className="row">
                        <article className="col-sm-12">
                            <JarvisWidget id="wid-id-2" editbutton={false} color="blueDark">
                                <header>
                  <span className="widget-icon">
                    <i className="fa fa-table"/>
                  </span>
                                    <h2>Patients Master Register </h2>
                                </header>
                                <div>
                                    <div className="widget-body no-padding">
                                        <Table
                                            onRow={this.onClickRow}
                                            columns={columns}
                                            expandedRowRender={record => (
                                                <p key={record.id} style={{margin: 0}}>
                                                    {record.critical_information}
                                                </p>
                                            )}
                                            dataSource={data}
                                            size="small"
                                            bordered={false}
                                            rowKey={record => record.id}
                                            sorter={true}
                                        />
                                    </div>
                                </div>
                            </JarvisWidget>
                        </article>
                    </div>
                </WidgetGrid>
            </div>
        );
    }
}
