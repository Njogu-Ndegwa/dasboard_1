import SystemUser from './in_components/system_users';
import AddUser from './in_components/add_user'

export const routes = [
    {
        path: "/systemuser",
        exact: true,
        component: SystemUser,
        name: " System User"
    },

    {
        path: "/systemuser/add",
        exact: true,
        component: AddUser,
        name: "Add User"
    },
]