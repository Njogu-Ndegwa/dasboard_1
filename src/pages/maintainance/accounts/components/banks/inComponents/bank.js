import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Table,
  Input,
  Button,
  Card,
  message,
  Menu,
  Dropdown,
  Tag,
  PageHeader,
  Popconfirm
} from "antd";
import Highlighter from "react-highlight-words";
import { MainBankService } from '../../../../../../config/_service';
import Icon from '@ant-design/icons'
class Bank extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: []
  };

  componentDidMount() {

    MainBankService.fetchMainBank().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({ dataSource: res.data.content, isLoading: false })
        message.success('Banks fetched successfully')
      } else {message.error('Theres a problem loading the page. Try refreshing the page')}
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
        pathname: "bank/add",
        state: {
          servicePoint: row
        }
      });
    }
  };

  handleBank = () => {
    
  }
  handleConfirm = (row) => {
    const dataSource = this.state.dataSource.filter(p => p.main_bank_id !== row.main_bank_id);
    this.setState({ dataSource });

    MainBankService.deleteMainBank(row.main_bank_id).then( res => {
      console.log("deleted response", res)
      if (res.status === 202){
        message.success("Main Bank deleted succesfully");
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
        title: 'Bank Name',
        dataIndex: 'bank_name',
        key: 'bank_name',
        ...this.getColumnSearchProps("bank_name"),
        render: (text, row) => <Link to={{
          pathname: '/bank/add',
          state: { servicePoint: row }
        }}>{text}</Link>
      },

      {
        title: 'Bank Code',
        dataIndex: 'bank_code',
        key: 'bank_code',

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
                <Menu.Item >
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

      const handleClick = (row) => {
        console.log('row', row)
        this.props.history.push({
          pathname: 'bank/branch/add',
          state: {
            servicePoint: row
          }
        })
      }

      const column = [

        {
          title: 'Main Bank',
          dataIndex: 'main_banks_name',
          key: 'main_banks_name',

        },

        {
          title: 'Bank Branch',
          dataIndex: 'branch_name',
          key: 'branch_name',
  
        },

        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
  
        },

        {
          title: 'Phone Number',
          dataIndex: 'phone_number',
          key: 'phone_number',
  
        },

        {
          title: 'Swift Code',
          dataIndex: 'swift_code',
          key: 'swift_code',

        },

        {
          title: 'Branch Code',
          dataIndex: 'branch_code',
          key: 'branch_code',

        },

     

        {
          title: "",
          dataIndex: "",
          key: "action",
          render: (text, row) => (
            <Dropdown
              overlay={
                <Menu onClick={()=>handleClick(row)}>
                  <Menu.Item key="edit">
                    Edit
                    </Menu.Item>
                    <Menu.Divider/>
              
                </Menu>
              }
            >
              <Button size="small" color="blue">
                Action <Icon type="down" />
              </Button>
            </Dropdown>
          )
        }
      ]


console.log("record",record)

// for(record.Branch node:record.bank_branches ){

//   node.getBrachName

// }

      const data = []
      for (let i = 0; i < record.bank_branches.length; i++  ){
        data.push({
          key: i,
          branch_name: record.bank_branches[i].branch_name,
          address:  record.bank_branches[i].address,
          phone_number:  record.bank_branches[i].phone_number,
          swift_code:  record.bank_branches[i].swift_code,
          branch_code:  record.bank_branches[i].branch_code,
          main_banks_name:  record.bank_branches[i].main_banks_name,
          main_bankid:  record.bank_branches[i].main_bankid,
          banck_branch_id:  record.bank_branches[i]. banck_branch_id,

        })
      }

      return ( <Card> <PageHeader title="Bank Branch " extra={[
        <Button type="primary" key="1"
          onClick={() => this.props.history.push("/bank/branch/add")}

        >
          New Bank Branch
                        </Button>
      ]}
    /> <Table columns={column} dataSource={data} pagination={false} size='small' bordered = 'true' /></Card> ) ;
    }


    const { dataSource, isLoading } = this.state;
    return (
      <Card>
        <PageHeader
          // onBack={() => { this.props.history.push('/settings/system') }}
          title="Bank"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/bank/add")}

            >
              New Bank
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
        />
      </Card>
    );
  }
}

export default withRouter(Bank);