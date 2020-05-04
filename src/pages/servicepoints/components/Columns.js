import React from 'react';
import { Link } from 'react-router-dom'
import { Tag, Button } from 'antd'
export const ServicePointColumns = (props) => [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, row) => <Link to={{
            pathname: '/settings/servicepoint/add',
            state: { servicePoint: row }
        }}>{text}</Link>
    },
    {
        title: 'Type',
        dataIndex: 'service_point_type',
        key: 'service_point_type',

    },
    {
        title: 'Income Account',
        dataIndex: 'income_account.account_name',
        key: 'income_account',

    },
    {
        title: 'Expense Account',
        dataIndex: 'expense_account.account_name',
        key: 'expense_account',

    },
    {
        title: 'Status',
        dataIndex: 'active',
        key: 'active',
        render: (text, row) => text === false ? <Tag color='red'>Inactive</Tag> : <Tag color='blue'>Active</Tag>

    },
    {
        title: 'Action',
        dataIndex: 'edit',
        key: 'edit',
        render: (text, row) => <Link to={{
            pathname: '/settings/servicepoint/add',
            state: { servicePoint: row }
        }}><Button size="small" icon="edit"></Button></Link>

    },


]

