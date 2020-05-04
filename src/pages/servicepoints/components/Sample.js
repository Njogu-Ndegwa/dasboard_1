import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Table,
  Input,
  Button,
  Icon,
  Card,
  message,
  Menu,
  Dropdown
} from "antd";
import Highlighter from "react-highlight-words";
// import VisitAction from "../../Visit/VisitAction";

class VisitsListing extends Component {
  state = {
    searchText: "",
    isLoading: false,
    patientVisit: []
  };

  componentDidMount() {
    // this.setState({loading: true}, async () => {

    //     });
    this.setState({ isLoading: true });

    // VisitAction.fetchAllVisits().then(response => {
    //   console.log(response, "visit data");
    //   this.setState({ patientVisit: response.data, isLoading: false });
    // });
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
      onClick: () => {}
    };
  };
  setRowClassName = record => {
    return "clickRowStyl";
  };

  handleMenuClick = (record, e) => {
    if (e.key === "make_transfer_or_referral") {
      this.props.history.push({
        pathname: "/referral/create",
        state: {
          visit_data: record,
          pageheader: 'block'
        }
      });
    }
  };

  render() {
    const columns = [
      {
        title: "No.",
        dataIndex: "visit_number",
        key: "visit_number",
        width: "5%",
        ...this.getColumnSearchProps("visit_number")
      },
      {
        title: "Patient Name",
        dataIndex: "patient_data.full_name",
        key: "patient_data.full_name",
        width: "20%"
      },
      {
        title: "Service Point",
        dataIndex: "service_point_name",
        key: "service_point_name",
        width: "15%"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "10%"
      },
      {
        title: "Start Date/Time",
        dataIndex: "start_datetime",
        key: "start_datetime",
        width: "20%"
      },

      {
        title: "comments",
        dataIndex: "comments",
        key: "comments",
        width: "20%"
      },
      {
        title: "",
        dataIndex: "",
        key: "action",
        render: (text, record) => (
          <Dropdown
            overlay={
              <Menu onClick={e => this.handleMenuClick(record, e)}>
                <Menu.Item key="print_sick_off_note">
                  Print Sick-Off Note
                </Menu.Item>
                <Menu.Item key="print_patient_file">
                  Print Patient File
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="checkout_patient">Checkout</Menu.Item>
                <Menu.Item key="make_transfer_or_referral">
                  Referral/Transfer
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
    const { patientVisit, isLoading } = this.state;
    return (
      <Card type={"inner"} title={"Patient Visits"}>
        <Table
          loading={isLoading}
          onRow={this.onClickRow}
          rowClassName={this.setRowClassName}
          columns={columns}
          dataSource={patientVisit}
          size="small"
          rowKey={record => record.visit_number}
        />
      </Card>
    );
  }
}

export default withRouter(VisitsListing);
