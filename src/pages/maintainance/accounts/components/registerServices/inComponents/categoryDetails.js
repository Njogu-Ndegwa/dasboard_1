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
} from "antd";
import Highlighter from "react-highlight-words";
import Icon from '@ant-design/icons'
import { ServiceCategoryService } from '../../../../../../config/_service';
import 'antd/dist/antd.css';
// import VisitAction from "../../Visit/VisitAction";

class ServiceCategory extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: [],
    errors: null,
    core: []

  };

  componentDidMount() {

    ServiceCategoryService.fetchServiceCategories().then(response => {
      console.log('server response', response);

      if (response.data) {
        this.setState({ dataSource: response.data.content, isLoading: false });
        message.success('Service Cateories fetched succesfully')
      } else {
        message.error('There is a problem loading the page. Try refreshing the page')
      }
    }).catch(error => {
      console.log(error);
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

  handleCancel = () => {
    message.error("Service category has not been deleted")
  }

  render() {
    const columns = [

      {
        title: 'Service Name',
        dataIndex: 'service_name',
        key: 'service_name',
        ...this.getColumnSearchProps("service_name"),
        render: (text, row) => <Link to={{
          pathname: '/settings/servicepoint/add',
          state: { servicePoint: row }
        }}>{text}</Link>

      },

      {
        title: 'Service Code',
        dataIndex: 'service_code',
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
    const expandedRowRender = (record) => {

      const column = [

        {
          title: 'Service Name',
          dataIndex: 'service_name',
          key: 'name',

        },

        {
          title: 'Vehicle Type',
          dataIndex: 'vehicle_type',
          key: 'vehicle_type',

        },

        {
          title: 'Distance Limit',
          dataIndex: 'distance_limit',
          key: 'distance_limit',

        },

        {
          title: 'Member Type',
          dataIndex: 'member_type',
          key: 'member_type',

        },

        {
          title: 'Base Fee',
          dataIndex: 'base_fee',
          key: 'base_fee',

        },

        {
          title: 'Amt per km',
          dataIndex: 'amt_per_km',
          key: 'amt_per_km',

        },
      ]


      console.log("record", record)
      console.log("recordsss", record.service_rates_data)


      const data = []
      for (let i = 0; i < record.service_rates_data.length; i++) {
        data.push({
          key: i,
          service_name: record.service_rates_data[i].service_category_name,
          vehicle_type: record.service_rates_data[i].member_vehicle_types_name,
          distance_limit: record.service_rates_data[i].distance_limit,
          member_type: record.service_rates_data[i].member_type_name,
          base_fee: record.service_rates_data[i].base_fee,
          amt_per_km: record.service_rates_data[i].amt_per_km,

        })
      }

      return <Table columns={column} dataSource={data} pagination={false} size='small' bordered = 'true' />;
    }
    const { dataSource, isLoading } = this.state;
    return (

      <Card>
        <PageHeader
          title="Service Category"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/settings/servicepoint/add")}

            >
              New Service Category
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
          rowKey={record => record.service_id}
          pagination={{ pageSizeOptions: ['20', '30'], showSizeChanger: true }}
          expandedRowRender={record => expandedRowRender(record)}
          // expandedRowRender={record => record.expandable ? expandedRowRender(record) : null }
    
        />

      </Card>
    );
  }
}

export default withRouter(ServiceCategory);

