import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Table,
  Input,
  Card,
  message,
  Menu,
  Dropdown,
  Tag,
  PageHeader,
  Popconfirm,
  Button
} from "antd";
import Highlighter from "react-highlight-words";
import { BankBranchService } from '../../../../../../config/_service';
import Icon from '@ant-design/icons'
// import VisitAction from "../../Visit/VisitAction";


class BankBranch extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: []
  };

  componentDidMount() {

    BankBranchService.fetchBankBranch().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({ dataSource: res.data.content, isLoading: false })
        message.success('Bank branch fetched successfully')
      } else {
        message.error('There is a problem loading the page. Please try refreshing')
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
        pathname: "/bank/branch/add",
        state: {
          servicePoint: row
        }
      });
    }
  };
  handleConfirm = (row) => {
    const dataSource = this.state.dataSource.filter(p => p.banck_branch_id !== row.banck_branch_id);
    this.setState({ dataSource });

    BankBranchService.deleteBankBranch(row.banck_branch_id).then( res => {
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
        title: 'Main Bank',
        dataIndex: 'main_banks_name',
        key: 'main_banks_name',
        ...this.getColumnSearchProps("main_banks_name"),
        render: (text, row) => <Link to={{
          pathname: '/bank/branch/add',
          state: { servicePoint: row }
        }}>{text}</Link>
      },

      {
        title: 'Branch Name',
        dataIndex: 'branch_name',
        key: 'branch_name',

      },

      {
        title: 'Branch Code',
        dataIndex: 'branch_code',
        key: 'branch_code',

      },

      {
        title: 'Swift Code',
        dataIndex: 'swift_code',
        key: 'swift_code',

      },

      {
        title: 'Phone No',
        dataIndex: 'phone_number',
        key: 'phone_number',

      },

      {
        title: 'Adress',
        dataIndex: 'address',
        key: 'address',

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
    const { dataSource, isLoading } = this.state;
    return (
      <Card>
        <PageHeader
          title="Bank Branch"
onBack={()=> {this.props.history.push('/bank')}}
          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/bank/branch/add")}

            >
              New Branch
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
          pagination={{pageSizeOptions : ['20', '30'], showSizeChanger : true}}
        />
      </Card>
    );
  }
}

export default withRouter(BankBranch);