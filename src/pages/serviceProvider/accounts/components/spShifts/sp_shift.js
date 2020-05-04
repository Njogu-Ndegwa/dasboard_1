import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import { Tabs, message, Input, Button, Table, Popconfirm, Menu, Dropdown, Form, PageHeader, Row, Col, Select, Card, DatePicker, Icon, Modal } from 'antd';
import Highlighter from "react-highlight-words";
import {SpShiftWithSpecsService} from '../../../../../config/service_provider';
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
        this.spShiftWithSpecs()


    }


    spShiftWithSpecs = () => {
        SpShiftWithSpecsService.fetchSpShiftWithSpecs().then(res => {
            console.log("server response", res)
            if (res.data) {
                this.setState({ dataSource: res.data.content, isLoading: false })
                message.success('Sp Shift Fetched successfully')
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
        const filteredEvents = dataSource.filter(({ user_name, vehicle_reg_number }) => {
            // console.log('title', member_name)
            // console.log('request_nymber', request_number)
            // console.log('vehicle_reg_no', vehicle_reg_no );
            if (searchBy === 'username') {
                user_name = user_name.toString();
                return user_name.includes(searchText);
            }

            else if (searchBy === 'reg_no') {
               vehicle_reg_number =vehicle_reg_number.toLowerCase();
                return vehicle_reg_number.includes(searchText);
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
        if (row.key === "username") {
            this.setState({ searchBy: 'username' })
            this.setState({ label: 'Phone Number' })

        }

        else if (row.key === 'reg_no') {
            this.setState({ searchBy: 'reg_no' })
            this.setState({ label: 'Vehicle Registration No' })

        }

    }

    handleRefresh = () => {
        this.spShiftWithSpecs()
    }


   
    refreshTable = (params) => {
        SpShiftWithSpecsService.fetchSpShiftWithSpecs(params).then(res => {
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


        else if (tabClicked === 'Active') {

            this.refreshTable({ status: 'Active' });
        }

        else if (tabClicked === 'Inactive') {

            this.refreshTable({ status: 'Inactive' });


        } else if (tabClicked === 'Booked') {

            this.refreshTable({ status: 'Booked' });

        }

    }

    render() {

        const columns = [

            {
                title: 'UserName',
                dataIndex: 'user_name',
                key: 'user_name',

            },

            {
                title: 'Vehicle Reistration no',
                dataIndex: 'vehicle_reg_number',
                key: 'vehicle_reg_number',

            },

            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',

            },

            {
                title: 'Last Booked',
                dataIndex: 'time_last_booked',
                key: 'time_last_booked',

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

            </>
        )


        console.log('drafted', drafted);

        return (
            <div>
                <Tabs onChange={this.updateTableSource} type="card">
                    <TabPane tab="All" key="All" >
                        <Card>
                            <PageHeader
                                title=" All"
                                style={{ marginTop: 2, marginBottom: 2 }}

                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="username"  >
                                                    Phone Number
                                                    </Menu.Item>
                                                <Menu.Item key="reg_no" >
                                                    Vehicle Registration No
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
                    <TabPane tab="Active" key="Active" >
                        <Card>
                            <PageHeader
                                title="Active Sp Shifts"

                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="username"  >
                                                    Phone Number
                                                    </Menu.Item>
                                                <Menu.Item key="reg_no" >
                                                    Vehicle Registration No
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

                    <TabPane tab="Inactive" key="Inactive">
                        <Card>
                            <PageHeader
                                title=" InActive Sp Shifts"

                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="username"  >
                                                    Phone Number
                                                    </Menu.Item>
                                                <Menu.Item key="reg_no" >
                                                    Vehicle Registration No
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


                    <TabPane tab="Booked" key="Booked">
                        <Card>
                            <PageHeader
                                title=" Booked Sp Shifts"

                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button style={{ marginBottom: 10 }} onClick={this.handleRefresh} >Refresh</Button>,
                                    <Dropdown
                                        overlay={

                                            <Menu onClick={(row) => this.handleSearchBy(row)} >
                                                <Menu.Item key="username"  >
                                                    Phone Number
                                                    </Menu.Item>
                                                <Menu.Item key="reg_no" >
                                                    Vehicle Registration No
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
