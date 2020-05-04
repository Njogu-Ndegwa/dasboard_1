import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import { Tabs, message, Input, Button, Table, Popconfirm, Menu, Dropdown, Form, PageHeader, Row, Col, Select, Card, DatePicker, Icon, Modal } from 'antd';
import Highlighter from "react-highlight-words";
import { serviceRequestsService } from '../../config/claims_management_service'
import moment from 'moment';
const { Search } = Input


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

class ServiceRequested extends React.Component {
    state = {
        searchText: "",
        isLoading: true,
        dataSource: [],
        insuranceId: [],
        drafted: [],
        sent: [],
        paid: [],
        payerSelected: undefined,
        label: 'Search By',
        searchBy: ''

    };

    componentDidMount() {


        // All
        this.serrviceRequestedService()


    }


    serrviceRequestedService = () => {
        serviceRequestsService.fetchServiceRequested().then(res => {
            console.log("server response", res)
            if (res.data) {
                this.setState({ dataSource: res.data.content, isLoading: false })
                message.success('Service Requested Fetched successfully')
            }
        }).catch(error => {
            console.log(error)
        })
    }







    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters
        }) => (
                <div style={{ padding: 8 }}>
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
                        style={{ width: 188, marginBottom: 8, display: "block" }}
                    />
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm)}
                        icon="search"
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
            </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
            </Button>
                </div>
            ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
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
                highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        )
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: "" });
    };

    // select the row
    onClickRow = record => {
        return {
            onClick: () => { }
        };
    };
    setRowClassName = record => {
        return "clickRowStyl";
    };

    handleMenuClick = (row, e) => {
        if (e.key === "edit") {
            this.props.history.push({
                pathname: "/invoice/add",
                state: {
                    servicePoint: row
                }
            });
        }
    };

    handleSearch = searchText => {
        const { dataSource, searchBy } = this.state
        console.log('datasource', dataSource)
        const filteredEvents = dataSource.filter(({ member_name, request_number, service_name, service_pro_user_name, sp_vehicle }) => {
            // console.log('title', member_name)
            // console.log('request_nymber', request_number)
            // console.log('vehicle_reg_no', vehicle_reg_no );
            if (searchBy === 'number') {
                request_number = request_number.toString();
                return request_number.includes(searchText);
            }

            else if (searchBy === 'name') {
                member_name = member_name.toLowerCase();
                return member_name.includes(searchText);
            }

            else if (searchBy === 'serviceName') {
                service_name = service_name.toLowerCase();
                console.log('202', service_name)
                return service_name.includes(searchText);
            }

            else if (searchBy === 'username') {
                service_pro_user_name = service_pro_user_name.toLowerCase();
                console.log('202', service_pro_user_name)
                return service_pro_user_name.includes(searchText);
            }

            else if (searchBy === 'spVehicle') {
                sp_vehicle = sp_vehicle.toLowerCase();
                console.log('202', sp_vehicle)
                return sp_vehicle.includes(searchText);
            }

            // vehicle_reg_no = vehicle_reg_no.toString();
            // return member_name.includes(searchText);
        });
        console.log('filtered events', filteredEvents)

        this.setState({
            dataSource: filteredEvents
        });
        console.log('events data', filteredEvents)
    };


    handleSearchBy = (row) => {
        console.log('row', row)
        const { searchBy } = this.state
        if (row.key === "number") {
            this.setState({ searchBy: 'number' })
            this.setState({ label: 'Request Number' })

        }

        else if (row.key === 'name') {
            this.setState({ searchBy: 'name' })
            this.setState({ label: 'Member Name' })

        }

        else if (row.key === 'serviceName') {
            this.setState({ searchBy: 'serviceName' })
            this.setState({ label: 'Service Name' })
        }

        else if (row.key === 'username') {
            this.setState({ searchBy: 'username' })
            this.setState({ label: 'Sp Username' })
        }

        else if (row.key === 'spVehicle') {
            this.setState({ searchBy: 'spVehicle' })
            this.setState({ label: 'Sp Vehicle' })
        }

    }

    handleRefresh = () => {
        this.serrviceRequestedService()
    }



    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        })
    }

    showModal = () => {
        this.setState({ visible: true })
    }


    handleDate = () => {
        this.props.form.validateFields((err, values) => {
            console.log('values', values)
            if (!err) {

                serviceRequestsService.fetchServiceRequested({ fromDate: values.date_from, toDate: values.date_to }).then(res => {
                    console.log("server response", res)
                    if (res.data) {
                        this.setState({ dataSource: res.data, isLoading: false })
                        message.success('Requests fetched successfully')
                    } else {
                        message.error('Theres a problem fetching Member request. Try refreshing the page')
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        })

    }

    refreshTable = (params) => {
        serviceRequestsService.fetchServiceRequested(params).then(res => {
            console.log('drafted response', res)
            if (res.data) {
                this.setState({ dataSource: res.data.content })
            }
        });
    }

    updateTableSource = (tabClicked) => {

        if (tabClicked === 'All') {
            this.refreshTable({});
        }


        else if (tabClicked === 'Pending') {

            this.refreshTable({ requestStatus: 'Pending' });
        }

        else if (tabClicked === 'Accepted') {

            this.refreshTable({ requestStatus: 'Accepted' });


        } else if (tabClicked === 'Declined') {

            this.refreshTable({ requestStatus: 'Declined' });

        }

        else if (tabClicked === 'Completed') {

            this.refreshTable({ requestStatus: 'Completed' });

        } else if (tabClicked === 'InProgress') {

            this.refreshTable({ requestStatus: 'InProgress' });

        } else if (tabClicked === 'AcceptedAddedService') {

            this.refreshTable({ requestStatus: 'AcceptedAddedService' });

        }

        else if (tabClicked === 'NoReply') {

            this.refreshTable({ requestStatus: 'NoReply' });

        }

        else if (tabClicked === 'PendingPayment') {

            this.refreshTable({ requestStatus: 'PendingPayment' });

        }

        else if (tabClicked === 'Paused') {

            this.refreshTable({ requestStatus: 'Paused' });

        }

        else if (tabClicked === 'Cancelled') {

            this.refreshTable({ requestStatus: 'Cancelled' });

        }
    }

    render() {

        const columns = [

            {
                title: 'Request Number',
                dataIndex: 'request_number',
                key: 'request_number',

            },

            {
                title: 'Service Name',
                dataIndex: 'service_name',
                key: 'service_name',

            },

            {
                title: 'Member Name',
                dataIndex: 'member_name',
                key: 'member_name',

            },

            {
                title: 'Sp Username',
                dataIndex: 'service_pro_user_name',
                key: 'service_pro_user_name',

            },


            {
                title: 'Sp Vehicle',
                dataIndex: 'sp_vehicle',
                key: 'sp_vehicle',

            },


            {
                title: 'Status: ',
                dataIndex: 'request_status',
                key: 'request_status',

            },



            {
                title: 'Amount',
                dataIndex: 'estimated_total_cost',
                key: 'estimated_total_cost',

            }
        ]



        const { insuranceId, dataSource, drafted, payerSelected, label, isLoading } = this.state;
        const { getFieldDecorator } = this.props.form
        const invoiceTable = (
            <>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    size="small"
                    rowKey={record => record.member_type_name}
                    loading={isLoading}
                    pagination={{ pageSizeOptions: ['20', '30'], showSizeChanger: true }}
                />

                <Modal
                    title="Filter Request"
                    visible={this.state.visible}
                    onOk={this.handleDate}
                    onCancel={this.handleCancel}
                    style={{ width: 350 }}
                >
                    <Card title="Filter by Date" size='small' type='inner' >
                        <Form.Item label="Date From"
                        >
                            {getFieldDecorator('date_from', {
                                rules: [{
                                    required: false,
                                    message: 'Please input Date From'
                                }],
                            })(
                                <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
                                    format={"YYYY/MM/DD"} />,
                            )}
                        </Form.Item>

                        <Form.Item label="Date to"
                        >
                            {getFieldDecorator('date_to', {
                                rules: [{
                                    required: false,
                                    message: 'Please input Date to'
                                }],
                            })(
                                <DatePicker defaultValue={moment('2015/01/01', "YYYY/MM/DD")}
                                    format={"YYYY/MM/DD"} />,
                            )}
                        </Form.Item>
                    </Card>
                </Modal>
            </>
        )


        console.log('drafted', drafted);

        return (
            <div>
                <Tabs onChange={this.updateTableSource} type="card">
                    <TabPane tab="All" key="All" >
                        <Card>
                            <PageHeader
                                title=" All Requested Services"
                                style={{ marginTop: 2, marginBottom: 2 }}

                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Button onClick={this.showModal} style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="danger">
                                        Filter by Date <Icon />
                                    </Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="number"  >
                                                    Request Number
                                                    </Menu.Item>
                                                <Menu.Item key="name" >
                                                    Member Name
                                                    </Menu.Item>

                                                <Menu.Item key="serviceName" >
                                                    Service Name
                                                    </Menu.Item>

                                                <Menu.Item key="username" >
                                                    Sp User Name
                                                    </Menu.Item>

                                                <Menu.Item key="spVehicle" >
                                                    Sp Vehicle
                                                    </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="primary">
                                            {this.state.label} <Icon type="search" />
                                        </Button>
                                    </Dropdown>,
                                    <Search
                                        placeholder="input search text"
                                        onSearch={searchText => this.handleSearch(searchText)}
                                        style={{ width: 300 }}
                                        enterButton
                                    />
                                ]}



                            />

                            {invoiceTable}
                        </Card>
                    </TabPane>
                    <TabPane tab="Pending" key="Pending" >
                        <Card>
                            <PageHeader
                                title="Pending Service Requested"

                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Button onClick={this.showModal} style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="danger">
                                        Filter by Date <Icon />
                                    </Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="number"  >
                                                    Request Number
                                        </Menu.Item>
                                                <Menu.Item key="name" >
                                                    Member Name
                                        </Menu.Item>

                                                <Menu.Item key="serviceName" >
                                                    Service Name
                                        </Menu.Item>

                                                <Menu.Item key="username" >
                                                    Sp User Name
                                        </Menu.Item>

                                                <Menu.Item key="spVehicle" >
                                                    Sp Vehicle
                                        </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="primary">
                                            {this.state.label} <Icon type="search" />
                                        </Button>
                                    </Dropdown>,
                                    <Search
                                        placeholder="input search text"
                                        onSearch={searchText => this.handleSearch(searchText)}
                                        style={{ width: 300 }}
                                        enterButton
                                    />
                                ]}

                            />

                            {invoiceTable}
                        </Card>
                    </TabPane>

                    <TabPane tab="Accepted" key="Accepted">
                        <Card>
                            <PageHeader
                                title=" Accepted Services Requested"

                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Button onClick={this.showModal} style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="danger">
                                        Filter by Date <Icon />
                                    </Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="number"  >
                                                    Request Number
                                                        </Menu.Item>
                                                <Menu.Item key="name" >
                                                    Member Name
                                                        </Menu.Item>

                                                <Menu.Item key="serviceName" >
                                                    Service Name
                                                        </Menu.Item>

                                                <Menu.Item key="username" >
                                                    Sp User Name
                                                        </Menu.Item>

                                                <Menu.Item key="spVehicle" >
                                                    Sp Vehicle
                                                        </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="primary">
                                            {this.state.label} <Icon type="search" />
                                        </Button>
                                    </Dropdown>,
                                    <Search
                                        placeholder="input search text"
                                        onSearch={searchText => this.handleSearch(searchText)}
                                        style={{ width: 300 }}
                                        enterButton
                                    />
                                ]}

                            />

                            {invoiceTable}
                        </Card>
                    </TabPane>

                    <TabPane tab="Declined" key="Declined">
                        <Card>
                            <PageHeader
                                title=" Declined Services Requested"

                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Button onClick={this.showModal} style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="danger">
                                        Filter by Date <Icon />
                                    </Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="number"  >
                                                    Request Number
                                                        </Menu.Item>
                                                <Menu.Item key="name" >
                                                    Member Name
                                                        </Menu.Item>

                                                <Menu.Item key="serviceName" >
                                                    Service Name
                                                        </Menu.Item>

                                                <Menu.Item key="username" >
                                                    Sp User Name
                                                        </Menu.Item>

                                                <Menu.Item key="spVehicle" >
                                                    Sp Vehicle
                                                        </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="primary">
                                            {this.state.label} <Icon type="search" />
                                        </Button>
                                    </Dropdown>,
                                    <Search
                                        placeholder="input search text"
                                        onSearch={searchText => this.handleSearch(searchText)}
                                        style={{ width: 300 }}
                                        enterButton
                                    />
                                ]}
                            />

                            {invoiceTable}
                        </Card>
                    </TabPane>

                    <TabPane tab="Completed" key="Completed">
                        <Card>
                            <PageHeader
                                title=" Completed Services Requested"
                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Button onClick={this.showModal} style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="danger">
                                        Filter by Date <Icon />
                                    </Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="number"  >
                                                    Request Number
                                                        </Menu.Item>
                                                <Menu.Item key="name" >
                                                    Member Name
                                                        </Menu.Item>

                                                <Menu.Item key="serviceName" >
                                                    Service Name
                                                        </Menu.Item>

                                                <Menu.Item key="username" >
                                                    Sp User Name
                                                        </Menu.Item>

                                                <Menu.Item key="spVehicle" >
                                                    Sp Vehicle
                                                        </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="primary">
                                            {this.state.label} <Icon type="search" />
                                        </Button>
                                    </Dropdown>,
                                    <Search
                                        placeholder="input search text"
                                        onSearch={searchText => this.handleSearch(searchText)}
                                        style={{ width: 300 }}
                                        enterButton
                                    />
                                ]}
                            />

                            {invoiceTable}
                        </Card>
                    </TabPane>

                    <TabPane tab="InProgress" key="InProgress">
                        <Card>
                            <PageHeader
                                title=" InProgress Services Requested"
                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Button onClick={this.showModal} style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="danger">
                                        Filter by Date <Icon />
                                    </Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="number"  >
                                                    Request Number
                                                    </Menu.Item>
                                                <Menu.Item key="name" >
                                                    Member Name
                                                    </Menu.Item>

                                                <Menu.Item key="serviceName" >
                                                    Service Name
                                                    </Menu.Item>

                                                <Menu.Item key="username" >
                                                    Sp User Name
                                                    </Menu.Item>

                                                <Menu.Item key="spVehicle" >
                                                    Sp Vehicle
                                                    </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="primary">
                                            {this.state.label} <Icon type="search" />
                                        </Button>
                                    </Dropdown>,
                                    <Search
                                        placeholder="input search text"
                                        onSearch={searchText => this.handleSearch(searchText)}
                                        style={{ width: 300 }}
                                        enterButton
                                    />
                                ]}
                            />

                            {invoiceTable}
                        </Card>
                    </TabPane>

                    <TabPane tab="AcceptedAddedService" key="AcceptedAddedService">
                        <Card>
                            <PageHeader
                                title=" AcceptedAddedService  Requested"
                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Button onClick={this.showModal} style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="danger">
                                        Filter by Date <Icon />
                                    </Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="number"  >
                                                    Request Number
                                                        </Menu.Item>
                                                <Menu.Item key="name" >
                                                    Member Name
                                                        </Menu.Item>

                                                <Menu.Item key="serviceName" >
                                                    Service Name
                                                        </Menu.Item>

                                                <Menu.Item key="username" >
                                                    Sp User Name
                                                        </Menu.Item>

                                                <Menu.Item key="spVehicle" >
                                                    Sp Vehicle
                                                        </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="primary">
                                            {this.state.label} <Icon type="search" />
                                        </Button>
                                    </Dropdown>,
                                    <Search
                                        placeholder="input search text"
                                        onSearch={searchText => this.handleSearch(searchText)}
                                        style={{ width: 300 }}
                                        enterButton
                                    />
                                ]}
                            />

                            {invoiceTable}
                        </Card>
                    </TabPane>

                    <TabPane tab="NoReply" key="NoReply">
                        <Card>
                            <PageHeader
                                title=" NoReply to Services Requested"
                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Button onClick={this.showModal} style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="danger">
                                        Filter by Date <Icon />
                                    </Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="number"  >
                                                    Request Number
                                                    </Menu.Item>
                                                <Menu.Item key="name" >
                                                    Member Name
                                                    </Menu.Item>

                                                <Menu.Item key="serviceName" >
                                                    Service Name
                                                    </Menu.Item>

                                                <Menu.Item key="username" >
                                                    Sp User Name
                                                    </Menu.Item>

                                                <Menu.Item key="spVehicle" >
                                                    Sp Vehicle
                                                    </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="primary">
                                            {this.state.label} <Icon type="search" />
                                        </Button>
                                    </Dropdown>,
                                    <Search
                                        placeholder="input search text"
                                        onSearch={searchText => this.handleSearch(searchText)}
                                        style={{ width: 300 }}
                                        enterButton
                                    />
                                ]}
                            />

                            {invoiceTable}
                        </Card>
                    </TabPane>

                    <TabPane tab="PendingPayment" key="PendingPayment">
                        <Card>
                            <PageHeader
                                title=" PendingPayment for Services Requested"
                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Button onClick={this.showModal} style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="danger">
                                        Filter by Date <Icon />
                                    </Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="number"  >
                                                    Request Number
                                                    </Menu.Item>
                                                <Menu.Item key="name" >
                                                    Member Name
                                                    </Menu.Item>

                                                <Menu.Item key="serviceName" >
                                                    Service Name
                                                    </Menu.Item>

                                                <Menu.Item key="username" >
                                                    Sp User Name
                                                    </Menu.Item>

                                                <Menu.Item key="spVehicle" >
                                                    Sp Vehicle
                                                    </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="primary">
                                            {this.state.label} <Icon type="search" />
                                        </Button>
                                    </Dropdown>,
                                    <Search
                                        placeholder="input search text"
                                        onSearch={searchText => this.handleSearch(searchText)}
                                        style={{ width: 300 }}
                                        enterButton
                                    />
                                ]}
                            />

                            {invoiceTable}
                        </Card>
                    </TabPane>

                    <TabPane tab="Paused" key="Paused">
                        <Card>
                            <PageHeader
                                title=" Paused Services Requested"
                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Button onClick={this.showModal} style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="danger">
                                        Filter by Date <Icon />
                                    </Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="number"  >
                                                    Request Number
                                                        </Menu.Item>
                                                <Menu.Item key="name" >
                                                    Member Name
                                                        </Menu.Item>

                                                <Menu.Item key="serviceName" >
                                                    Service Name
                                                        </Menu.Item>

                                                <Menu.Item key="username" >
                                                    Sp User Name
                                                        </Menu.Item>

                                                <Menu.Item key="spVehicle" >
                                                    Sp Vehicle
                                                        </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="primary">
                                            {this.state.label} <Icon type="search" />
                                        </Button>
                                    </Dropdown>,
                                    <Search
                                        placeholder="input search text"
                                        onSearch={searchText => this.handleSearch(searchText)}
                                        style={{ width: 300 }}
                                        enterButton
                                    />
                                ]}
                            />

                            {invoiceTable}
                        </Card>
                    </TabPane>

                    <TabPane tab="Cancelled" key="Cancelled">
                        <Card>
                            <PageHeader
                                title=" Cancelled Services Requested"
                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Button onClick={this.showModal} style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="danger">
                                        Filter by Date <Icon />
                                    </Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="number"  >
                                                    Request Number
                                                        </Menu.Item>
                                                <Menu.Item key="name" >
                                                    Member Name
                                                        </Menu.Item>

                                                <Menu.Item key="serviceName" >
                                                    Service Name
                                                        </Menu.Item>

                                                <Menu.Item key="username" >
                                                    Sp User Name
                                                        </Menu.Item>

                                                <Menu.Item key="spVehicle" >
                                                    Sp Vehicle
                                                        </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button style={{ marginBottom: 10, marginRight: 10 }} size="medium" type="primary">
                                            {this.state.label} <Icon type="search" />
                                        </Button>
                                    </Dropdown>,
                                    <Search
                                        placeholder="input search text"
                                        onSearch={searchText => this.handleSearch(searchText)}
                                        style={{ width: 300 }}
                                        enterButton
                                    />
                                ]}
                            />

                            {invoiceTable}
                        </Card>
                    </TabPane>
                </Tabs>

            </div>

        )

    }


}

const WrappedServiceRequested = Form.create()(ServiceRequested)

export default WrappedServiceRequested
