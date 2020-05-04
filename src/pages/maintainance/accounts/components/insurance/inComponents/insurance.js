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
  Popconfirm,
  PageHeader,
} from "antd";
import Highlighter from "react-highlight-words";
import Icon from '@ant-design/icons'
import { InsuranceService } from '../../../../../../config/_service';
// import VisitAction from "../../Visit/VisitAction";

class DistanceLimits extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: []
  };

  componentDidMount() {

    InsuranceService.fetchInsurance().then(res => {
      console.log("Saved Response", res);
      if (res.data) {
        this.setState({ dataSource: res.data.content, isLoading: false });
        message.success('Payer fetched successfully')
      } else {message.error('Thres a problem loading the page. Try refreshing the table')}
    }).catch(error => {
      console.log(error)
    });

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
        pathname: "/insurance/add",
        state: {
          servicePoint: row
        }
      });
    }
  };

  handleConfirms = (row) => {
    const dataSource = this.state.dataSource.filter(p => p.insurance_id !== row.insurance_id);
    this.setState({ dataSource });

    InsuranceService.deleteInsurance(row.insurance_id).then(res => {
      console.log("deleted response", res)
      if (res.status === 202) {
        message.success("Insurance deleted succesfully");
      }
    }).catch(error => {
      console.log(error)
    })

  }

  handleCancel = () => {
    message.error("The current object has not deleted")

  }


  render() {
    const columns = [

      {
        title: ' Insurance Name',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps("name"),
        render: (text, row) => <Link to={{
          pathname: '/insurance/add',
          state: { servicePoint: row }
        }}>{text}</Link>
      },

      {
        title: 'Contact Name',
        dataIndex: 'contact',
        key: 'contact',

      },

      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',

      },

      {
        title: 'Capitation',
        dataIndex: 'capitation',
        key: 'capitation',

      },

      {
        title: ' Co-pay Fixed Amount',
        dataIndex: 'co_pay_fxed_amt',
        key: 'co_pay_fxed_amt',

      },

      {
        title: 'Co-pay Percentage',
        dataIndex: 'co_pay_percentage',
        key: 'co_pay_percentage',

      },

      {
        title: 'Payment Terms',
        dataIndex: 'payment_terms',
        key: 'payment_terms',

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
                <Menu.Divider />
                <Menu.Item key="delete">
                  <Popconfirm
                    title='Are you sure you want to delete this task?'
                    onConfirm={() => { this.handleConfirms(row) }}
                    onCancel={() => this.handleCancel()}
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

          title="Payer"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/insurance/add")}

            >
              Add Payer
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
          rowKey={record => record.distance_identifier_code}
          pagination={{ pageSizeOptions: ['20', '30'], showSizeChanger: true }}
        />
      </Card>
    );
  }
}

export default withRouter(DistanceLimits);