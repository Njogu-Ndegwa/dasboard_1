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
import { MemberTypeService, MemberVehicleTypeService } from '../../../../../../config/_service';
// import VisitAction from "../../Visit/VisitAction";

class MemberType extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: []
  };

  componentDidMount() {

    MemberTypeService.fetchMemberType().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({ dataSource: res.data.content, isLoading: false })
        message.success('Member Type fetched successfully')
      } else {
        message.error('There is a problem loading the page. Try refreshing the page')
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
        pathname: "/membertype/add",
        state: {
          servicePoint: row
        }
      });
    }
  };

  handleConfirms = (row) => {
    const dataSource = this.state.dataSource.filter(p => p.member_type_id !== row.member_type_id);
    this.setState({ dataSource });

    MemberTypeService.deleteMemberType(row.member_type_id).then( res => {
      console.log("deleted response", res)
      if (res.status === 202){
        message.success("Member Type deleted succesfully");
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
        title: 'Member Type',
        dataIndex: 'member_type_name',
        key: 'member_type_name',
        ...this.getColumnSearchProps("member_type_name"),
        render: (text, row) => <Link to={{
          pathname: 'membertype/add',
          state: { servicePoint: row }
        }}>{text}</Link>
      },

      {
        title: 'Member Type Code',
        dataIndex: 'member_type_id_code',
        key: 'member_type_id_code',

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
                  onConfirm={()=> {this.handleConfirms(row)}}
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
          // onBack={() => { this.props.history.push('/settings/system') }}
          title="Member Type"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/membertype/add")}

            >
              New Member Type
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

export default withRouter(MemberType);