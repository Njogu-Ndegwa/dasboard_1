import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Link}  from 'react-router-dom'
import { Tabs, message, Icon, Input, Button, Table, Popconfirm, Menu, Dropdown, PageHeader, Card } from 'antd';
import {PrepareInvoiceService} from '../../../../../config/claims_management_service';
import Highlighter from "react-highlight-words";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class Hello extends React.Component{

    componentDidMount() {

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
      handleConfirm = (row) => {
        const dataSource = this.state.dataSource.filter(p => p.banck_branch_id !== row.banck_branch_id);
        this.setState({ dataSource });
    
        PrepareInvoiceService.deletePrepareInvoice(row.banck_branch_id).then( res => {
          console.log("deleted response", res)
          if (res.status === 202){
            message.success("Bank Branch deleted succesfully");
          }
        }).catch (error => {
          console.log(error)
        })
        
      }
    
      handleCancel = () => {
        message.error("The current object has not deleted")
    
      }

render() {
   
    const columns = [

        {
          title: 'Invoice Id',
          dataIndex: 'invoice_id',
          key: 'invoice_id',
         
        },
  
        {
          title:  'Status: ',
          dataIndex: 'status',
          key: 'status',
  
        },
  
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
          title: 'Due Date',
          dataIndex: 'due_date',
          key: 'due_date',
  
        },
    ]  
    

    return(

  <Tabs onChange={callback} type="card">
    <TabPane tab="All" key="1">
    <Card>
        <PageHeader
          title=" Invoices Hourly"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/invoice/add")}

            >
              New Invoice
                            </Button>
          ]}
        />
        <Table
          
          onRow={this.onClickRow}
          rowClassName={this.setRowClassName}
          
          columns={columns}
          size="small"
          rowKey={record => record.member_type_name}
          pagination={{pageSizeOptions : ['20', '30'], showSizeChanger : true}}
          scroll={{ y: 360 }}
        />
      </Card>
    </TabPane>
    <TabPane tab="Draft" key="2">
    <Card>
        <PageHeader
          title=" Invoices daily"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/invoice/add")}

            >
              New Invoice
                            </Button>
          ]}
        />
        <Table
          
          onRow={this.onClickRow}
          rowClassName={this.setRowClassName}
          
         columns={columns}
          size="small"
          rowKey={record => record.member_type_name}
          pagination={{pageSizeOptions : ['20', '30'], showSizeChanger : true}}
          scroll={{ y: 360 }}
        />
      </Card>
    </TabPane>
    <TabPane tab="Sent" key="3">
    <Card>
        <PageHeader
          title=" Invoices Weekly"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/invoice/add")}

            >
              New Invoice
                            </Button>
          ]}
        />
        <Table
          
          onRow={this.onClickRow}
          rowClassName={this.setRowClassName}
          
          columns={columns}
          size="small"
          rowKey={record => record.member_type_name}
          pagination={{pageSizeOptions : ['20', '30'], showSizeChanger : true}}
          scroll={{ y: 360 }}
        />
      </Card>
    </TabPane>
    <TabPane tab="Cleared" key="4">
    <Card>
        <PageHeader
          title=" Invoices Monthly"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/invoice/add")}

            >
              New Invoice
                            </Button>
          ]}
        />
        <Table
          
          onRow={this.onClickRow}
          rowClassName={this.setRowClassName}
          
          columns={columns}
          size="small"
          rowKey={record => record.member_type_name}
          pagination={{pageSizeOptions : ['20', '30'], showSizeChanger : true}}
          scroll={{ y: 360 }}
        />
      </Card>
    </TabPane>

    <TabPane tab="Overdue" key="5">
    <Card>
        <PageHeader
          title=" Invoices Yearly"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/invoice/add")}

            >
              New Invoice
                            </Button>
          ]}
        />
        <Table
          
          onRow={this.onClickRow}
          rowClassName={this.setRowClassName}
          
          columns={columns}
          size="small"
          rowKey={record => record.member_type_name}
          pagination={{pageSizeOptions : ['20', '30'], showSizeChanger : true}}
          scroll={{ y: 360 }}
        />
      </Card>
    </TabPane>

  </Tabs>
  
    )
  
}


}

export default Hello
