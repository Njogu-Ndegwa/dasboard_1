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
import { ServiceRatesService, DistanceLimitService, ServiceCategoryService, MemberVehicleTypeService, MemberTypeService } from '../../../../../../config/_service'
// import VisitAction from "../../Visit/VisitAction";

class ServiceRates extends Component {
  state = {
    searchText: "",
    isLoading: true,
    dataSource: [],
    distanceLimit: [],
    memberType: [],
    vehicleType: [],
    serviceCategory: [],
    distance: 'Distance Limit',
    member: 'Member Type',
    vehicle: 'Vehicle Type',
    service: 'Service Category'
  };

  componentDidMount() {

    ServiceRatesService.fetchServiceRates().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({ dataSource: res.data.content, isLoading: false });
        message.success('Service Rates fetched successfully')
      } else {
        message.error('There is a problem loading the page. Please try refreshing the page')
      }
    }).catch(error => {
      console.log(error);
    })

    // Distance Limit

    DistanceLimitService.fetchDistanceLimits().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({ distanceLimit: res.data.content });
      }
    }).catch(error => {
      console.log(error);
    })

    // Member Type

    MemberTypeService.fetchMemberType().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({memberType: res.data.content });
      }
    }).catch(error => {
      console.log(error);
    })

    // Vehicle Type

    MemberVehicleTypeService.fetchMemberVehicleType().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({vehicleType: res.data.content });
      }
    }).catch(error => {
      console.log(error);
    })

    // Service Category

    ServiceCategoryService.fetchServiceCategories().then(res => {
      console.log("server response", res)
      if (res.data) {
        this.setState({ serviceCategory: res.data.content });
      }
    }).catch(error => {
      console.log(error);
    })

  }

  handleService = (service) => {
    this.setState({service: service.service_name})
    
ServiceRatesService.fetchServiceRatesId({serviceCategoryId: service.service_id}).then(res=>{
  console.log('Service category', res)
  if(res.data){
    this.setState({dataSource: res.data.content})
  }
})
  }

  handleVehicle = (vehicle) => {
    this.setState({vehicle: vehicle.member_vehicle_type_name})
    ServiceRatesService.fetchServiceRatesId({memberVehicleTypeId: vehicle.type_id}).then(res=>{
      console.log('Vehicle Type', res)
      if(res.data){
        this.setState({dataSource:res.data.content })
      }
    })
  }

  handleMember = (member) => {
    this.setState({member: member.member_type_name})
    ServiceRatesService.fetchServiceRatesId({memberTypesId: member.member_type_id}).then(res=>{
      console.log('Service category', res)
      if(res.data){
        this.setState({dataSource: res.data.content})
      }
    })
  }

  handleDistance = (distance) => {
    this.setState({distance: distance.distance_to})
    ServiceRatesService.fetchServiceRatesId({distanceLimitId: distance.distance_id}).then(res=>{
      console.log('Service category', res)
      if(res.data){
        this.setState({dataSource: res.data.content})
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
    if (e.key === "first_name") {
      this.props.history.push({
        pathname: "/settings/serviceprovider/more",
        // state: {
        //   visit_data: record,
        //   pageheader: 'block'
        // }
      });
    } else if (e.key === 'edit') {
      console.log("row", row)
      this.props.history.push({
        pathname: "/settings/ratesdetails/add",
        state: {
          servicePoint: row

        }
      });

    }
  };

  handleConfirms = (row) => {
    const dataSource = this.state.dataSource.filter(p => p.service_rate_id !== row.service_rate_id);
    this.setState({ dataSource });

    ServiceRatesService.deleteServiceRates(row.service_rate_id).then( res => {
      console.log("deleted response", res)
      if (res.status === 202){
        message.success("Service rates deleted succesfully");
      }
    }).catch (error => {
      console.log(error)
    })
    
  }

  handleCancel = () => {
    message.error("The object you selected has not been deleted")
  }

  render() {
    const columns = [

      {
        title: 'Service Category',
        dataIndex: 'service_category_name',
        key: 'service_category_name',
        ...this.getColumnSearchProps("service_category_name"),
        render: (text, row) => <Link to={{
          pathname: '/settings/ratesdetails/add',
          state: { servicePoint: row }
        }}>{text}</Link>
      },
      {
        title: 'Vehicle Category',
        dataIndex: 'member_vehicle_types_name',
        key: 'member_vehicle_types_name',

      },

      {
        title: 'Vehicle Type',
        dataIndex: 'member_vehicle_category_name',
        key: 'member_vehicle_category_name',

      },

      {
        title: 'Member Type',
        dataIndex: 'member_type_name',
        key: 'member_type_name',

      },

      {
        title: 'Distance Limit',
        dataIndex: 'distance_limit' ,
        key: 'distance_limit',

      },


      {
        title: 'Flat rate',
        dataIndex: 'base_fee',
        key: 'base_fee',

      },



      {
        title: 'Amount Per Km',
        dataIndex: 'amt_per_km',
        key: 'amt_per_km',

      },

      {
        title: 'Amount Per Hr',
        dataIndex: 'amt_per_hour',
        key: 'amt_per_hour',

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
                <Menu.Item >
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
            <Button size="small" color="blue">
              Action <Icon type="down" />
            </Button>
          </Dropdown>
        )
      }
    ];
    const { dataSource, isLoading, distanceLimit, memberType, vehicleType, serviceCategory } = this.state;
    console.log('dataSource', dataSource)
    return (
      <Card>
        <PageHeader
          // onBack={() => { this.props.history.push('/settings/system') }}
          title="Service Rates"

          style={{ marginTop: 2, marginBottom: 2 }}
          extra={[
            <Button type="primary" key="1"
              onClick={() => this.props.history.push("/settings/ratesdetails/add")}

            >
              Set Service Rates
                            </Button>
          ]}
        />

<div style={{ marginBottom: 16 }}>


<Dropdown
  overlay={

    <Menu>
      {
        serviceCategory.map((service) => (

          <Menu.Item key="edit" onClick={(e) => this.handleService(service, e)} >

            {service.service_name}
          </Menu.Item>

        ))


      }


    </Menu>
  }
>
  <Button style={{ marginRight: 10 }} size="medium" type="primary">
     {this.state.service} <Icon type="down" />
  </Button>
</Dropdown>


<Dropdown
  overlay={

    <Menu>
      {
        distanceLimit.map((distance) => (

          <Menu.Item key="edit" onClick={(e) => this.handleDistance(distance, e)} >

            {distance.name}
          </Menu.Item>

        ))


      }


    </Menu>
  }
>
  <Button style={{ marginRight: 10 }} size="medium" type="primary">
     {this.state.distance} <Icon type="down" />
  </Button>
</Dropdown>


<Dropdown
  overlay={

    <Menu>
      {
        memberType.map((member) => (

          <Menu.Item key="edit" onClick={(e) => this.handleMember(member, e)} >

            {member.member_type_name}
          </Menu.Item>

        ))


      }


    </Menu>
  }
>
  <Button style={{ marginRight: 10 }} size="medium" type="primary">
     {this.state.member} <Icon type="down" />
  </Button>
</Dropdown>


<Dropdown
  overlay={

    <Menu>
      {
        vehicleType.map((vehicle) => (

          <Menu.Item key="edit" onClick={(e) => this.handleVehicle(vehicle, e)} >

            {vehicle.member_vehicle_type_name}
          </Menu.Item>

        ))


      }


    </Menu>
  }
>
  <Button style={{ marginRight: 10 }} size="medium" type="primary">
     {this.state.vehicle} <Icon type="down" />
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
          rowKey={record => record.service_category_id}
          pagination={{pageSizeOptions : ['20', '30'], showSizeChanger : true}} 
        />
      </Card>
    );
  }
}

export default withRouter(ServiceRates);