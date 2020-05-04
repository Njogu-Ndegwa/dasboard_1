import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Table,
  Input,
  Button,
  Icon,
  Card,
  message,
  Menu,
  Dropdown,
  Tag,
  PageHeader,
  Popconfirm
} from "antd";
import Highlighter from "react-highlight-words";
import {PrepareInvoiceService} from '../../../../../config/claims_management_service'
// import VisitAction from "../../Visit/VisitAction";

class InvoiceDetails extends Component {
  state = {
    searchText: "",
    isLoading: false,
    dataSource: []
  };

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
        ...this.getColumnSearchProps("invoice_id"),
        render: (text, row) => <Link to={{
          pathname: '/newinvoice/add',
          state: { servicePoint: row }
        }}>{text}</Link>
      },

      {
        title:  'Status: ',
        dataIndex: 'status',
        key: 'status',

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

      {
        title: 'Amount ',
        dataIndex: 'amount',
        key: 'amount',

      },

      {
        title: 'Amount balance',
        dataIndex: 'balance',
        key: 'balance',

      },

      {
        title: 'Narration',
        dataIndex: 'narration',
        key: 'narration',

      },



      {
        title: "",
        dataIndex: "",
        key: "action",
        render: (text, row) => (
          <Dropdown
            overlay={
              <Menu onClick={e => this.handleMenuClick(row, e)}>
                <Menu.Item key="edit">
                  Edit
                  </Menu.Item>
              <Menu.Divider/>
                <Menu.Item>
                  <Popconfirm 
                  title = 'Are you sure you want to delete this task?'
                  onConfirm={()=> {this.handleConfirm(row)}}
                  onCancel={()=> this.handleCancel()}
                  okText="Yes"
                  cancelText="No"
                  >
                    Delete
                  </Popconfirm>
                </Menu.Item>

              </Menu>
            }
          >
            <Button size="small" color="blue">
              Action <Icon type="down" />
            </Button>
          </Dropdown>
        )
      }
    ];

    const expandedRowRender = ( record ) => {

      const column = [

        {
          title: 'Request Number',
          dataIndex: 'name',
          key: 'name',
          render: (text, row) => <Link to={{
            pathname: '/request',
            state: { Request: row }
          }}>{text}</Link>
        
  
        },

      ]


console.log("record",record)

// for(record.Branch node:record.bank_branches ){

//   node.getBrachName

// }
      console.log('request', record)
      const data = []
      for (let i = 0; i < record.request_data.length; i++  ){
        data.push({
          key: i,
          name: record.request_data[i].request_number,
        
        })
      }

      return <Table columns={column} dataSource={data} pagination={false} size='small' bordered = 'true' />;
    }


    const { dataSource, isLoading } = this.state;
    return (
      <Card>
        <PageHeader
          title=" Invoices"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/newinvoice/add")}

            >
              New Invoice
                            </Button>
          ]}
        />
        <Table
          loading={isLoading}
          onRow={this.onClickRow}
          rowClassName={this.setRowClassName}
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey={record => record.member_type_name}
          expandedRowRender= {record => expandedRowRender(record) }
          pagination={{pageSizeOptions : ['20', '30'], showSizeChanger : true}}
          scroll={{ y: 360 }}
        />
        
      </Card>
      
    );
  }
}

export default withRouter(InvoiceDetails);