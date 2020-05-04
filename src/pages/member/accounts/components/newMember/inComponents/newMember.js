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
  Popconfirm
} from "antd";
import Highlighter from "react-highlight-words";
import Icon from '@ant-design/icons'
import { MemberService} from '../../../../../../config/member_service';
// import VisitAction from "../../Visit/VisitAction";

class Member extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: []
  };

  componentDidMount() {
    MemberService.fetchMember().then(res => {
      console.log(" server response", res);
      if(res.data){
        this.setState({dataSource: res.data.content});
        this.setState({isLoading: false})
        message.success('Member details fetched successfully')
      } else {
        message.error('Theres a problem Loading Member details. Try refreshing the page.')
      }
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
      onClick: () => {}
    };
  };
  setRowClassName = record => {
    return "clickRowStyl";
  };

  handleMenuClick = (row, e) => {
    if (e.key === "manage") {
      this.props.history.push({
        pathname: "/member/vehicle",
        state: {
          Member: row
        }
      });
    } else if (e.key=== 'edit') {
      this.props.history.push({
        pathname: '/member/edit',
        state: {
          servicePoint: row
        }
      })
    }
  };

 

  handleCancel = () => {
    message.error("The object you selected has not been deleted")
  }

  render() {
    const columns = [
      {
        title: "Full Name",
        dataIndex: "full_name",
        key: "full_name",
        ...this.getColumnSearchProps("full_name"),
        render: (text, row) => <Link to={{
          pathname: '/member/edit',
          state: { servicePoint: row }
        }}>{text}</Link>
      },
     
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',

    },
    {
        title: 'Phone No :',
        dataIndex: 'phone_number',
        key: 'phone_number',
       

    },
    {
        title: 'Id No :',
        dataIndex: 'id_number',
        key: 'in_number',

    },

    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',

    },

    {
        title: 'Date of Birth',
        dataIndex: 'date_of_birth',
        key: 'dob',
    },

    
   
    {
        title: 'Status',
        dataIndex: 'active',
        key: 'active',
        render: (text, row) => text === false ? <Tag color='red'>Inactive</Tag> : <Tag color='blue'>Active</Tag>

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
                <Menu.Item key="manage">
                  Manage Vehicles
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
      <Card type={"inner"} title={"Member"}>
        <Table
          loading={isLoading}
          onRow={this.onClickRow}
          rowClassName={this.setRowClassName}
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey={record => record.visit_number}
          pagination={{pageSizeOptions : ['20', '30'], showSizeChanger : true}} 
        />
      </Card>
    );
  }
}

export default withRouter(Member);