import RolePermission from './in_components/role_permissions';
import UpdateRolePermission from './in_components/update_role';

export const routes = [
    {
        path: "/rolepermission",
        exact: true,
        component: RolePermission,
        name: " System User"
    },

    {
        path: "/rolepermission/add",
        exact: true,
        component: UpdateRolePermission,
        name: "Add User"
    },
]