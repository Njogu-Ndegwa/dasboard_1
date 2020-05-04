import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import { Tabs, message,  Input, Button, Table, Popconfirm, Menu, Dropdown, Form, PageHeader, Row, Col, Select, Card } from 'antd';
import { PrepareInvoiceService } from '../../../../../config/claims_management_service';
import Highlighter from "react-highlight-words";
import { InsuranceService } from '../../../../../config/_service';
import Icon from '@ant-design/icons'
import { FilterInvoiceService } from '../../../../../config/claims_management_service';


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

class Hello extends React.Component {
    state = {
        searchText: "",
        isLoading: true,
        dataSource: [],
        insuranceId: [],
        drafted: [],
        sent: [],
        paid: [],
        payerSelected: undefined,
        label: 'Select Payer'

    };

    componentDidMount() {


        // Insurance Id 

        InsuranceService.fetchInsurance().then(res => {
            console.log("server response", res)
            if (res.data) {
                this.setState({ insuranceId: res.data.content, isLoading: false })
                message.success('Invoices fetched succesfully')
            } else {
                message.error('There is a problem displaying Invoices. Try refreshing the page')
            }
        }).catch(error => {
            console.log(error)
        })

        // All
        PrepareInvoiceService.fetchPrepareInvoice().then(res => {
            console.log("server response", res)
            if (res.data) {
                this.setState({ dataSource: res.data.content })
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


    handleCancel = () => {
        message.error("The current object has not deleted")

    }

    handlePayer = (insurance, e) => {
        console.log('164')
        this.setState({ payerSelected: insurance });
        // this.setState({label: insurance.name})
        // FilterInvoiceService.fetchInvoice({payerId:insurance.payer_id}).then(res => {
        //     console.log('168')
        //     console.log(res, 'ressss' )
        //     if(res.data){
        //         this.setState({dataSource: res.data.content})
        //         console.log('dataSource', this.state.dataSource)
        //     }
        // }) 
        this.setState({label: insurance.name})
            
            
        }
    

    refreshTable = (params) => {
        FilterInvoiceService.fetchInvoice(params).then(res => {
            console.log('drafted response', res)
            if (res.data) {
                this.setState({ dataSource: res.data.content })
            }
        });
    }

    updateTableSource = (tabClicked) => {
        let payerId = this.state.payerSelected ? this.state.payerSelected.payer_id : undefined;
        console.log(payerId, 'Payer ID');
        if (tabClicked === 'All') {
            if (!payerId) {
                this.refreshTable({});
            } else {
                this.refreshTable({ payerId: payerId });
            }
        }
        else if (tabClicked === 'Draft') {
            if (!payerId) {
                this.refreshTable({ status: 'Draft' });
            } else {
                this.refreshTable({payerId: payerId, status:" Draft"})
            }
            
        }

        else if (tabClicked === 'Sent') {
            if (!payerId) {
                this.refreshTable({ status: 'Sent' });
            } else {
                this.refreshTable({payerId: payerId, status:" Sent"})
            }

           
        } else if (tabClicked === 'Pending') {
            if(!payerId) {
                this.refreshTable({ status: 'Pending' });
            } else {
                this.refreshTable({payerId: payerId, status: 'Pending'})
            }
        } 

        else if (tabClicked === 'Paid') {

            if (!payerId) {
                this.refreshTable({ status: 'Paid' });
            } else {
                this.refreshTable({payerId: payerId, status:" Paid"})
            }

        }
    }

    render() {

        const columns = [

            {
                title: 'Invoice Number',
                dataIndex: 'invoice_number',
                key: 'invoice_number',

            },

            {
                title: 'Payer Name',
                dataIndex: 'payer_name',
                key: 'payer_id',

            },

            {
                title: 'Payee Name',
                dataIndex: 'payee_name',
                key: 'payere_name',

            },


            {
                title: 'Status: ',
                dataIndex: 'status',
                key: 'status',

            },

            {
                title: 'Due Date',
                dataIndex: 'due_date',
                key: 'due_date',

            },

            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',

            },

            {
                title: 'Balance',
                dataIndex: 'balance',
                key: 'balance',

            },
        ]

        const expandedRowRender = (record) => {

            const column = [

                {
                    title: 'Service Name',
                    dataIndex: 'service_name',
                    key: 'service_name',


                },

                {
                    title: 'Request Number',
                    dataIndex: 'request_number',
                    key: 'request_number',


                },

                {
                    title: 'Request Date',
                    dataIndex: 'request_date',
                    key: 'request_date',

                },

                {
                    title: 'Amount',
                    dataIndex: 'amount',
                    key: 'amount',


                },

            ]


            console.log("record", record)

            // for(record.Branch node:record.bank_branches ){

            //   node.getBrachName

            // }
            console.log('request', record)
            const data = []
            if (record.request_data) {
                for (let i = 0; i < record.request_data.length; i++) {
                    data.push({
                        key: i,
                        service_name: record.request_data[i].service_name,
                        request_number: record.request_data[i].request_number,
                        request_date: record.request_data[i].request_date,
                        amount:record.amount,

                    })
                }
            } else { return null }

            return <Table columns={column} dataSource={data} pagination={false} size='small' bordered='true' />;
        }

        const { insuranceId, dataSource, drafted, payerSelected, label, isLoading } = this.state;
        const invoiceTable = (
            <Table
                dataSource={dataSource}
                columns={columns}
                size="small"
                rowKey={record => record.member_type_name}
                expandedRowRender={record => expandedRowRender(record)}
                loading={isLoading}
                pagination={{ pageSizeOptions: ['20', '30'], showSizeChanger: true }}

            />
        )
        console.log('drafted', drafted);

        return (
            
           

      
            <div>
                <div  style={{ marginBottom: 16 }} >

                <Dropdown
                overlay={

                    <Menu>
                        {
                            console.log(insuranceId),
                            insuranceId ?

                                insuranceId.map((insurance) => (
                                    <Menu.Item key="edit" onClick={(e) => this.handlePayer(insurance, e)} >
                                        {insurance.name}
                                    </Menu.Item>
                                )) : <Menu.Item key="edit" >
                                </Menu.Item>
                        }
                    </Menu>
                }
            >
                <Button style={{ marginLeft: 10 }} size="medium" type="primary">
                    {this.state.label} <Icon type="down" />
                </Button>
            </Dropdown>

                </div>

                 
                <Tabs onChange={this.updateTableSource} type="card">
                    <TabPane tab="All" key="All" >
                        <Card>
                            <PageHeader
                                title=" All Invoices"
                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button type="primary" key="1"
                                        onClick={() => this.props.history.push("/newinvoice")}

                                    >
                                        New Invoice
                            </Button>
                                ]}
                            />
                       
                            {invoiceTable}
                        </Card>
                    </TabPane>
                    <TabPane tab="Drafted" key="Draft" >
                        <Card>
                            <PageHeader
                                title="Drafted Invoices"

                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button type="primary" key="1"
                                        onClick={() => this.props.history.push("/invoice/add")}
                                    >
                                        New Invoice
                            </Button>
                                ]}
                            />

                            {invoiceTable}
                        </Card>
                    </TabPane>

                    <TabPane tab="Sent" key="Sent">
                        <Card>
                            <PageHeader
                                title=" Sent Invoices"

                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button type="primary" key="1"
                                        onClick={() => this.props.history.push("/invoice/add")}

                                    >
                                        New Invoice
                            </Button>
                                ]}
                            />
                  
                            {invoiceTable}
                        </Card>
                    </TabPane>

                    <TabPane tab="Pending" key="Pending">
                        <Card>
                            <PageHeader
                                title=" Pending Invoices"

                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button type="primary" key="1"
                                        onClick={() => this.props.history.push("/invoice/add")}

                                    >
                                        New Invoice
                            </Button>
                                ]}
                            />
                  
                            {invoiceTable}
                        </Card>
                    </TabPane>

                    <TabPane tab="Paid" key="Paid">
                        <Card>
                            <PageHeader
                                title=" Paid Invoices"

                                style={{ marginTop: 2, marginBottom: 2 }}
                                extra={[
                                    <Button type="primary" key="1"
                                        onClick={() => this.props.history.push("/invoice/add")}

                                    >
                                        New Invoice
                            </Button>
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

export default Hello
