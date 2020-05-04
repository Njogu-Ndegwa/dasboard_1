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
  Popconfirm,
  PageHeader,
  Icon
} from "antd";
import Highlighter from "react-highlight-words";
import {GlobalSettingsService} from '../../config/settings';
// import VisitAction from "../../Visit/VisitAction";

class SpReviewsAndRatingsDetails extends Component {
  state = {
    searchText: "",
    isLoading: false,
    dataSource: [],
  };

  componentDidMount() {
      
    GlobalSettingsService.fetchGlobalSettings().then(res => {
      console.log(" server response", res);
      if(res.data){
        this.setState({dataSource: res.data.content});
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
    if (e.key === "vehicle") {
      this.props.history.push({
        pathname: "/serviceprovider/vehicle",
        state: {
         Driver: row
        }
      });
    } 
  };

 

  handleCancel = () => {
    message.error("The object you selected has not been deleted")
  }

  render() {
    const columns = [
    
     
    {
        title: 'Settings Name',
        dataIndex: 'settings_name',
        key: 'settings_name',

    },
    {
        title: 'Settings Value',
        dataIndex: 'settings_value',
        key: 'settings_value',
       

    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',

    },

    ];

  
     
    const { dataSource, isLoading, serviceProviderDetails } = this.state;
    console.log("initial State", serviceProviderDetails )
    return (
      <Card type={"inner"} >
                       <PageHeader

title="Global Settings"
style={{ marginTop: 2, marginBottom: 2 }}

/>

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

export default withRouter(SpReviewsAndRatingsDetails);