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
import Icon from '@ant-design/icons'
import {SpCommissionsService} from '../../config/commissions'
// import VisitAction from "../../Visit/VisitAction";

class BankBranch extends Component {
  state = {
    searchText: "",
    isLoading: false,
    dataSource: []
  };

  componentDidMount() {

    SpCommissionsService.fetchSpCommissions().then(res => {
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
        pathname: "/bank/branch/add",
        state: {
          servicePoint: row
        }
      });
    }
  };
  

  handleCancel = () => {
    message.error("The current object has not deleted")

  }

  render() {
    const columns = [

      {
        title: 'Service Name',
        dataIndex: 'service_name',
        key: 'service_name',
      },

      {
        title: 'Sp Name',
        dataIndex: 'sp_name',
        key: 'sp_name',

      },

      

      {
        title: 'Phone Number',
        dataIndex: 'sp_phone_number',
        key: 'sp_phone_number',

      },

      {
        title: 'Total Cost',
        dataIndex: 'total_cost',
        key: 'total_cost',

      },

      {
        title: 'Commission',
        dataIndex: 'commission',
        key: 'commission',

      },

      {
        title: 'Commission Rate',
        dataIndex: 'commission_rate',
        key: 'commission_rate',

      },
    ];
    const { dataSource, isLoading } = this.state;
    return (
      <Card>
        <PageHeader
          title="Sp Commission"

          style={{ marginTop: 2, marginBottom: 2 }}
          
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
          scroll={{ y: 360 }}
        />
      </Card>
    );
  }
}

export default withRouter(BankBranch);