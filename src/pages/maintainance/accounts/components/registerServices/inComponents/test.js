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
  Popconfirm,
  Divider,
  Modal,
  Checkbox

} from "antd";
import Highlighter from "react-highlight-words";
import Icon from '@ant-design/icons'
import { ServiceCategoryService, MainBankService  } from '../../../../../../config/_service';
import { RequestsService } from '../../../../../../config/claims_management_service';
import 'antd/dist/antd.css';
// import VisitAction from "../../Visit/VisitAction";
const { Search } = Input;

class ServiceCategory extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: [],
 
    errors: null,
    core: [],
    visible :  false,

  };

  componentDidMount() {

    RequestsService.fetchRequests().then(response => {
      console.log('server response', response);

      if (response.data) {
        this.setState({ dataSource: response.data, isLoading: false });
        message.success('Service Cateories fetched succesfully')
      } else {
        message.error('There is a problem loading the page. Try refreshing the page')
      }
    }).catch(error => {
      console.log(error);
    });

  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
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

//   handleSearch = (selectedKeys, confirm) => {
//     confirm();
//     this.setState({ searchText: selectedKeys[0] });
//   };



  // select the row
  onClickRow = record => {
    return {
      onClick: () => { }
    };
  };
  setRowClassName = record => {
    return "clickRowStyl";
  };



  handleMenuClick = (row, e ) => {
    if (e.key === "service") {
      this.props.history.push({
        pathname: "/settings/servicepoint/add",
        // state: {
        //   visit_data: record,
        //   pageheader: 'block'
        // } 
      });
    } else if (e.key === 'edit') {
      console.log(row)
      this.props.history.push({
        
        pathname: "/settings/servicepoint/add",
        state: { servicePoint: row}
         
      });
    
    }
  };

  handleConfirms = (row) => {
    const dataSource = this.state.dataSource.filter(p => p.service_id !== row.service_id);
    this.setState({ dataSource });

    ServiceCategoryService.deleteServiceCategories(row.service_id).then(res => {
      console.log("deleted response", res)
      if (res.status === 202) {
        message.success("Service Category deleted succesfully");
      }
    }).catch(error => {
      console.log(error)
    })

  }
  onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }

  handleSearch = searchText => {
    const {dataSource} = this.state
    console.log('datasource', dataSource)
    const filteredEvents = dataSource.filter(({ member_name, request_number }) => {
      console.log('title', member_name)
      console.log('request_nymber', request_number)
      member_name = member_name.toLowerCase();
      return member_name.includes(searchText);
    });
    console.log('filtered events', filteredEvents)

    this.setState({
      dataSource: filteredEvents
    });
    console.log('events data', filteredEvents)
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

//   handleSearch = (value) => {
//     this.setState({
//         dataSource: this.state.dataSource.filter(person => person.name.includes(value))
//       })
//   }

//   handleCancel = () => {
//     message.error("Service category has not been deleted")
//   }

  render() {
    const columns = [

      {
        title: 'Service Name',
        dataIndex: 'member_name',
        key: 'service_name',
        ...this.getColumnSearchProps("service_name"),
        render: (text, row) => <Link to={{
          pathname: '/settings/servicepoint/add',
          state: { servicePoint: row }
        }}>{text}</Link>

      },

      {
        title: 'Service Code',
        dataIndex: 'bank_code',
        key: 'service_code',

      },

      {
        title: 'Top 5',
        dataIndex: 'core_service',
        key: 'core_service',
        render: (text, row) => text === false ? <Tag color='red'>Others</Tag> : <Tag color='blue'>Core</Tag>

      },

      {
        title: "",
        dataIndex: "",
        key: "action",
        render: (text, row) => (
          <Dropdown
            overlay={
              <Menu onClick={e => this.handleMenuClick(row, e)}>
                <Menu.Item key="edit"  >
                  Edit 
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="delete" >
                  <Popconfirm
                    title="Are you sure delete this task?"
                    onConfirm={() => this.handleConfirms(row)}
                    onCancel={() => this.handleCancel()}
                    okText="Yes"
                    cancelText="No" >
                    Delete
                 </Popconfirm>
                </Menu.Item>

              </Menu>
            }
          >
            <Button size="small" color="red"  >
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
          title="Service Category"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
        
<Search
placeholder="input search text"
onSearch={searchText => this.handleSearch(searchText)}
style={{ width: 300 }}
enterButton
/>, <Button type="primary" key="1"
              onClick={() => this.props.history.push("/settings/servicepoint/add")}

            >
              New Service Category
                            </Button>


          ]}
        />

<Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{ width: 350 }}
        >
       <Card title="Search Options" size="small" style={{ width: 300, marginLeft: 90 }} >
       <Checkbox onChange={this.onChange}>Checkbox</Checkbox>
       <br/>
       <Checkbox onChange={this.onChange}>Checkbox</Checkbox>
       <br/>
       <Checkbox onChange={this.onChange}>Checkbox</Checkbox>
       <br/>
       <Checkbox onChange={this.onChange}>Checkbox</Checkbox>
       </Card>

       <Search
      placeholder="input search text"
      onSearch={value => this.handleSearch(value)}
      style={{ width: 300, marginTop: 20, marginLeft: 90  }}
      enterButton
    />
        </Modal>

        <Table
          loading={isLoading}
          onRow={this.onClickRow}
          rowClassName={this.setRowClassName}
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey={record => record.service_id}
          pagination={{ pageSizeOptions: ['20', '30'], showSizeChanger: true }}
          // expandedRowRender={record => record.expandable ? expandedRowRender(record) : null }
    
        />

      </Card>
    );
  }
}

export default withRouter(ServiceCategory);
