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
import { SystemUsersService } from '../../../../../../config/security';
// import VisitAction from "../../Visit/VisitAction";

class UserGroup extends Component {
    state = {
        searchText: "",
        isLoading: false,
        dataSource: []
    };

    componentDidMount() {

        SystemUsersService.fetchSystemUsers().then(res => {
            console.log("server Response", res);
            if (res.data) {
                this.setState({ dataSource: res.data });
            }
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
                pathname: "/distance/add",
                state: {
                    servicePoint: row
                }
            });
        }
    };




    render() {
        const columns = [


            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',


            },

            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',


            },

            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',


            },

            {
                title: 'Phone no',
                dataIndex: 'phone',
                key: 'phone',


            },

            {
                title: 'User Type',
                dataIndex: 'user_type',
                key: 'user_type',


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

                    title="System Users"
                    style={{ marginTop: 2, marginBottom: 2 }}
                    extra={[
                        <Button type="primary" key="1"
                            onClick={() => this.props.history.push("/systemuser/add")}

                        >
                            New System User
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

export default withRouter(UserGroup);