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
  Icon
} from "antd";
import Highlighter from "react-highlight-words";
import {UserGroupsService  } from '../../../../../../config/security';

// import VisitAction from "../../Visit/VisitAction";

class DistanceLimits extends Component {
  state = {
    searchText: "",
    isLoading: false,
    dataSource: [],
    roleId: []
  };

  componentDidMount() {

    


    UserGroupsService.fetchUserGroups().then(res => {
      console.log('server response,', res);
      if(res.data) {
        this.setState({roleId: res.data.content})
      }
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
    // render: text => (
    //   <Highlighter
    //     highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
    //     searchWords={[this.state.searchText]}
    //     autoEscape
    //     textToHighlight={text.toString()}
    //   />
    // )
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
        pathname: "/rolepermission/add",
        state: {
          servicePoint: row
        }
      });
    }
  };

  handlePayer = (role, e) => {
    const { payer } = this.state
    console.log('handle Payer')
    if (e.key === 'edit') {
      console.log('role', role)
      this.setState({ payer: role })

     UserGroupsService.fetchRolePermissions(role.id).then(res => {
        console.log('server response by id', res)
        this.setState({ dataSource: res.data.permission_usage_data })
        console.log('dataSource', this.state.dataSource)
      })

    }
  }

  render() {
    const columns = [

      {
        title: ' Role Name',
        dataIndex: 'name',
        key: 'name',

      },

      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',


      },

      {
        title: 'Disabled',
        dataIndex: 'disabled',
        key: 'disabled',

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
    const { dataSource, isLoading, roleId } = this.state;
    console.log('dataSource', dataSource)
    return (
      <Card>
        <PageHeader

          title="Role Permissions"

          style={{ marginTop: 2, marginBottom: 2 }}
        
        />

        <div style={{ marginBottom: 16 }}>
          <Dropdown
            overlay={

              <Menu>
                {
                  console.log(roleId),
                  roleId ?

                    roleId.map((role) => (
                      <Menu.Item key="edit" onClick={(e) => this.handlePayer(role, e)} >
                        {role.name}
                      </Menu.Item>
                    )) : <Menu.Item key="edit" >
                    </Menu.Item>
                }
              </Menu>
            }
          >
            <Button style={{ marginLeft: 10 }} size="medium" type="primary">
              Select Role Name <Icon type="down" />
            </Button>
          </Dropdown>

        </div>

        <Table
          loading={isLoading}
          onRow={this.onClickRow}
          rowClassName={this.setRowClassName}
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey={record => record.distance_identifier_code}
          pagination={{ pageSizeOptions: ['20', '30'], showSizeChanger: true }}
          scroll={{ y: 360 }}
        />
      </Card>
    );
  }
}

export default withRouter(DistanceLimits);