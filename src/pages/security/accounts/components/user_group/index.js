import UserGroup from './in_componets/user_group';
import NewGroup from './in_componets/new_roles';

export const routes = [
    {
        path: "/usergroup",
        exact: true,

        component: UserGroup,
        name: " User Group"
    },

    {
        path: "/usergroup/add",
        exact: true,
        component: NewGroup,
        name: "New Group"
    },
]